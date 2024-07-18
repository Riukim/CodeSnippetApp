import React from 'react'
import SingleSnippet from './Components/SingleSnippet'

const SnippetArea = () => {
  return (
    <div className='mt-5 flex flex-wrap gap-4'>
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
    </div>
  )
}

export default SnippetArea