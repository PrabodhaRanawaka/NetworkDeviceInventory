import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import DeviceTable from '../components/DeviceTable'
import {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice
} from "../services/deviceService";

function Devices() {
  const location = useLocation()
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [showForm, setShowForm] = useState(false)
  const [editingDevice, setEditingDevice] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    type: 'Router',
    ipAddress: '',
    macAddress: '',
    location: '',
    status: 'Active',
    lastMaintenance: '',
})

  useEffect(() => {
  if (location.state?.openAddForm) {
    setShowForm(true)
  }
}, [location.state])

useEffect(() => {
  const loadDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (error) {
      console.error("Failed to load devices:", error);
      setError("Unable to load devices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  loadDevices();
}, []);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      device.ipAddress.toLowerCase().includes(search.toLowerCase()) ||
      device.macAddress.toLowerCase().includes(search.toLowerCase()) ||
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

async function handleSaveDevice(event) {
  event.preventDefault()

  const macAddressPattern =
   /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/

  if (!macAddressPattern.test(formData.macAddress)) {
    alert('Please enter a valid MAC address.')
    return
  }

  const ipAddressPattern =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/

  if (!ipAddressPattern.test(formData.ipAddress)) {
    alert('Please enter a valid IPv4 address.')
    return
  }

  if (editingDevice) {
  try {
    const deviceData = {
      deviceName: formData.name,
      deviceType: formData.type,
      ipAddress: formData.ipAddress,
      macAddress: formData.macAddress,
      location: formData.location,
      status: formData.status,
      lastMaintenance: formData.lastMaintenance,
    }

    const updatedDevice = await updateDevice(
      editingDevice.id,
      deviceData
    )

    setDevices(
      devices.map((device) =>
        device.id === editingDevice.id
          ? updatedDevice
          : device
      )
    )

    setSuccessMessage('Device updated successfully.')
    setTimeout(() => {
  setSuccessMessage('')
}, 3000)

    resetForm()
    return
  } catch (error) {
    console.error("Failed to update device:", error)
    return
  }
}

  try {
    const deviceData = {
      deviceName: formData.name,
      deviceType: formData.type,
      ipAddress: formData.ipAddress,
      macAddress: formData.macAddress,
      location: formData.location,
      status: formData.status,
      lastMaintenance: formData.lastMaintenance,
    }

    const newDevice = await createDevice(deviceData)

    setDevices([...devices, newDevice])

    setSuccessMessage('Device added successfully.')
    setTimeout(() => {
  setSuccessMessage('')
}, 3000)

    resetForm()
  } catch (error) {
    console.error("Failed to create device:", error)
  }
}

function handleEditDevice(device) {
  setEditingDevice(device)

  setFormData({
  name: device.name,
  type: device.type,
  ipAddress: device.ipAddress,
  macAddress: device.macAddress || '',
  location: device.location,
  status: device.status,
  lastMaintenance: device.lastMaintenance
    ? device.lastMaintenance.split('T')[0]
    : '',
})

  setShowForm(true)
}

async function handleDeleteDevice(id) {
  const confirmed = window.confirm(
    'Are you sure you want to delete this device?'
  )

  if (!confirmed) {
    return
  }

  try {
    await deleteDevice(id)

    setDevices(
      devices.filter((device) => device.id !== id)
    )

    setSuccessMessage('Device deleted successfully.')
    setTimeout(() => {
  setSuccessMessage('')
}, 3000)

  } catch (error) {
    console.error("Failed to delete device:", error)
  }
}

function resetForm() {
  setFormData({
  name: '',
  type: 'Router',
  ipAddress: '',
  macAddress: '',
  location: '',
  status: 'Active',
  lastMaintenance: '',
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
  <label htmlFor="macAddress">MAC Address</label>
  <input
    id="macAddress"
    name="macAddress"
    type="text"
    placeholder="e.g. AA:BB:CC:DD:EE:FF"
    value={formData.macAddress}
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
  <label htmlFor="lastMaintenance">Last Maintenance</label>
  <input
    id="lastMaintenance"
    name="lastMaintenance"
    type="date"
    value={formData.lastMaintenance}
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
                <option value="Maintenance">Maintenance</option>
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
            placeholder="Search by name, IP address, MAC address or location..."
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
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

{successMessage && (
  <div className="success-message">
    {successMessage}
  </div>
)}

        {loading ? (
  <div className="empty-message">
    Loading devices...
  </div>
) : error ? (
  <div className="empty-message">
    {error}
  </div>
) : (
  <DeviceTable
    devices={filteredDevices}
    onEdit={handleEditDevice}
    onDelete={handleDeleteDevice}
  />
)}
      </section>
    </main>
  )
}

export default Devices