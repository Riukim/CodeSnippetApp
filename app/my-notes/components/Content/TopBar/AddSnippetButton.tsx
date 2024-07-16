import React from 'react'

const AddSnippetButton = () => {
  return (
    <div className='absolute flex gap-2 px-2 bg-primary rounded-full text-[14px] top-[5px] right-[5px] items-center cursor-pointer select-none'>
      <div className='font-bold text-xl'>
        +
      </div>
      <div className='max-md:hidden font-semibold'>Snippet</div>
    </div>
  )
}

export default AddSnippetButton