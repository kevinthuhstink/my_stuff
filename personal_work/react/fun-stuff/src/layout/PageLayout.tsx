import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'

interface PageLayoutProps {
  bare?: boolean,
  title: string,
  sidebarTitle?: string
  description: string,
  children?: React.ReactNode,
}

export function PageLayout({
  bare = false,
  title,
  sidebarTitle,
  description,
  children
}: PageLayoutProps) {
  return (
    <div>
      { !bare ?
        <>
          <Navbar title={title} />
          <div id="under-nav">
            <main id="main">
              {children}
            </main>
            <Sidebar title={sidebarTitle} description={description} />
          </div>
        </> :
        <main id="page-main">
          {children}
        </main>
      }
    </div>
  )
}
