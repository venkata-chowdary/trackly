import { db } from '@/lib/prisma'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(request) {

    try {
        const { userId } = await auth()
        const clerk = await clerkClient()
        const clerkResponse = await clerk.users.getUserOauthAccessToken(userId, "google")
        const googleAccessToken = clerkResponse.data[0]?.token

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            }
        })
        // console.log(user)
        const lastMail = await db.mailId.findFirst({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        // const lastMailTimeStamp = lastMail ? `&q=newer_than:${lastMail.createdAt}` : ""
        // console.log("Last mail", lastMailTimeStamp)

        const gmailResponse = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10`,
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
        const messageIds = gmailData.messages

        if (messageIds[0].id === lastMail.mailId) {
            return new NextResponse(JSON.stringify({ message: "No latest emails to save" }), { status: 200 });
        }

        await db.mailId.createMany({
            data: messageIds.map((mail) => ({
                mailId: mail.id,
                threadId: mail.threadId,
                userId: user.id,
            })),
            skipDuplicates: true,
        });

        return new NextResponse(JSON.stringify({ message: "Emails saved successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error in /api/fetch GET handler:", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
