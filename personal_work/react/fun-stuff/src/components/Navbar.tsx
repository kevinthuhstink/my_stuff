import { useState } from 'react'
import { data } from '@/lib/data'
import './Navbar.scss'

export type NavbarProps = {
  title?: string,
}

export function Navbar({ title }: NavbarProps) {
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
        {title}
      </section>
    </nav>
  )
}
