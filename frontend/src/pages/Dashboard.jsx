import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import DeviceTable from '../components/DeviceTable'

const devices = [
  {
    id: 1,
    name: 'Core-Router-01',
    type: 'Router',
    ipAddress: '192.168.1.1',
    location: 'Main Office',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Switch-Floor-01',
    type: 'Switch',
    ipAddress: '192.168.1.10',
    location: 'First Floor',
    status: 'Active',
  },
  {
    id: 3,
    name: 'AP-Meeting-Room',
    type: 'Access Point',
    ipAddress: '192.168.1.25',
    location: 'Meeting Room',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Old-Router-02',
    type: 'Router',
    ipAddress: '192.168.1.2',
    location: 'Server Room',
    status: 'Inactive',
  },
]

function Dashboard() {
  return (
    <main className="main-content">
      <section className="welcome">
        <div>
          <p className="eyebrow">NETWORK DEVICE INVENTORY</p>

          <h1>Network Dashboard</h1>

          <p className="description">
            Manage and monitor your organization's network devices
            from one place.
          </p>
        </div>

        <Link
  to="/devices"
  state={{ openAddForm: true }}
  className="add-button"
>
  + Add Device
</Link>
      </section>

      <section className="stats">
        <StatCard title="Total Devices" value="24" />
        <StatCard title="Active Devices" value="21" />
        <StatCard title="Inactive Devices" value="3" />
        <StatCard title="Locations" value="5" />
      </section>

      <section className="devices-section">
        <div className="section-header">
          <div>
            <h2>Recent Devices</h2>
            <p>Recently added network equipment</p>
          </div>

          <Link to="/devices" className="view-button">
  View All
</Link>
        </div>

        <DeviceTable devices={devices} />
      </section>
    </main>
  )
}

export default Dashboard