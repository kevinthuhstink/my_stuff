import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Title, TodoList } from './pages'
import { Providers } from "./contexts/Providers"

export function App() {
  return (
    <Providers>
      <Router>
          <Routes>
            <Route path="todolist-1" element={<TodoList />} />
            <Route path="*" element={<Title />} />
          </Routes>
      </Router>
    </Providers>
  )
}
