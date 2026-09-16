const locations = [
  {
    id: 1,
    name: 'Main Office',
    description: 'Primary office network',
    deviceCount: 1,
  },
  {
    id: 2,
    name: 'First Floor',
    description: 'First floor network equipment',
    deviceCount: 1,
  },
  {
    id: 3,
    name: 'Second Floor',
    description: 'Second floor network equipment',
    deviceCount: 1,
  },
  {
    id: 4,
    name: 'Meeting Room',
    description: 'Meeting room network equipment',
    deviceCount: 1,
  },
  {
    id: 5,
    name: 'Server Room',
    description: 'Server room network equipment',
    deviceCount: 1,
  },
]

function Locations() {
  return (
    <main className="main-content">
      <section className="welcome">
        <div>
          <p className="eyebrow">NETWORK DEVICE INVENTORY</p>

          <h1>Locations</h1>

          <p className="description">
            View network devices organized by physical location.
          </p>
        </div>
      </section>

      <section className="location-grid">
        {locations.map((location) => (
          <div className="location-card" key={location.id}>
            <h2>{location.name}</h2>

            <p>{location.description}</p>

            <span>
              {location.deviceCount} device
              {location.deviceCount !== 1 ? 's' : ''}
            </span>
          </div>
        ))}
      </section>
    </main>
  )
}

export default Locations