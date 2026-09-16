function DeviceTable({ devices, onEdit, onDelete }) {
  return (
    <div className="device-table">
      <div className="table-header">
        <span>Device Name</span>
        <span>Type</span>
        <span>IP Address</span>
        <span>Location</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {devices.length === 0 ? (
        <div className="empty-message">
          No devices found.
        </div>
      ) : (
        devices.map((device) => (
          <div className="device-row" key={device.id}>
            <span>{device.name}</span>
            <span>{device.type}</span>
            <span>{device.ipAddress}</span>
            <span>{device.location}</span>

            <span className={`status ${device.status.toLowerCase()}`}>
              {device.status}
            </span>

            <span className="device-actions">
              <button
                className="edit-button"
                onClick={() => onEdit(device)}
              >
                Edit
              </button>

              <button
                className="delete-button"
                onClick={() => onDelete(device.id)}
              >
                Delete
              </button>
            </span>
          </div>
        ))
      )}
    </div>
  )
}

export default DeviceTable