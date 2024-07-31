import { Copy } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface SnippetDescriptionProps {
  description: string,
  code: string
}

const SnippetDescription = ({ description, code }: SnippetDescriptionProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        console.log("Copied to clipboard");
        toast("Snippet has been copied to clipboard!", {
          style: {
            fontSize: "1rem"
          }
        })
      })
    .catch(err => {
      console.error("Failed to copy: ", err)
    })
  }

  return (
    <div className='flex items-center justify-between text-base lg:text-sm -tracking-tight mt-4 mx-4'>
      <div>{description}</div>
      <div>
        <Copy
          size={20}
          className='ml-4 cursor-pointer hover:opacity-70'
          onClick={handleCopy}
        />
      </div>
    </div>
  )
}

export default SnippetDescription