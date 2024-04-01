import { Navbar } from '@/components/Navbar'

export type PageLayoutProps = {
  bare?: boolean,
  title?: string,
  children?: React.ReactNode;
}

export function PageLayout({ bare = false, title, children }: PageLayoutProps) {
  return (
    <div>
      { !bare ?
        <>
          <Navbar title={title} />
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
