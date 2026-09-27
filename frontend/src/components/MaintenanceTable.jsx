function MaintenanceTable({ devices }) {
  return (
    <div className="device-table maintenance-table">
      <div className="table-header">
        <span>Device Name</span>
        <span>Location</span>
        <span>Last Maintenance</span>
        <span>Maintenance Status</span>
      </div>

      {devices.length === 0 ? (
        <div className="empty-message">
          No maintenance attention required.
        </div>
      ) : (
        devices.map((device) => (
          <div className="device-row" key={device.id}>
            <span>{device.name}</span>

            <span>{device.location}</span>

            <span>
              {device.lastMaintenance
                ? new Date(device.lastMaintenance).toLocaleDateString()
                : 'Not available'}
            </span>

            <span
              className={`status ${device.maintenanceStatus
                .toLowerCase()
                .replace(' ', '-')}`}
            >
              {device.maintenanceStatus}
            </span>
          </div>
        ))
      )}
    </div>
  )
}

export default MaintenanceTable