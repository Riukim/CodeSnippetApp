"use client"

import { useAppContext } from '@/ContextApi'
import React from 'react'

const DarkMode = () => {
  const {
    darkModeObject: {darkMode, setDarkMode}
  } = useAppContext()

  function handleDarkMode(index: number) {
    const updateDarkMode = darkMode.map((item, i) => {
      if (i === index) {
        return {...item, isSelected: true}
      } else {
        return {...item, isSelected: false}
      }
    })
    setDarkMode(updateDarkMode)
  }

  return (
    <div className='bg-accent h-[36px] w-[74px] rounded-3xl flex items-center gap-2 pl-[5px]'>
      {darkMode.map((item , index) => {
        return (
          <div
            className={`${
              item.isSelected
                ? "bg-primary text-foreground font-semibold"
                : "bg-card text-primary font-semibold"
            } w-7 h-7 flex items-center justify-center rounded-full top-[4px] p-1 left-1 cursor-pointer select-none`}
            key={index}
            onClick={() => handleDarkMode(index)}
          >
            {item.icon}
          </div>
        )
      })}
    </div>
  )
}

export default DarkMode