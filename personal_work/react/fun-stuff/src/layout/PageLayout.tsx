import { useContext } from "react"
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { DisplayContext } from "@/contexts/DisplayContext"

interface PageLayoutProps {
  bare?: boolean,
  title: string,
  sidebarTitle?: string
  description: string,
  children?: React.ReactNode,
}

export function PageLayout({
  bare=false,
  title,
  sidebarTitle,
  description,
  children
}: PageLayoutProps) {
  const { display } = useContext(DisplayContext)
  const { hideSidebar } = display

  return (
    <div>
      { !bare ?
        <>
          <Navbar title={title} />
          <div id="under-nav">
            <main id="main" style={hideSidebar ? { width: "100%" } : {}}>
              {children}
            </main>
            <Sidebar title={sidebarTitle} description={description} />
          </div>
        </> :
        <main id="page-main" style={{ width: "100vw", height: "100vh" }}>
          {children}
        </main>
      }
    </div>
  )
}
