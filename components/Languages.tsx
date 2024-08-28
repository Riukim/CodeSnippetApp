"use client"

import { useAppContext } from "@/ContextApi"
import Image from "next/image"

const getIconPath = (language: string) => {
  const lowerCaseLanguage = language.toLowerCase()

  if (lowerCaseLanguage === "c#") {
    return "/icons/csharp.png"
  }

  return `/icons/${lowerCaseLanguage}.svg`
}

const Languages = () => {
  const {
    snippetsState: { languageCount },
  } = useAppContext()

  const noLanguages = languageCount.length === 0

  return (
    <div className="mt-12 text-sm">
      <div className="font-bold">Languages</div>
      {noLanguages ? (
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
