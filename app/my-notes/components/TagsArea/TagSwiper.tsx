"use client"

import React from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// import required modules
import { FreeMode, Mousewheel, Pagination } from "swiper/modules"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TagSwiper() {
  return (
    <div className="p-3 bg-card rounded-lg flex items-center gap-5">
      <div className="overflow-auto">
        <Swiper
          slidesPerView="auto"
          direction="horizontal"
          grabCursor
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
          <SwiperSlide className="bg-primary">
            All
          </SwiperSlide>
          <SwiperSlide className="text-slate-400">
            JavaScript Exercise
          </SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
          <SwiperSlide className="text-slate-400">React exercise</SwiperSlide>
        </Swiper>
      </div>
      <Button
        size="sm"
        className="rounded-md px-4 flex gap-1 items-center justify-center text-foreground"
      >
        <Plus
          size={18}
          strokeWidth={3}
        />
        <span className="font-semibold">Tag</span>
      </Button>
    </div>
  )
}
