import { BrowserRouter as Router } from 'react-router-dom'
import { Providers } from "./contexts/Providers"
import { AppRoutes } from "./Routes"

export function App() {
  return (
    <Providers>
      <Router>
          <AppRoutes />
      </Router>
    </Providers>
  )
}
