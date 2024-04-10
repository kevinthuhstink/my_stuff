import { useContext } from "react"
import { DisplayContext } from "@/contexts/DisplayContext"
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'

export type PageLayoutProps = {
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
  const { display } = useContext(DisplayContext)

  return (
    <div>
      { !bare ?
        <>
          <Navbar title={title} />
          <div id="under-nav">
            <main id="main">
              {children}
            </main>
            <Sidebar hide={display.hideSidebar} title={sidebarTitle} description={description} />
          </div>
        </> :
        <main id="page-main">
          {children}
        </main>
      }
    </div>
  )
}
