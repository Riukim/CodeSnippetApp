"use client"

import { useAppContext } from "@/ContextApi"
import AddSnippet from "../SnippetArea/Components/AddSnippet"
import ModifySnippet from "../SnippetArea/Components/ModifySnippet"
import SnippetArea from "../SnippetArea/SnippetArea"
import TagSwiper from "../TagsArea/TagSwiper"
import TopBar from "./TopBar/TopBar"

const ContentSection = () => {
  const {
    snippetPanel: { isOpen },
    isMobileState: { isMobile },
    addSnippetState: {isAdding}
  } = useAppContext()

  return (
    <section className={`bg-secondary p-5 shadow-md min-h-screen h-fill w-full ${isOpen || isAdding ? "max-sm:overflow-y-hidden h-fill" : "overflow-auto"}`}>
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
