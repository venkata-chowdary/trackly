import Navbar from "@/components/nav-bar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const { userId } = await auth()

  if (userId) {
    redirect("/dashboard")
  }
  return <>
  
    {/* <header className="px-8 sm:px-60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-[68px] items-center justify-between">
        <Link href={'/home'}>
          <h1 className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight">
            Trackly
          </h1>
        </Link>
        <div className='flex items-center gap-4 max-sm:gap-3'>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </header> */}
    <Navbar />
    <section>
      <p>This is the landing page</p>
    </section>
  </>
}
