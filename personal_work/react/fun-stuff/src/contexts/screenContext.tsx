import { useState, createContext } from 'react'

export interface Display {
    dark: boolean,
    sidebar: boolean,
    sidebarPos: number,
}

export type DisplayContextType = {
    setDisplay: (display: Display) => void
} & Display

const defaultDisplay = {
    dark: false,
    sidebar: true,
    sidebarPos: 300,
    setDisplay: null!
  }

export const DisplayContext = createContext<DisplayContextType>(defaultDisplay);

export function DisplayProvider({ children }: React.PropsWithChildren) {
  const [display, setDisplay] = useState<Display>(defaultDisplay)

  return (
    <DisplayContext.Provider value={{ ...display, setDisplay }}>
      {children}
    </DisplayContext.Provider>
  )
}
