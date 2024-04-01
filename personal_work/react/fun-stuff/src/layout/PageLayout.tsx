import { Navbar } from './Navbar'

export type PageLayoutProps = {
  bare: boolean,
}

export function PageLayout({ bare = false }: PageLayoutProps) {
  return (
    <div>
      { !bare &&
        <>
          <Navbar />
        </>
      }
    </div>
  )
}
