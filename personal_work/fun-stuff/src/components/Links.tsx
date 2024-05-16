import { Link } from 'react-router-dom'

interface LinksProps {
  title?: string,
  style: {
    titleStyle?: object,
    listStyle?: object,
    itemStyle?: object,
  }
}

export function Links({ title, style }: LinksProps) {
  return (
    <>
      <h1 style={style.titleStyle}>{title}</h1>
      <ol style={style.listStyle} className="page-links">
        <Link to="/todolist-1"><li style={style.itemStyle}>
            Static Page: Todo List
        </li></Link>
        <Link to="/reusable-components-2"><li style={style.itemStyle}>
            Reusable Components: Spotify
        </li></Link>
      </ol>
    </>
  )
}
