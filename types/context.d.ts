// File per definizone dei tipi del contextAPI

import React from "react"

export interface LanguageCountType {
  _id: string
  count: number
}
export interface TagsCountType {
  _id: string
  count: number
}
export interface SingleTagType {
  _id: number | string,
  name: string,
  clerkUserId?: string
}

export interface MenuItem {
  id: number
  name: string
  path:string
  isSelected: boolean
  icon: React.ReactNode
}

export interface SidebarProps {
  showQuickLinks: boolean
}

export interface SingleSnippetTypes {
  _id: number | string
  title: string
  code: string
  creationDate: string
  isFavorite: boolean
  isPublic: boolean
  isTrash: boolean
  tags: { name: string; clerkUserId?: string }[]
  description: string
  language: string
  clerkUserId?: string
}

// Definisce il tipo del contesto dell'applicazione con lo stato del menu della sidebar e la funzione per aggiornarlo
export interface AppContextType {
  menuState: {
    menuItems: MenuItem[]
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>
  }
  snippetPanel: {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  }
  isMobileState: {
    isMobile: boolean
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
  }
  snippetsState: {
    allSnippets: SingleSnippetTypes[]
    setAllSnippets: React.Dispatch<React.SetStateAction<SingleSnippetTypes[]>>
    clerkId: string
    setClerkId: React.Dispatch<React.SetStateAction<string>>
    updateSnippet: (
      snippetId: number | string,
      updatedData: Partial<SingleSnippetTypes>
    ) => Promise<any>
    deleteSnippet: (snippetId: number | string) => Promise<any>
    /* countSnippetByLanguage: () => Promise<any> */
    languageCount: LanguageCountType[]
    setLanguageCount: React.Dispatch<React.SetStateAction<LanguageCountType[]>>
    tagsCount: TagsCountType[],
    setTagsCount: React.Dispatch<React.SetStateAction<TagsCountType[]>>
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  }
  SelectedSnippetState: {
    selectedSnippet: SingleSnippetTypes | null
    setSelectedSnippet: React.Dispatch<
      React.SetStateAction<SingleSnippetTypes | null>
    >
  }
  addSnippetState: {
    isAdding: boolean
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>
    addSnippet: (newSnippetData: Partial<SingleSnippetTypes>) => Promise<any>
  }
  TagsState: {
    allTags: SingleTagType[]
    setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>
    addTag: (newTagData: Partial<SingleTagType>) => Promise<any>
    deleteTag: (tagId: number | string) => Promise<any>
    updateTag: (
      tagId: number | string,
      updateData: Partial<SingleTagType>
    ) => Promise<any>
  }
  SelectedTagState: {
    selectedTag: SingleTagType[] | null
    setSelectedTag: React.Dispatch<React.SetStateAction<SingleTagType[] | null>>
  }
}
