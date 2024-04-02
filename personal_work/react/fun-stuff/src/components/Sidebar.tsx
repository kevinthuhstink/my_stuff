import "./styles/Sidebar.scss"

export type SidebarProps = {
  title?: string,
  description: string,
}

export function Sidebar({ title, description }: SidebarProps) {
  return (
    <section id="sidebar">
      <h1 id="sidebar-title">{title}</h1>
      <p id="sidebar-description">{description}</p>
    </section>
  )
}
