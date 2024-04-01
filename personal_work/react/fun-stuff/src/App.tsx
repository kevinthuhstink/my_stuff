import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Title } from './pages/Title'

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="*" element={<Title />} />
        </Routes>
    </Router>
  )
}
