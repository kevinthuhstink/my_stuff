import { Navbar } from '@/components/Navbar'

export type PageLayoutProps = {
  bare?: boolean,
  title?: string,
  navDescription?: string,
  children?: React.ReactNode,
}

export function PageLayout({
  bare = false,
  title,
  navDescription,
  children
}: PageLayoutProps) {
  return (
    <div>
      { !bare ?
        <>
          <Navbar title={title} description={navDescription} />
          <main id="main">
            {children}
          </main>
        </> :
        <main id="page-main">
          {children}
        </main>
      }
    </div>
  )
}
