import Logo from "./Logo"
import { Button } from "./ui/button"

const Navbar = () => {
  return (
    <nav className="flex m-5 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col">
      <Logo />
      <div className="flex gap-2 max-sm:flex-col max-sm:w-[60%] max-sm:mt-8">
        <Button
          variant="default"
          className="max-sm:w-full p-[8px] px-6 text-sm text-white rounded-md"
        >
          Sign In
        </Button>
        <Button
          variant="outline"
          className="text-sm text-foreground hover:text-white p-[8px] px-6 rounded-md"
        >
          Sign Up
        </Button>
      </div>
    </nav>
  )
}

export default Navbar