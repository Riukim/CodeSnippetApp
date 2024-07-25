"use client"

import React from "react"
import TopBar from "./TopBar/TopBar"
import TagSwiper from "../TagsArea/TagSwiper"
import SnippetArea from "../SnippetArea/SnippetArea"
import ModifySnippet from "../SnippetArea/Components/ModifySnippet"
import { useAppContext } from "@/ContextApi"

const ContentSection = () => {
  const {
    snippetPanel: { isOpen },
    isMobileState: { isMobile },
  } = useAppContext()

  return (
    <section className="bg-secondary p-5 shadow-md overflow-auto">
      <TopBar />
      <TagSwiper />
      <div className="flex gap-4 mt-5">
        <div
          className={`${
            isOpen ? `${isMobile ? "w-full blur-sm overflow-hidden" : "w-[50%]"}` : "w-full"
          }`}
        >
          <SnippetArea />
        </div>
        <ModifySnippet />
      </div>
    </section>
  )
}

export default ContentSection
