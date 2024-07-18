import React from "react"
import TopBar from "./TopBar/TopBar"
import TagSwiper from "../TagsArea/TagSwiper"
import SnippetArea from "../SnippetArea/SnippetArea"

const ContentSection = () => {
  return (
    <section className="bg-secondary p-5 shadow-md overflow-auto">
      <TopBar />
      <div className="mt-5">
        <TagSwiper />
        <SnippetArea />
      </div>
    </section>
  )
}

export default ContentSection
