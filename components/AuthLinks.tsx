import Link from "next/link"
import React from "react"

const AuthLinks = () => {
  return (
    <div className="mt-20 text-sm">
      <div className="font-bold">Get Started</div>
      <ul className="text-slate-400 flex flex-col gap-4">
        <li className="flex cursor-pointer mt-5 select-none items-center w-[80%] rounded-md text-slate-400 font-semibold">
          <Link href="/sign-up">Sign Up</Link>
        </li>
        <li className="flex cursor-pointer select-none  items-center w-[80%] rounded-md text-slate-400 font-semibold">
          <Link href="/sign-in">Log In</Link>
        </li>
      </ul>
    </div>
  )
}

export default AuthLinks
