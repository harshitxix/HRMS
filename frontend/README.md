# HRMS Lite Frontend

React + Vite frontend for HRMS Lite application.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS (custom styling)

## Setup Instructions

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Copy .env.example to .env
cp .env.example .env

# Update VITE_API_URL if needed (default: http://localhost:8000)
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Features

### Dashboard
- Overview statistics (total employees, attendance records, today's present/absent)
- Quick action buttons

### Employee Management
- Add new employees with validation
- View all employees in a table
- Delete employees
- Form validation for all fields
- Duplicate employee ID and email handling

### Attendance Management
- Mark attendance with employee selection, date, and status
- View attendance records with employee details
- Filter by employee, date range
- Visual status badges (Present/Absent)
- Prevents duplicate attendance for same employee on same date

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Employees.jsx
│   │   └── Attendance.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## UI/UX Features

- Professional and clean design
- Responsive layout
- Loading states with spinners
- Empty states with helpful messages
- Success/error notifications
- Form validation with error messages
- Confirmation dialogs for delete actions
- Consistent color scheme and typography
