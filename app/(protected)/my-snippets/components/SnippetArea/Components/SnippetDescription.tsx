import { Copy } from 'lucide-react'
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
    <div className="flex items-start justify-between  mt-4 mx-4">
      <span className="text-base lg:text-sm -tracking-tight line-clamp-4 whitespace-normal break-words">
        {description}
      </span>
      <div>
        <Copy
          size={20}
          className="ml-4 cursor-pointer hover:text-primary"
          onClick={handleCopy}
        />
      </div>
    </div>
  )
}

export default SnippetDescription