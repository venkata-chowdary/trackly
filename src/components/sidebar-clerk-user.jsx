"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { Settings, Settings2 } from "lucide-react";

export default function NavProfile() {
    const { user } = useUser();
    if (!user) return null;

    return (
        <div className="px-2 py-1">
            <div className="flex flex-row space-x-2 items-center">
                <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={user.imageUrl} alt={user.firstName} />
                    <AvatarFallback className="rounded-lg"> {user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.fullName}</span>
                    <span className="text-muted-foreground truncate text-xs">
                        {user.emailAddresses[0]?.emailAddress}
                    </span>
                </div>
                <div className="relative ml-auto">
                    <IconDotsVertical className="size-4 cursor-pointer" />
                    <div className="absolute inset-0">
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonTrigger: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                                },
                            }}>
                        </UserButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
