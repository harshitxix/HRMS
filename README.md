# HRMS Lite - Human Resource Management System

A lightweight, full-stack HRMS application for managing employees and tracking daily attendance.

## 🚀 Live Demo

### Quick Deploy (15 minutes)
Follow our comprehensive guides:
- **[📚 DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[⚡ QUICKSTART.md](./QUICKSTART.md)** - Quick start guide

### Recommended Platforms
- **Frontend**: Vercel or Netlify (Free tier available)
- **Backend**: Railway or Render (Free tier available)
- **Database**: Supabase (Free tier available)

### Deployment Status
- **Frontend**: [To be deployed]
- **Backend API**: [To be deployed]
- **API Documentation**: [To be deployed]/docs

---

## 📋 Features

### Employee Management
- Add new employees with unique Employee ID
- View all employees in a structured table
- Delete employee records
- Validation for required fields and email format
- Duplicate detection for Employee ID and email

### Attendance Management
- Mark daily attendance (Present/Absent)
- View attendance records with employee details
- Filter records by employee and date range
- Prevent duplicate attendance entries
- Display attendance statistics

### Dashboard
- Quick overview of system statistics
- Total employees count
- Total attendance records
- Today's present/absent count

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Custom CSS

### Backend
- **Framework**: FastAPI
- **Database Driver**: asyncpg (async PostgreSQL)
- **Validation**: Pydantic
- **CORS**: FastAPI CORS Middleware

### Database
- **Database**: PostgreSQL 12+
- **Schema**: 
  - `employees` table (id, employee_id, full_name, email, department, created_at)
  - `attendance` table (id, employee_id, date, status, created_at)

## 📦 Project Structure

```
HRMS/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment variables template
│   └── README.md            # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── services/        # API integration
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json         # Node dependencies
│   ├── vite.config.js       # Vite configuration
│   └── README.md            # Frontend documentation
└── README.md                # This file
```

## 🚦 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+
- PostgreSQL 12+

### Backend Setup

#### Option A: Using Supabase (Recommended)

1. **Setup Supabase Database**
   - Follow the detailed guide in [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
   - Run `database/schema.sql` in Supabase SQL Editor
   - Optionally run `database/sample_data.sql` for test data

2. **Configure Backend**
   ```bash
   cd backend
   copy .env.example .env
   # Edit .env and add your Supabase DATABASE_URL
   ```

3. **Install Dependencies**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   ```

4. **Run Server**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

#### Option B: Using Local PostgreSQL

1. Create database:
   ```sql
   CREATE DATABASE hrms_db;
   ```

2. Run schema:
   ```bash
   psql -U postgres -d hrms_db -f database/schema.sql
   psql -U postgres -d hrms_db -f database/sample_data.sql
   ```

3. Configure and run (same as Option A steps 2-4)

Backend will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Update VITE_API_URL if needed
```

4. Run development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## 🌐 API Endpoints

### Employees
- `POST /api/employees` - Create employee
- `GET /api/employees` - Get all employees
- `DELETE /api/employees/{employee_id}` - Delete employee

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance` - Get attendance records (supports filters)
- `GET /api/attendance/stats/{employee_id}` - Get employee attendance stats

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## 🎨 UI Features

- Professional, production-ready design
- Responsive layout for all screen sizes
- Loading states with spinners
- Empty states with helpful messages
- Success/error notifications
- Form validation with inline errors
- Confirmation dialogs for destructive actions
- Consistent color scheme and typography
- Accessible navigation

## ⚙️ Deployment

### Backend Deployment (Render/Railway)

1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable: `DATABASE_URL`

### Frontend Deployment (Vercel/Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL` (your backend URL)

## 📝 Assumptions & Limitations

- Single admin user (no authentication)
- No role-based access control
- No payroll or leave management
- Attendance can be marked for past dates (not future dates)
- One attendance record per employee per day
- Basic validation (no advanced business rules)

## 🎯 Bonus Features Implemented

✅ Filter attendance records by date range
✅ Display total present days per employee (via API)
✅ Dashboard with summary statistics
✅ Professional UI with loading and empty states

## 🔒 Security Notes

- Email validation using Pydantic
- SQL injection prevention via parameterized queries
- CORS configuration with environment-based origins
- Input validation on both frontend and backend
- Error handling with appropriate HTTP status codes
- Environment variables for sensitive data
- HTTPS enforced in production

## 🚀 Deployment

### Quick Deploy Scripts

**Windows:**
```powershell
# Check deployment readiness
.\deploy-check.ps1

# Build for production
.\build.ps1
```

**Mac/Linux:**
```bash
# Build for production
chmod +x build.sh
./build.sh
```

### Platform Guides

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed instructions on:
- 🚂 Railway deployment
- 🎨 Vercel deployment
- 🌐 Render deployment
- 📦 Netlify deployment
- ⚙️ Environment configuration
- 🐛 Troubleshooting

### Cost Estimate
- **Development**: 100% Free
- **Production (Free tier)**: $0/month
  - Railway: 500 hours/month
  - Vercel: 100GB bandwidth/month
  - Supabase: 500MB storage

---

## 📄 License

This project is for educational purposes.

## 👤 Author

[Your Name]

## 🤝 Contributing

This is an assignment project. Not open for contributions.
