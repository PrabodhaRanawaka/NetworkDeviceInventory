
import { useEffect, useState } from 'react'
import { getDevices } from '../services/deviceService'

function Locations() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchLocations() {
      try {
        const devices = await getDevices()

        const locationMap = {}

        devices.forEach((device) => {
          const locationName = device.location?.trim()

          if (!locationName) return

          if (!locationMap[locationName]) {
            locationMap[locationName] = {
              name: locationName,
              deviceCount: 0,
            }
          }

          locationMap[locationName].deviceCount += 1
        })

        setLocations(Object.values(locationMap))
      } catch (err) {
        setError('Failed to load locations. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

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

      {loading && <p>Loading locations...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && locations.length === 0 && (
        <p>No locations found. Add devices with a location first.</p>
      )}

      {!loading && !error && locations.length > 0 && (
        <section className="location-grid">
          {locations.map((location) => (
            <div className="location-card" key={location.name}>
              <h2>{location.name}</h2>

              <p>Network equipment at this location</p>

              <span>
                {location.deviceCount} device
                {location.deviceCount !== 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}

export default Locations
