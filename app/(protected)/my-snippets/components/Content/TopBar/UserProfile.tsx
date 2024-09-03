"use client"

import { useAppContext } from "@/ContextApi"
import { useClerk, UserButton, useUser } from "@clerk/nextjs"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const UserProfile = () => {
  const { resetContext } = useAppContext()

  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const imgUrl = user?.imageUrl

  const handleLogout = async () => {
    await signOut()
    router.push("/")
    resetContext()
  }

  const loadingImage = (
    <div className="w-10 h-10 rounded-full mb-[5px] bg-muted animate-pulse items-center"></div>
  )

  const loadingEmail = (
    <span className="bg-muted animate-pulse text-[14px] h-2 w-[130px]"></span>
  )

  const loadingUser = (
    <span className="font-semibold animate-pulse bg-muted h-4 w-[100px]"></span>
  )

  return (
    <div className="flex gap-3 items-center justify-center">
      {!user ? (
        loadingImage
      ) : imgUrl ? (
        <div className="flex items-center">
          <UserButton
            /* afterSignOutUrl="/" */
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
                userButtonAvatar: "rounded-full",
                userButton: "flex items-center h-12 w-12",
                userButtonPopoverActionButton__signOut: "hidden"
              },
            }}
            userProfileMode="modal"
          >
            <UserButton.MenuItems>
                <UserButton.Action
                label="Sign Out"
                labelIcon={<LogOut size={16} />}
                onClick={handleLogout}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      ) : (
        loadingImage
      )}
      <div
        className={`max-lg:hidden flex flex-col text-sm ${
          !user ? "gap-1" : ""
        }`}
      >
        {!user ? (
          loadingUser
        ) : (
          <span className="font-semibold">
            {user?.lastName} {user?.firstName}
          </span>
        )}

        {!user ? (
          loadingEmail
        ) : (
          <span className="text-slate-500 text-[11px]">
            {user?.emailAddresses[0].emailAddress}
          </span>
        )}
      </div>
    </div>
  )
}

export default UserProfile
