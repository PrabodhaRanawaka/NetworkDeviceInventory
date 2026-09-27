import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import DeviceTable from '../components/DeviceTable'
import MaintenanceTable from '../components/MaintenanceTable'
import {
  getDevices,
  getMaintenanceDevices
} from '../services/deviceService'

function Dashboard() {
  const [devices, setDevices] = useState([])
  const [maintenanceDevices, setMaintenanceDevices] = useState([])

  useEffect(() => {
  const loadDashboardData = async () => {
    try {
      const [deviceData, maintenanceData] = await Promise.all([
        getDevices(),
        getMaintenanceDevices()
      ])

      setDevices(deviceData)
      setMaintenanceDevices(maintenanceData)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    }
  }

  loadDashboardData()
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

  const maintenanceDue = maintenanceDevices.filter(
  (device) =>
    device.maintenanceStatus === 'Due Soon' ||
    device.maintenanceStatus === 'Overdue'
).length

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
        <StatCard title="Maintenance Due" value={maintenanceDue} />
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

      <section className="devices-section">
  <div className="section-header">
    <div>
      <h2>Maintenance Overview</h2>
      <p>Devices requiring maintenance attention</p>
    </div>
  </div>

  <MaintenanceTable
  devices={maintenanceDevices.filter(
    (device) =>
      device.maintenanceStatus === 'Due Soon' ||
      device.maintenanceStatus === 'Overdue'
  )}
/>
</section>
    </main>
  )
}

export default Dashboard