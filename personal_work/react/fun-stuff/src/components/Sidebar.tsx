import { Divider } from "./Divider"
import "./styles/Sidebar.scss"

export type SidebarProps = {
  title?: string,
  description: string,
  hide?: boolean
}

export function Sidebar({ hide=false, title, description }: SidebarProps) {
  if (hide)
    return (
      <Divider hide={true} />
    )

  return (
    <>
      <Divider />
      <section id="sidebar">
        <h1 id="sidebar-title">{title}</h1>
        <p id="sidebar-description">{description}</p>
      </section>
    </>
  )
}
