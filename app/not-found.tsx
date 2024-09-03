import Navbar from "@/components/Navbar"
import Link from "next/link"

const notfound = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center h-screen text-center mt-20">
        <h2 className="text-3xl pt-10 text-primary">There was a poroblem 😔</h2>
        <p className="pt-5">We could not find the page you were looking for.</p>
        <p>
          Go back to the{" "}
          <Link
            href="/"
            className="font-bold text-primary hover:text-primary/80"
          >
            Home
          </Link>
        </p>
      </main>
    </>
  )
}

export default notfound
