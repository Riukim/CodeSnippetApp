import AuthLinks from '@/components/AuthLinks'
import Languages from '@/components/Languages'
import Logo from '@/components/Logo'
import QuickLinks from '@/components/QuickLinks'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarProps } from '@/types/context'
import { Menu } from 'lucide-react'

const SidebarMenu = ({ showQuickLinks }: SidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="hidden max-lg:block"
        >
          <Menu className="text-slate-500 cursor-pointer" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle hidden>Snippet Share Sidebar</SheetTitle>
          <Logo />
        </SheetHeader>
        <SheetDescription hidden>
          This is the sidebar menu with quick links and language options.
        </SheetDescription>
        {showQuickLinks ? <QuickLinks /> : <AuthLinks />}
        <Languages />
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMenu