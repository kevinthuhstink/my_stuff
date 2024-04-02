import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'

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
          <div id="under-nav">
            <main id="main">
              {children}
            </main>
            <Sidebar />
          </div>
        </> :
        <main id="page-main">
          {children}
        </main>
      }
    </div>
  )
}
