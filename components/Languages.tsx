"use client"

import { useAppContext } from "@/ContextApi"
import Image from "next/image"
import { useEffect, useState } from "react"

const getIconPath = (language: string) => {
  const lowerCaseLanguage = language.toLowerCase()

  if (lowerCaseLanguage === "c#") {
    return "/icons/csharp.png"
  }

  return `/icons/${lowerCaseLanguage}.svg`
}

const Languages = () => {
  const {
    snippetsState: { languageCount, setLanguageCount },
  } = useAppContext()

  const [isloading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadingState = () => {
      if (languageCount.length === 0) {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      } else {
        setIsLoading(false)
      }
    }
    loadingState()
    setLanguageCount(languageCount)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageCount])

  if (isloading) {
    return (
      <>
        <div className="mt-12 font-bold text-sm">Languages</div>
        <ul className="text-slate-400 mt-4 flex flex-col gap-4">
          <li className="animate-pulse bg-gray-300 rounded-md h-6 w-[80%]"></li>
          <li className="animate-pulse bg-gray-300 rounded-md h-6 w-[80%]"></li>
        </ul>
      </>
    )
  }

  return (
    <div className="mt-12 text-sm">
      <div className="font-bold">Languages</div>
      {languageCount.length === 0 ? (
        <p className="mt-5 text-slate-400 w-[80%]">
          No languages yet.
          <br /> Add a new snippet to show the languages.
        </p>
      ) : (
        <div className="mt-5 text-slate-400 flex flex-col gap-4">
          {languageCount.map(({ _id, count }) => (
            <div
              key={_id}
              className="flex justify-between"
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={getIconPath(_id)}
                  alt={`${_id} icon`}
                  width={18}
                  height={18}
                  className="w-5 h-5"
                />
                {_id}
              </div>
              <span className="font-bold">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Languages
