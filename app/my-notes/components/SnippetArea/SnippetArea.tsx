import React, { useEffect } from 'react'
import SingleSnippet from './Components/SingleSnippet'
import { useAppContext } from '@/ContextApi'
import { useUser } from '@clerk/nextjs'

const SnippetArea = () => {
  const {
    snippetPanel: { isOpen },
    snippetsState: { allSnippets, clerkId, setClerkId },
    addSnippetState: {isAdding}
  } = useAppContext()

  const {user} = useUser()

  useEffect(() => {
    if (user) {
      const clerkId = user.id
      setClerkId(clerkId)
    }
  }, [setClerkId, user]);

  return (
    <div
      className={`grid gap-4  ${
        isOpen || isAdding
          ? " max-sm:grid-cols-1 max-lg:grid-cols-1 max-xl:grid-cols-1 grid-cols-1"
          : "grid-cols-3 max-sm:grid-cols-1 max-xl:grid-cols-2"
      }`}
    >
      {allSnippets.map(snippet => (
        <SingleSnippet key={snippet._id} snippet={snippet} />
      ))}
    </div>
  )
}

export default SnippetArea