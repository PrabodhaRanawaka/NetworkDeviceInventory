import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import DeviceTable from '../components/DeviceTable'
import { getDevices } from '../services/deviceService'

function Dashboard() {
  const [devices, setDevices] = useState([])

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const data = await getDevices()
        setDevices(data)
      } catch (error) {
        console.error('Failed to load dashboard devices:', error)
      }
    }

    loadDevices()
  }, [])

  const totalDevices = devices.length

  const activeDevices = devices.filter(
    (device) => device.status === 'Active'
  ).length

  const inactiveDevices = devices.filter(
    (device) => device.status === 'Inactive'
  ).length

  const locations = new Set(
    devices.map((device) => device.location)
  ).size

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
        <StatCard title="Total Devices" value={totalDevices} />
        <StatCard title="Active Devices" value={activeDevices} />
        <StatCard title="Inactive Devices" value={inactiveDevices} />
        <StatCard title="Locations" value={locations} />
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