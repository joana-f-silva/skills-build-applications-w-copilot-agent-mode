import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/activities">
            Octofit Tracker
          </NavLink>
          <nav aria-label="Main navigation" className="navbar-nav flex-row flex-wrap gap-2">
            {navigation.map(({ label, to }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? 'active fw-semibold' : ''}`
                }
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4">
        <Routes>
          <Route element={<Navigate replace to="/activities" />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route
            element={
              <section className="text-center py-5">
                <h1 className="h2">Page not found</h1>
                <p className="text-secondary">Choose a section from the navigation above.</p>
              </section>
            }
            path="*"
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
