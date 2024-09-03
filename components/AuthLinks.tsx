import Link from "next/link"

const AuthLinks = () => {
  return (
    <div className="mt-20 text-sm">
      <div className="font-bold">Quick Links</div>
      <ul className="text-slate-400 mt-2 flex flex-col gap-4">
        <li className="flex cursor-pointer select-none p-[7px] items-center w-[80%] rounded-md text-slate-400 hover:bg-primary hover:text-foreground">
          <Link href="/sign-up">Sign Up</Link>
        </li>
        <li className="flex cursor-pointer select-none gap-2 p-[7px] items-center w-[80%] rounded-md text-slate-400 hover:bg-primary hover:text-foreground">
          <Link href="/sign-in">Log In</Link>
        </li>
      </ul>
    </div>
  )
}

export default AuthLinks
