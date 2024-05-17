import { useContext } from "react"
import { DisplayContext } from "@/contexts"
import { Divider } from "./Divider"
import "./styles/Sidebar.scss"

export type SidebarProps = {
  title?: string,
  description: string,
  hide?: boolean
}

export function Sidebar({ title, description }: SidebarProps) {
  const { display } = useContext(DisplayContext)

  if (display.hideSidebar)
    return (
      <Divider />
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
