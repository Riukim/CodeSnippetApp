import { Grid2X2, Heart, Trash2 } from 'lucide-react'
import React from 'react'

const QuickLinks = () => {
  return (
    <div className="mt-20 text-sm">
      <div className="font-bold text-slate-400">Quick Links</div>
      <ul className="text-slate-400 mt-4 flex flex-col gap-2">
        <li className="flex gap-2 items-center bg-primary text-white p-[7px] px-2 rounded-md w-[60%]">
          <Grid2X2 size={18} />
          <span>All Snippets</span>
        </li>

        <li className="flex gap-2 items-center p-[7px] px-2 rounded-md w-[60%] hover:bg-primary hover:text-white">
          <Heart size={18} />
          <span>Favorites</span>
        </li>
        <li className="flex gap-2 items-center p-[7px] px-2 rounded-md w-[60%] hover:bg-primary hover:text-white">
          <Trash2 size={18} />
          <span>Trash</span>
        </li>
      </ul>
    </div>
  )
}

export default QuickLinks