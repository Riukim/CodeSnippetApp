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

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus, X, Pencil, SearchIcon, TagIcon } from "lucide-react"
import { useAppContext } from "@/ContextApi"
import { v7 as uuidv7 } from "uuid"

export default function TagSwiper() {
  const {
    snippetPanel: { isOpen },
    isMobileState: { isMobile },
    addSnippetState: { isAdding },
    snippetsState: { clerkId },
    TagsState: { allTags, setAllTags, addTag },
  } = useAppContext()

  const [searchTerm, setSearchTerm] = useState("")
  const [newTagName, setNewTagName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddTag = async () => {
    if (newTagName.trim() !== "") {
      try {
        const newTag = {
          id: uuidv7(),
          name: newTagName,
          clerkUserId: clerkId,
        }
        const savedTag = await addTag(newTag)
        setAllTags([...allTags, savedTag])
        setNewTagName("")
        setIsDialogOpen(false) // Close the dialog
      } catch (error) {
        console.error("Error adding tag: ", error)
      }
    }
  }

  return (
    <div
      className={`p-3 bg-background rounded-lg flex items-center mt-4 gap-5 ${
        isOpen || isAdding ? `${isMobile ? "blur-sm" : ""}` : ""
      }`}
    >
      <div className="overflow-auto">
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
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="rounded-md px-4 flex gap-1 items-center justify-center text-foreground h-[33px]"
          >
            <Plus
              size={18}
              strokeWidth={3}
            />
            <span className="font-semibold">Tag</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2 px-4">
              <TagIcon
                size={18}
                className="mt-1 text-green-800"
              />
              <DialogTitle>Tags Managment</DialogTitle>
            </div>
          </DialogHeader>
          <div className="flex items-center px-4 gap-4 mt-4">
            <SearchIcon
              size={18}
              className="text-green-800"
            />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search a tag..."
              className="flex-1 focus-visible:ring-transparent"
            />

            {/* Dialog per inserire una nuova Tag */}
            <Dialog
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  size="default"
                  className="rounded-md px-4 flex gap-1 items-center justify-center text-foreground"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus
                    size={18}
                    strokeWidth={3}
                  />
                  <span className="font-semibold">Tag</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <div className="flex items-center gap-2 px-4">
                    <TagIcon
                      size={18}
                      className=" text-green-800"
                    />
                    <DialogTitle>Add a new Tag</DialogTitle>
                  </div>
                </DialogHeader>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add new tag..."
                    value={newTagName}
                    className="flex-1 focus-visible:ring-transparent"
                    onChange={(e) => setNewTagName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddTag()
                      }
                    }}
                  />
                  <Button
                    className="text-foreground"
                    onClick={handleAddTag}
                  >
                    Add Tag
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto border-b">
            {allTags
              .filter((tag) =>
                tag.name?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((tag) => (
                <div
                  key={tag._id}
                  className="flex justify-between items-center p-2 rounded-lg bg-secondary mb-2"
                >
                  <span className="bg-green-100 text-green-800 p-1 rounded-lg px-2">
                    {tag.name}
                  </span>
                  <div className="flex gap-2">
                    <div className="p-2 rounded-full bg-green-100">
                      <Pencil
                        size={16}
                        className="cursor-pointer text-green-800"
                        onClick={() => {}}
                      />
                    </div>
                    <div className="p-2 rounded-full bg-green-100">
                      <X
                        size={16}
                        className="cursor-pointer text-green-800"
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
