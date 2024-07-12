import { Code } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex gap-2 items-center'>
      <div className='bg-slate-500 p-[6px] rounded-md'>
        <Code size={27} color='white'/>
      </div>
      <div className='flex gap-1 text-[19px]'>
        <span className='font-bold text-green-500'>Snippet</span>
        <span className='text-slate-600'>Share</span>
      </div>
    </div>
  )
}

export default Logo