# Network Device Inventory and Maintenance Management System

A full-stack web application developed for the EC4307 Web Application Development mini project at the University of Ruhuna.

## Project Overview

The Network Device Inventory and Maintenance Management System provides a centralized platform for managing network devices, monitoring their operational status, and tracking maintenance information.

The system supports role-based access control, allowing administrators to manage device records while regular users have read-only access.

## Technologies Used

**Frontend**
- React.js
- Vite
- React Router
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

**Authentication**
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

**Version Control**
- Git and GitHub

## Main Features

- User registration and login
- JWT-based authentication
- Role-based authorization (Admin and User)
- Add, view, edit, and delete network devices
- Search devices by name, IP address, MAC address, and location
- Filter devices by type and operational status
- Dashboard displaying device statistics
- Location-based device counts
- Maintenance tracking with Up to Date, Due Soon, and Overdue indicators
- IPv4 and MAC address validation
- Responsive user interface

## Project Structure

```text
NetworkDeviceInventory/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── createUser.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB Atlas database
- Git

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd NetworkDeviceInventory
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=your_secure_jwt_secret
```

Use your own MongoDB Atlas credentials and keep the `.env` file private.

### 3. Start the Backend

```bash
npm start
```

The backend runs at:

`http://localhost:5000`

### 4. Configure the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

## User Roles

### Administrator

Administrators can:
- View network devices
- Add new devices
- Edit existing devices
- Delete devices
- View dashboard statistics and maintenance information

### Regular User

Regular users can:
- View network devices
- Search and filter devices
- View dashboard statistics
- View locations and maintenance information

Regular users cannot add, edit, or delete device records.

## REST API Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/devices` | Retrieve all devices | Authenticated |
| GET | `/api/devices/maintenance` | Retrieve maintenance information | Authenticated |
| GET | `/api/devices/:id` | Retrieve a single device | Authenticated |
| POST | `/api/devices` | Create a device | Admin |
| PUT | `/api/devices/:id` | Update a device | Admin |
| DELETE | `/api/devices/:id` | Delete a device | Admin |

## Database Design

The application uses MongoDB Atlas with two main collections.

**Users**
- username
- password (hashed)
- role
- createdAt
- updatedAt

**Devices**
- deviceName
- deviceType
- ipAddress
- macAddress
- location
- status
- lastMaintenance
- createdAt
- updatedAt

MongoDB automatically generates a unique `_id` for each document.

## Maintenance Status

Maintenance status is calculated using the number of days since the device's last maintenance date.

| Days Since Maintenance | Status |
|---|---|
| Less than 180 days | Up to Date |
| 180 to less than 365 days | Due Soon |
| 365 days or more | Overdue |

## Validation and Error Handling

The application implements frontend and backend validation.

- Required device fields
- IPv4 address validation
- MAC address validation
- Device status restrictions
- Mongoose schema validation
- HTTP error responses
- Protected API routes using JWT authentication

## Future Improvements

Potential future enhancements include:

- Maintenance scheduling and notifications
- Device sorting
- Device history and audit logs
- Exporting inventory reports
- Advanced dashboard analytics

## Academic Information

**Module:** EC4307 Web Application Development  
**Institution:** Faculty of Engineering, University of Ruhuna  
**Project Type:** Individual Mini Project
