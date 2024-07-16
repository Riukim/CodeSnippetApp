import React from 'react'

const AddSnippetButton = () => {
  return (
    <div className='absolute flex gap-2 px-3 bg-primary rounded-3xl p-1 text-[14px] top-[5px] right-[6px] items-center cursor-pointer select-none'>
      <div className='font-bold'>+</div>
      <div className='font-semibold'>Snippet</div>
    </div>
  )
}

export default AddSnippetButton