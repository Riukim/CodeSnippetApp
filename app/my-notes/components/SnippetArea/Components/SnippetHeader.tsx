"use client"

import { useAppContext } from '@/ContextApi'
import { Heart } from 'lucide-react'
import React from 'react'

const SnippetHeader = () => {
  const {snippetPanel: {setIsOpen} } = useAppContext()

  return (
    <>
      <div className="flex justify-between mx-4">
        <span
          className="font-bold text-lg w-[87%] hover:text-primary cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
        <div className='pt-1'>
          <Heart
            size={20}
            fill="red"
            stroke=''
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className='text-muted-foreground text-[12px] flex gap-1 font-normal mx-4 mt-1'>
        <span>18th July 2024</span>
      </div>
    </>
  )
}

export default SnippetHeader