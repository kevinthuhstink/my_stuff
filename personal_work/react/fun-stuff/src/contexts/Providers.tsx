import { DisplayProvider } from "./DisplayContext"
import { SpotifyAuthProvider } from "./SpotifyAuthContext"

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <DisplayProvider>
      <SpotifyAuthProvider>
        {children}
      </SpotifyAuthProvider>
    </DisplayProvider>
  )
}
