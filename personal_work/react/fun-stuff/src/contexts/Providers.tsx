import { KeyProvider } from "./KeyContext"
import { DisplayProvider } from "./DisplayContext"
import { SpotifyAuthProvider } from "./SpotifyAuthContext"

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <KeyProvider>
      <DisplayProvider>
        <SpotifyAuthProvider>
          {children}
        </SpotifyAuthProvider>
      </DisplayProvider>
    </KeyProvider>
  )
}
