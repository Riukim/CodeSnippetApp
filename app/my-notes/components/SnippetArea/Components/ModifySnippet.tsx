"use client"

import { useAppContext } from "@/ContextApi"

const ModifySnippet = () => {
  const {
    snippetPanel: { isOpen, setIsOpen },
    isMobileState: {isMobile}
  } = useAppContext()

  return (
    <div
      className={`bg-card shadow-md p-3 h-[700px] rounded-lg ${
        isOpen ? "block" : "hidden"
      }  
        ${
          isMobile
            ? "absolute z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : ""
        }
        ${isMobile ? "w-4/5" : "w-1/2"}
      `}
    >
      ModifySnippet
      <div
        onClick={() => setIsOpen(false)}
        className="cursor-pointer mt-2"
      >
        close
      </div>
    </div>
  )
}

export default ModifySnippet