# HRMS Lite Backend

FastAPI backend for HRMS Lite application with PostgreSQL database.

## Tech Stack

- **Framework**: FastAPI
- **Database**: Supabase (PostgreSQL)
- **Client**: Supabase Python Client
- **Validation**: Pydantic

## Setup Instructions

### Prerequisites

- Python 3.9+
- Supabase Account (Free tier works perfectly)

### Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up Supabase Database:
- Go to https://app.supabase.com
- Run the SQL from `../database/schema.sql` in SQL Editor
- Optionally run `../database/sample_data.sql` for test data

5. Configure environment variables:
```bash
# Copy .env.example to .env (or use existing .env)
# Already configured with Supabase credentials

# .env should contain:
SUPABASE_URL=https://slqpepsomjelcjoemfck.supabase.co
SUPABASE_KEY=your_anon_key_here
```

### Running the Server

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:

## Features

- ✅ Works with Supabase Free Tier (no direct PostgreSQL connection needed)
- ✅ RESTful API with automatic OpenAPI docs
- ✅ Supabase client for database operations
- ✅ Foreign key relationships with CASCADE delete
- ✅ Email validation with Pydantic
- ✅ Proper HTTP status codes and error handling
- ✅ CORS enabled for frontend integration8000`

API Documentation: `http://localhost:8000/docs`

## API Endpoints

### Employees
- `POST /api/employees` - Create new employee
- `GET /api/employees` - Get all employees
- `Environment Variables

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anon/public key
- `PORT` - Server port (default: 8000)

## Why Supabase Client?

The free tier of Supabase doesn't allow direct PostgreSQL connections (IPv4/connection pooling). 
Using the Supabase Python client:
- ✅ Works perfectly with free tier
- ✅ Built-in connection pooling
- ✅ Automatic request handling
- ✅ No need to manage database credentials
- ✅ Easy to deployloyees/{employee_id}` - Delete employee

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance` - Get attendance records (with optional filters)
- `GET /api/attendance/stats/{employee_id}` - Get attendance statistics

### Dashboard
- `GET /api/dashboard` - Get dashboard summary

## Database Schema

### Employees Table
- id (SERIAL PRIMARY KEY)
- employee_id (VARCHAR, UNIQUE)
- full_name (VARCHAR)
- email (VARCHAR, UNIQUE)
- department (VARCHAR)
- created_at (TIMESTAMP)

### Attendance Table
- id (SERIAL PRIMARY KEY)
- employee_id (VARCHAR, FOREIGN KEY)
- date (DATE)
- status (VARCHAR: Present/Absent)
- created_at (TIMESTAMP)
- UNIQUE constraint on (employee_id, date)
