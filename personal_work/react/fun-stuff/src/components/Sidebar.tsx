import "./styles/Sidebar.scss"

export type SidebarProps = {
  description?: string,
}

export function Sidebar({ description }: SidebarProps) {
  return (
    <section id="sidebar">
      {description}
    </section>
  )
}
