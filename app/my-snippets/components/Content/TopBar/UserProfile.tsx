"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import Image from "next/image"
import React from "react"

const UserProfile = () => {
  const { user } = useUser()
  const imgUrl = user?.imageUrl

  const loadingImage = (
    <div className="w-9 h-9 rounded-full mb-[5px] bg-muted animate-pulse"></div>
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
        <Image
          src={imgUrl}
          width={36}
          height={36}
          alt={`${user?.firstName} ${user?.lastName}`}
          className="rounded-full h-9 w-9 max-lg:mr-2"
        />
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
