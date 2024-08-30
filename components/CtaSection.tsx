import Link from "next/link"
import { Button } from "./ui/button"

const CtaSection = () => {
  return (
    <section className="flex flex-col mx-16 items-center mt-[8rem] gap-6">
      <h2 className="font-bold text-5xl text-center tracking-tight leading-tight">
        Organize your Code Snippets{" "}
        <span className="text-primary underline">Efficently!</span>
      </h2>

      <p className="text-center text-lg w-[500px] max-sm:w-full text-foreground">
        With our advanced tagging and search features, you can easily locate the
        snippet you need exactly when you need it. Spend more time coding and
        less time searching! Additionally, you can add tags for various
        programming languages.
      </p>

      <Link href="/public-snippets">
        <Button
          variant="default"
          className="text-white block px-9 font-medium"
        >
          Start browsing public Snippets
        </Button>
      </Link>
    </section>
  )
}

export default CtaSection