import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import React from 'react'
import Logo from '@/components/Logo'
import QuickLinks from '@/components/QuickLinks'
import Languages from '@/components/Languages'

const SidebarMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="hidden max-md:block"
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
        <QuickLinks />
        <Languages />
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMenu