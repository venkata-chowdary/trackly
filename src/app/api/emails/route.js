import fetchMailsAndLogForUser from '@/lib/fetchMailsForUser';
import { db } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const users = await db.user.findMany();

        for (const user of users) {

            try {
                console.log(`Fetching for new mails: ${user.email}`)
                const res = await fetchMailsAndLogForUser(user);
                const { message } = await res.json()

                if (res.status === 200) {
                    console.log(`✅  ${user.email} (${user.id}): ${message}`);
                } else if (res.status === 202 || res.status === 204) {
                    console.log(`ℹ️  ${user.email} (${user.id}): ${message}`);
                } else {
                    console.warn(`⚠️  ${user.email} (${user.id}): Unexpected status ${res.status}: ${message}`);
                }
            } catch (error) {
                console.error(`Error processing user ${user.email} (${user.id}):`, userErr);
            }

        }

        return new NextResponse(JSON.stringify({ message: 'Sync completed for all the users.' }), { status: 200 });
    } catch (err) {
        console.error('Error in /api/fetchAllEmails:', err);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch emails for all users' }), { status: 500 });
    }
}
