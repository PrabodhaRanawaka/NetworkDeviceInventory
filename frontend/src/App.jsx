import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Devices from './pages/Devices'
import Locations from './pages/Locations'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register'
import './App.css'

function App() {
  const location = useLocation()

  return (
    <div className="app">
      {!['/login', '/register'].includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/devices"
          element={
            <ProtectedRoute>
              <Devices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/locations"
          element={
            <ProtectedRoute>
              <Locations />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App