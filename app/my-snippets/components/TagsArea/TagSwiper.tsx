"use client"

import React, { useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// import required modules
import { FreeMode, Mousewheel, Pagination } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import { useAppContext } from "@/ContextApi"
import TagManagment from "@/components/TagManagment"

export default function TagSwiper() {
  const {
    snippetPanel: { isOpen },
    isMobileState: { isMobile },
    addSnippetState: { isAdding },
    TagsState: { allTags },
  } = useAppContext()

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
          <SwiperSlide className="bg-primary min-w-20">All</SwiperSlide>
          {allTags.map((tag) => (
            <SwiperSlide
              key={tag._id}
              className="text-slate-400 min-w-20"
            >
              {tag.name}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <TagManagment />
    </div>
  )
}
