import { Code } from "lucide-react"
import Link from "next/link"
import React from "react"

const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-primary p-[6px] rounded-md">
        <Code
          size={27}
          color="white"
        />
      </div>
      <div className="flex gap-1 text-[19px]">
        <span className="font-bold text-primary">Snippet</span>
        <span className="text-foreground">Share</span>
      </div>
    </div>
  )
}

export default Logo
