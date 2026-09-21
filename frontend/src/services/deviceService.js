const API_URL = "http://localhost:5000/api/devices";

const mapDevice = (device) => ({
    id: device._id,
    name: device.deviceName,
    type: device.deviceType,
    ipAddress: device.ipAddress,
    location: device.location,
    status: device.status,
});

export const getDevices = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch devices");
    }

    const data = await response.json();

    return data.map(mapDevice);
};

export const createDevice = async (deviceData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(deviceData)
    });

    if (!response.ok) {
        throw new Error("Failed to create device");
    }

    const data = await response.json();

    return mapDevice(data);
};

export const updateDevice = async (id, deviceData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(deviceData)
    });

    if (!response.ok) {
        throw new Error("Failed to update device");
    }

    const data = await response.json();

    return mapDevice(data);
};

export const deleteDevice = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete device");
    }

    return response.json();
};