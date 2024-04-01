type NavbarDropdownProps = {
  active: boolean;
  colors: object;
}

export function NavbarDropdown(props: NavbarDropdownProps) {
  return (
    <div className={props.active ? "dropdown active" : "dropdown"} style={props.colors}>
      <h1 className="dropdown--title">Projects:</h1>
      <ol className="dropdown--select">
        <p>Hello Everyone!</p>
        <li>CSS Review</li>
        <li>Reusable Components</li>
        <li>Interactive Components</li>
        <li>Game of Life</li>
        <li>Notes App</li>
      </ol>
    </div>
  )
}
