import { DisplayProvider } from "./DisplayContext"

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <DisplayProvider>
      {children}
    </DisplayProvider>
  )
}
