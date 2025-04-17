import { db } from '@/lib/prisma'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


export default async function fetchMailsAndLogForUser(user) {
    try {
        const clerk = await clerkClient()
        const clerkResponse = await clerk.users.getUserOauthAccessToken(user.clerkUserId, "google")
        const googleAccessToken = clerkResponse.data[0]?.token

        if (!googleAccessToken) {
            return new NextResponse(JSON.stringify({ message: "No Google OAuth token found" }), { status: 401 });
        }

        const lastMail = await db.mailIdLog.findFirst({ where: { userRefId: user.id }, orderBy: { createdAt: "desc", }, })

        const gmailResponse = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!gmailResponse.ok) {
            const errText = await gmailResponse.text();
            console.error(`Gmail API error for ${user.email}:`, errText);
            throw new Error('Failed to fetch Gmail data');
        }

        const gmailData = await gmailResponse.json();
        const messageIds = gmailData.messages

        if (!messageIds.length) {
            return new NextResponse(JSON.stringify({ message: "No emails found" }), { status: 204 });
        }

        if (lastMail && messageIds[0].id === lastMail.mailId) {
            return new NextResponse(JSON.stringify({ message: "No latest emails to save" }), { status: 202 });
        }

        await db.mailIdLog.createMany({
            data: messageIds.map((mail) => ({
                mailId: mail.id,
                threadId: mail.threadId,
                userRefId: user.id,
            })),
            skipDuplicates: true,
        });

        return new NextResponse(JSON.stringify({ message: "Emails saved successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error in /api/fetch GET handler:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}



// console.log(user)


// const lastMailTimeStamp = lastMail ? `&q=newer_than:${lastMail.createdAt}` : ""
// console.log("Last mail", lastMailTimeStamp)
