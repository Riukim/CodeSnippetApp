import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { SignInButton } from "@clerk/nextjs"

const CtaSection = () => {
  return (
    <section className="flex flex-col mx-16 items-center mt-[4rem] gap-6">
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
        src="images/snippetshare2.png"
        className="mb-6 border border-secondary"
      />
    </section>
  )
}

export default CtaSection