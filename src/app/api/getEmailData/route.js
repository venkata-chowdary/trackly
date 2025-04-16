import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { generatePrompt } from "@/lib/generatePrompt";
import { extractEmailDetails } from "@/lib/extractEmailData";

function saveMailToDatabase() {

}


export async function GET(request) {

    try {
        const { userId } = await auth()

        if (!userId) return new NextResponse(JSON.stringify({ message: "unauthorised request" }), { status: 401 });

        const clerk = await clerkClient()
        const clerkResponse = await clerk.users.getUserOauthAccessToken(userId, "google")
        const googleAccessToken = clerkResponse.data[0]?.token

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            }
        })

        const pendingEmails = await db.mailIdLog.findMany({
            where: {
                status: "pending",
                userRefId: user.id
            }
        })

        console.log("Pending Mails", pendingEmails?.length)
        const emailDataPromise = pendingEmails.map(async (mail, index) => {
            const gmailResponse = await fetch(
                `https://gmail.googleapis.com/gmail/v1/users/me/messages/${mail.mailId}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${googleAccessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!gmailResponse.ok) {
                throw new Error('Failed to fetch Gmail data');
            }
            const gmailData = await gmailResponse.json();
            const { emailBody, emailSnippet, emailSubject, emailContent, receivedDate } = extractEmailDetails(gmailData)


            const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: generatePrompt(emailBody, emailSnippet, emailSubject, receivedDate),
            });

            const rawResponse = response.candidates[0].content.parts[0].text
            const cleanedResponse = rawResponse.replace(/^```json\n|\n```$/g, '');
            // console.log(`email ${index}'s`, cleanedResponse)
            return {
                mailId: mail.mailId, // Include the mailId here
                data: JSON.parse(cleanedResponse), // Include the processed data here
            };
            // return JSON.parse(cleanedResponse)
        })


        const jobApplicationData = await Promise.all(emailDataPromise)

        const applicationPromise = jobApplicationData.map(async (application, index) => {
            const { mailId, data } = application;
            const { type, jobTitle = "", company = "", platform = "", location = "", jobType = "", appliedAt, status = "" } = data

            if (type === "job") {
                await db.application.create({
                    data: {
                        userRefId: user.id,
                        jobTitle,
                        company,
                        platform,
                        location,
                        jobType,
                        appliedAt: isNaN((new Date(appliedAt)).getTime()) ? new Date().toISOString() : new Date(appliedAt).toISOString(),
                        status: [status],
                        mailRefId: mailId
                    }
                })

                await db.mailIdLog.update({
                    where: {
                        mailId: mailId
                    },
                    data: {
                        status: "completed"
                    }
                })
            }
            else {
                await db.mailIdLog.update({
                    where: {
                        mailId: mailId
                    },
                    data: {
                        status: jobType === "non_job" ? "non_job" : "unable_to_analyze"
                    }
                })
            }
        })
        const applicationData = Promise.all(applicationPromise)


        //save if "job" and update status of mailId row
        //move this logic to cron

        return new NextResponse(JSON.stringify({ data: jobApplicationData }), { status: 200 });
    }
    catch (error) {
        console.error("Error in /api/fetch GET handler:", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}