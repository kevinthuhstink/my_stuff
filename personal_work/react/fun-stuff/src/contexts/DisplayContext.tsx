import { useState, createContext } from 'react'

export interface Display {
  dark: boolean
  hideSidebar: boolean
}

type DisplayContextType = {
  display: Display
  setDisplay: (display: Display) => void
}

const defaultDisplay = {
  display: {
    dark: false,
    hideSidebar: false
  },
  setDisplay: null!
}

export const DisplayContext = createContext<DisplayContextType>(defaultDisplay);

export function DisplayProvider({ children }: React.PropsWithChildren) {
  const [display, setDisplay] = useState<Display>(defaultDisplay.display)

  return (
    <DisplayContext.Provider value={{ display, setDisplay }}>
      {children}
    </DisplayContext.Provider>
  )
}
