import { Navbar } from '@/components/Navbar'

export type PageLayoutProps = {
  bare: boolean,
  title?: string,
  children?: React.ReactNode;
}

export function PageLayout({ bare = false, title, children }: PageLayoutProps) {
  return (
    <div id="base">
      { !bare &&
        <>
          <Navbar title={title} />
        </>
      }
      {children}
    </div>
  )
}
