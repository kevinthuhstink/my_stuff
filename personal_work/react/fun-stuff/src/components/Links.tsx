import { Link } from 'react-router-dom'

export type LinksProps = {
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
        <Link to="/todolist-1"><li style={style.itemStyle}>Static Page</li></Link>
      </ol>
    </>
  )
}
