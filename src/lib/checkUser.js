import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export async function checkUser() {
    const user = await currentUser()

    if (!user) return null

    try {
        const exsistingUser = await db.user.findUnique({
            where: { clerkUserId: user.id }
        })

        if (exsistingUser) {
            return exsistingUser
        }

        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name: user.fullName,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            }
        })
        return newUser

    } catch (error) {
        console.log(error.message)
    }


}