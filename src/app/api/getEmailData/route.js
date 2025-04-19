import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { generatePrompt } from "@/lib/generatePrompt";
import { extractEmailDetails } from "@/lib/extractEmailData";

async function processMails(mail, clerk) {

    const user = await db.user.findUnique({
        where: {
            id: mail.userRefId
        }
    })

    if (!user) {
        console.error(`❌ User not found for mail ${mail.mailId} with userRefId ${mail.userRefId}`);
        await db.mailIdLog.update({
            where: { mailId: mail.mailId },
            data: { status: "error" },
        });
        return null;
    }

    const clerkResponse = await clerk.users.getUserOauthAccessToken(user.clerkUserId, "google")
    const googleAccessToken = clerkResponse.data[0]?.token


    //gmail api processing
    let gmailData
    try {
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
            throw new Error(`Failed to fetch Gmail data for mail ${mail.mailId}`);
        }

        gmailData = await gmailResponse.json();
    } catch (error) {
        console.error("Error during Gmail data loading:", error);
        return null;
    }

    const { emailBody, emailSnippet, emailSubject, emailContent, receivedDate } = extractEmailDetails(gmailData)

    console.log(emailSnippet)
    //gemini - processing
    let jobApplicationData
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: generatePrompt(emailBody, emailSnippet, emailSubject, receivedDate),
        });

        const rawResponse = response.candidates[0].content.parts[0].text
        const cleanedResponse = rawResponse.replace(/^```json\n|\n```$/g, '');
        // jobApplicationData = JSON.parse(cleanedResponse)
        console.log(cleanedResponse)
    } catch (error) {
        console.error(`⛔ Error during Gemini API processing for ${mail.mailId}:`, error);
        return null;
    }

    // // saving records to DB

    // try {
    //     const { type, jobTitle = "", company = "", platform = "", location = "", jobType = "", appliedAt, status = "" } = jobApplicationData

    //     if (type === "job") {
    //         await db.application.create({
    //             data: {
    //                 userRefId: user.id,
    //                 jobTitle,
    //                 company,
    //                 platform,
    //                 location,
    //                 jobType,
    //                 appliedAt: isNaN((new Date(appliedAt)).getTime()) ? new Date().toISOString() : new Date(appliedAt).toISOString(),
    //                 status: [status],
    //                 mailRefId: mail.mailId
    //             }
    //         })

    //         await db.mailIdLog.update({ where: { mailId: mail.mailId }, data: { status: "completed" } })
    //         console.log(`✅ Job entry created for mail: ${mail.mailId}`);
    //     }
    //     else if (type === "non_job") {
    //         await db.mailIdLog.update({ where: { mailId: mail.mailId }, data: { status: "non_job" } });
    //         console.log(`ℹ️ Skipped Mail ${mail.mailId} — classified as non-job`);
    //     } else {
    //         await db.mailIdLog.update({ where: { mailId: mail.mailId }, data: { status: "unable_to_analyze" }, });
    //         console.log(`⚠️ Skipped Mail ${mail.mailId} — unable to analyze (Gemini unclear)`);
    //     }

    //     return jobApplicationData
    // } catch (error) {
    //     console.error(`⛔ Error saving data to DB for mail ${mail.mailId}:`, error);
    //     return null;
    // }
}


export async function GET(request) {

    try {
        const pendingEmails = await db.mailIdLog.findMany({ where: { status: "pending" } })

        console.log("Pending Mails", pendingEmails?.length)
        const clerk = await clerkClient()

        const processingResults = await Promise.all(pendingEmails.map(mail => processMails(mail, clerk)))

        const result = processingResults.filter(result => result !== null)
        return new NextResponse(JSON.stringify({ data: result }), { status: 200 });
    }
    catch (error) {
        console.error("Error in /api/fetch GET handler:", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}