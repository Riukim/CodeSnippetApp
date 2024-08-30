"use client"

import React, { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Mousewheel, Pagination } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import { useAppContext } from "@/ContextApi"
import TagManagment from "@/components/TagManagment"
import { SingleTagType } from "@/types/context"
import { usePathname } from "next/navigation"

export default function TagSwiper() {
  const {
    snippetPanel: { isOpen },
    snippetsState: { allSnippets },
    isMobileState: { isMobile },
    addSnippetState: { isAdding },
    TagsState: { allTags },
    SelectedTagState: { selectedTag, setSelectedTag },
  } = useAppContext()

  const pathname = usePathname()

  // Filtra solo gli snippet pubblici
  const publicSnippets = allSnippets.filter((snippet) => snippet.isPublic)

  const publicTags = publicSnippets.reduce((acc: SingleTagType[], snippet) => {
    snippet.tags.forEach((tag) => {
      const tagWithId = tag as SingleTagType
      if (!acc.find((t) => t.name === tagWithId.name)) {
        acc.push(tagWithId)
      }
    })
    return acc
  }, [] as SingleTagType[])

  const displayedTags = pathname === "/public-snippets" ? publicTags : allTags

  //console.log("publicTags: ", displayedTags)

  useEffect(() => {
    setSelectedTag([])
  }, [pathname, setSelectedTag])

  const handleTagSelect = (tag: SingleTagType | null) => {
    //console.log("Selected Tag: ", tag)
    setSelectedTag(tag ? [tag] : [])
  }

  const isTagSelected = (tagName: string) => {
    //console.log("Checking if tag is selected: ", tagName)
    return (
      selectedTag !== null && selectedTag.some((tag) => tag.name === tagName)
    )
  }

  return (
    <div
      className={`p-3 bg-background rounded-lg flex items-center mt-4 gap-5 ${
        isOpen || isAdding ? `${isMobile ? "blur-sm" : ""}` : ""
      }`}
    >
      <div className="overflow-auto w-full">
        <Swiper
          slidesPerView="auto"
          direction="horizontal"
          spaceBetween={10}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: "auto",
              spaceBetween: 20,
            },
          }}
          mousewheel
          freeMode={true}
          modules={[FreeMode, Mousewheel, Pagination]}
          className="mySwiper max-w-[100vw]"
        >
          <SwiperSlide
            className={`min-w-20 ${
              selectedTag === null || selectedTag.length === 0
                ? "bg-primary text-white"
                : "bg-background"
            }`}
            onClick={() => handleTagSelect(null)}
          >
            All
          </SwiperSlide>
          {displayedTags.map((tag, index) => (
            <SwiperSlide
              key={`${tag.name}-${index}`}
              className={`min-w-20 ${
                isTagSelected(tag.name)
                  ? "bg-primary text-white"
                  : "bg-background"
              }`}
              onClick={() => handleTagSelect(tag)}
            >
              {tag.name}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {pathname !== "/public-snippets" && <TagManagment />}
    </div>
  )
}
