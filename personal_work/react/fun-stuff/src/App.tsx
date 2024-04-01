import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Title, TodoList } from './pages'

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="todolist-1" element={<TodoList />} />
          <Route path="*" element={<Title />} />
        </Routes>
    </Router>
  )
}
