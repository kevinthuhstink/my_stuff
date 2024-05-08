import { useRef, createContext } from "react"

type KeyContextType = () => number

export const KeyContext = createContext<KeyContextType>(null!)

export function KeyProvider({ children }: React.PropsWithChildren) {
  const keys = useRef<number>(0)
  const getKey = () => keys.current++

  return (
    <KeyContext.Provider value={getKey}>
      {children}
    </KeyContext.Provider>
  )
}
