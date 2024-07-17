import React from "react"
import TopBar from "./TopBar/TopBar"
import TagSwiper from "../TagsArea/TagSwiper"

const ContentSection = () => {
  return (
      <section className="bg-secondary p-5 shadow-md overflow-auto">
        <TopBar />
        <div className="mt-5">
          <TagSwiper />
        </div>
      </section>
  )
}

export default ContentSection
