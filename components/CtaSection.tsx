"use client"

import { SignInButton } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

const CtaSection = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const imgSrc =
    theme === "dark"
      ? "images/snippetshare2.png"
      : "/images/snippetsharelight.png"

  return (
    <section className="flex flex-col mx-16 items-center mt-[3rem] gap-6">
      <h2 className="font-bold text-5xl text-center tracking-tight leading-tight">
        Organize your Code Snippets{" "}
        <span className="text-primary underline">Efficently!</span>
      </h2>

      <p className="text-center text-lg w-[500px] max-sm:w-full text-foreground">
        Quickly add and organize your code snippets to boost your productivity.
      </p>

      <div className="flex gap-4 items-center">
        <SignInButton>
          <Button
            variant="default"
            className="text-white block px-9 font-medium"
          >
            Get Started
          </Button>
        </SignInButton>
        <span className="text-center ">or browse</span>
        <Link href="/public-snippets">
          <Button
            variant="default"
            className="text-white block px-9 font-medium"
          >
            Public Snippets
          </Button>
        </Link>
      </div>
      <Image
        width={1240}
        height={632}
        alt="hero image"
        src={imgSrc}
        className="mb-4 border border-secondary"
      />
    </section>
  )
}

export default CtaSection
