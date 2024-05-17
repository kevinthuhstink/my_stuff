import { useRoutes } from 'react-router-dom'
import { Title, TodoList, SpotifyCards } from './pages'

export const routeLayout = [
  {
    path: "todolist-1",
    element: <TodoList />
  },
  {
    path: "reusable-components-2",
    element: <SpotifyCards />
  },
  {
    path: "*",
    element: <Title />
  }
]

export function AppRoutes() {
  return (
    <>{useRoutes(routeLayout)}</>
  )
}
