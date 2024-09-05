import { Code } from "lucide-react"

const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-primary p-[6px] rounded-md">
        <Code
          size={28}
          color="white"
        />
      </div>
      <div className="flex gap-1 text-[22px]">
        <span className="font-bold text-primary">Snippet</span>
        <span className="text-foreground">Share</span>
      </div>
    </div>
  )
}

export default Logo
