import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        NetInventory
      </div>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/devices">Devices</Link>
        <Link to="/locations">Locations</Link>
      </nav>
    </header>
  )
}

export default Navbar