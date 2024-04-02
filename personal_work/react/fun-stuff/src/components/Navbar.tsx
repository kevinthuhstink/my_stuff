import { useState } from 'react'
import { data } from '@/lib/data'
import './styles/Navbar.scss'

export type NavbarProps = {
  title?: string,
  description?: string,
}

export function Navbar({ title, description }: NavbarProps) {
  const { icons } = data;
  const [iconNum, setIconNum] = useState(0);

  return (
    <nav>
      <section id="nav-left">
        <img
          id="nav-icon"
          src={icons.stinky[iconNum % 6]}
          onClick={() => setIconNum(iconNum + 1)}
          alt="" />
        <p id="nav-title">
          {title}
        </p>
      </section>
      <section id="nav-right">
        <p id="nav-description">
          {description}
        </p>
      </section>
    </nav>
  )
}
