interface ListItemProps {
  text: string
  crossed: boolean
  toggleCrossed: () => void
}

export function ListItem({ text, crossed, toggleCrossed }: ListItemProps) {
  return (
    <li onClick={toggleCrossed} style={{ textDecoration: crossed ? "line-through" : "" }}>{text}</li>
  )
}
