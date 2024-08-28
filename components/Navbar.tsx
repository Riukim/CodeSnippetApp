"use client"

import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs"
import Logo from "./Logo"
import { Button } from "./ui/button"
import Link from "next/link"

const Navbar = () => {
  const { userId } = useAuth()
    
  return (
    <nav className="flex m-5 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col">
      <Link href="/">
        <Logo />
      </Link>
      <div className="max-sm:w-full">
        {userId ? (
          <Link href="/my-snippets">
            <Button className="max-sm:w-full bg-primary p-[8px] px-6 text-sm text-white rounded-md max-sm:mt-8">
              Access To The App
            </Button>
          </Link>
        ) : (
          <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
            <SignInButton>
              <Button
                variant="default"
                className="max-sm:w-full p-[8px] px-6 text-sm text-white rounded-md"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant="outline"
                className="text-sm text-foreground hover:text-white p-[8px] px-6 rounded-md"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar