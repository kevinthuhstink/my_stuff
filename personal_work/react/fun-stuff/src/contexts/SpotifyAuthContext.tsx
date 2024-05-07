import { useRef, createContext } from 'react'

export interface Display {
  dark: boolean
  hideSidebar: boolean
}

interface SpotifyAuthContextType {
  accessToken: React.MutableRefObject<string>
  tokenExpiresIn: React.MutableRefObject<number>
}

export const SpotifyAuthContext = createContext<SpotifyAuthContextType>(null!);

export function SpotifyAuthProvider({ children }: React.PropsWithChildren) {
  const accessToken = useRef<string>(null!)
  const tokenExpiresIn = useRef<number>(null!)

  return (
    <SpotifyAuthContext.Provider value={{ accessToken, tokenExpiresIn }}>
      {children}
    </SpotifyAuthContext.Provider>
  )
}
