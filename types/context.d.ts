// File per definizone dei tipi del contextAPI

export interface MenuItem {
  id: number
  name: string
  isSelected: boolean
  icon: React.ReactNode
}

export interface SingleSnippetTypes {
  id: number,
  title: string,
  code: string,
  creationDate: string,
  isFavorite: boolean,
  isPublic: boolean,
  tags: string[],
  description: string,
  language: string,
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
  },
  snippetsState: {
    allSnippets: SingleSnippetTypes[],
    setAllSnippets: React.Dispatch<React.SetStateAction<SingleSnippetTypes[]>>
  }
}
