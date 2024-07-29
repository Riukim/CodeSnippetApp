import React from 'react'

interface SnippetDescriptionProps {
  description: string
}

const SnippetDescription = ({description}: SnippetDescriptionProps) => {
  return (
    <div className='text-base lg:text-sm -tracking-tight mt-4 mx-4'>
      {description}
    </div>
  )
}

export default SnippetDescription