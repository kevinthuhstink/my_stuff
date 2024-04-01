import { Navbar } from '../components/Navbar'

export type PageLayoutProps = {
  bare: boolean,
  children?: React.ReactNode;
}

export function PageLayout({ bare = false, children }: PageLayoutProps) {
  return (
    <div id="base">
      { !bare &&
        <>
          <Navbar />
        </>
      }
      {children}
    </div>
  )
}
