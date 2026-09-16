import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DeviceTable from '../components/DeviceTable'

const initialDevices = [
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
  {
    id: 5,
    name: 'Switch-Floor-02',
    type: 'Switch',
    ipAddress: '192.168.1.20',
    location: 'Second Floor',
    status: 'Active',
  },
  {
    id: 6,
    name: 'AP-Lobby',
    type: 'Access Point',
    ipAddress: '192.168.1.30',
    location: 'Lobby',
    status: 'Active',
  },
]

function Devices() {
  const location = useLocation()
  const [devices, setDevices] = useState(initialDevices)

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [showForm, setShowForm] = useState(false)
  const [editingDevice, setEditingDevice] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    type: 'Router',
    ipAddress: '',
    location: '',
    status: 'Active',
  })

  useEffect(() => {
  if (location.state?.openAddForm) {
    setShowForm(true)
  }
}, [location.state])

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      device.ipAddress.toLowerCase().includes(search.toLowerCase()) ||
      device.location.toLowerCase().includes(search.toLowerCase())

    const matchesType =
      typeFilter === 'All' || device.type === typeFilter

    const matchesStatus =
      statusFilter === 'All' || device.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSaveDevice(event) {
  event.preventDefault()

  if (editingDevice) {
    const updatedDevices = devices.map((device) =>
      device.id === editingDevice.id
        ? {
            ...device,
            name: formData.name,
            type: formData.type,
            ipAddress: formData.ipAddress,
            location: formData.location,
            status: formData.status,
          }
        : device
    )

    setDevices(updatedDevices)
  } else {
    const newDevice = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      ipAddress: formData.ipAddress,
      location: formData.location,
      status: formData.status,
    }

    setDevices([...devices, newDevice])
  }

  resetForm()
}

function handleEditDevice(device) {
  setEditingDevice(device)

  setFormData({
    name: device.name,
    type: device.type,
    ipAddress: device.ipAddress,
    location: device.location,
    status: device.status,
  })

  setShowForm(true)
}

function handleDeleteDevice(id) {
  const confirmed = window.confirm(
    'Are you sure you want to delete this device?'
  )

  if (!confirmed) {
    return
  }

  setDevices(
    devices.filter((device) => device.id !== id)
  )
}

function resetForm() {
  setFormData({
    name: '',
    type: 'Router',
    ipAddress: '',
    location: '',
    status: 'Active',
  })

  setEditingDevice(null)
  setShowForm(false)
}

  return (
    <main className="main-content">
      <section className="welcome">
        <div>
          <p className="eyebrow">NETWORK DEVICE INVENTORY</p>

          <h1>Network Devices</h1>

          <p className="description">
            View and manage all network devices in the inventory.
          </p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Device
        </button>
      </section>

      {showForm && (
        <section className="device-form-section">
          <div className="section-header">
            <div>
              <h2>
  {editingDevice ? 'Edit Device' : 'Add New Device'}
</h2>
              <p>
  {editingDevice
    ? 'Update the details of the network device'
    : 'Enter the details of the network device'}
</p>
            </div>
          </div>

          <form className="device-form" onSubmit={handleSaveDevice}>
            <div className="form-group">
              <label htmlFor="name">Device Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Core-Router-02"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Device Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="Router">Router</option>
                <option value="Switch">Switch</option>
                <option value="Access Point">Access Point</option>
                <option value="Firewall">Firewall</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="ipAddress">IP Address</label>
              <input
                id="ipAddress"
                name="ipAddress"
                type="text"
                placeholder="e.g. 192.168.1.50"
                value={formData.ipAddress}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Server Room"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button type="submit" className="save-button">
                {editingDevice ? 'Update Device' : 'Save Device'}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="devices-section">
        <div className="section-header">
          <div>
            <h2>All Devices</h2>
            <p>
              Showing {filteredDevices.length} of {devices.length} devices
            </p>
          </div>
        </div>

        <div className="device-filters">
          <input
            type="text"
            placeholder="Search by name, IP address or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Router">Router</option>
            <option value="Switch">Switch</option>
            <option value="Access Point">Access Point</option>
            <option value="Firewall">Firewall</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <DeviceTable
  devices={filteredDevices}
  onEdit={handleEditDevice}
  onDelete={handleDeleteDevice}
/>
      </section>
    </main>
  )
}

export default Devices