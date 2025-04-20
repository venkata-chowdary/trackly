import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Navbar() {
    return (
        <header className="px-8 sm:px-60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-[68px] items-center justify-between">
                <Link href={'/home'}>
                    <h1 className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-normal">
                        trackly
                    </h1>
                </Link>
                <div className='flex items-center gap-4 max-sm:gap-3'>
                    <div className="flex flex-row gap-2 text-sm text-muted-foreground">
                        <Link href="/privacy-policy">Privacy Policy</Link>
                        <Link href="/terms-and-conditions">Terms and Conditions</Link>
                        <Link href="/cancellation-and-refund">Cancellation & Refund</Link>
                        <Link href="/shipping-and-delivery">Shipping & Delivery</Link>
                        <Link href="/contact-us">Contact Us</Link>
                    </div>

                    <SignedOut>
                        <SignInButton forceRedirectUrl="/dashboard">
                            <Button>Login</Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </header>
    )

}
