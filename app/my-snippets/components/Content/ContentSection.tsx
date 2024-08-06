"use client"

import React from "react"
import TopBar from "./TopBar/TopBar"
import TagSwiper from "../TagsArea/TagSwiper"
import SnippetArea from "../SnippetArea/SnippetArea"
import ModifySnippet from "../SnippetArea/Components/ModifySnippet"
import { useAppContext } from "@/ContextApi"
import AddSnippet from "../SnippetArea/Components/AddSnippet"

const ContentSection = () => {
  const {
    snippetPanel: { isOpen },
    isMobileState: { isMobile },
    addSnippetState: {isAdding}
  } = useAppContext()

  return (
    <section className={`bg-secondary p-5 shadow-md h-fill w-full ${isOpen || isAdding ? "max-sm:overflow-y-hidden h-fill" : "overflow-auto"}`}>
      <TopBar />
      <TagSwiper />
      <div className="flex gap-4 mt-5">
        <div
          className={`${
            isOpen || isAdding ? `${isMobile ? "w-full blur-sm" : "w-[50%]"}` : "w-full"
          }`}
        >
          <SnippetArea />
        </div>
        <ModifySnippet />
        <AddSnippet />
      </div>
    </section>
  )
}

export default ContentSection
