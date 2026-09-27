import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')

    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="logo">
        NetInventory
      </div>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/devices">Devices</Link>
        <Link to="/locations">Locations</Link>

        <button onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  )
}

export default Navbar