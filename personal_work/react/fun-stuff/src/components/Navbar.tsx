import './Navbar.scss'

export type NavbarProps = {
  title?: string,
}

export function Navbar({ title }: NavbarProps) {
  return (
    <nav>
      {title}
    </nav>
  )
}
