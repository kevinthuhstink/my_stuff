import { useState, createContext, Dispatch, SetStateAction } from 'react'

export interface Display {
  dark: boolean
  hideSidebar: boolean
}

export type SpotifyAccessToken = {
  access_token: string,
  token_type: string,
  expires_in: number
}

interface SpotifyAuthContextType {
  accessToken: SpotifyAccessToken
  setAccessToken: Dispatch<SetStateAction<SpotifyAccessToken>>
}

export const SpotifyAuthContext = createContext<SpotifyAuthContextType>(null!);

export function SpotifyAuthProvider({ children }: React.PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<SpotifyAccessToken>(null!)

  return (
    <SpotifyAuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </SpotifyAuthContext.Provider>
  )
}
