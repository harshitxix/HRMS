# HRMS Database Setup

This directory contains SQL files for setting up and populating the HRMS Lite database.

## Files

- `schema.sql` - Database schema (tables, indexes, constraints)
- `sample_data.sql` - Sample data for testing

## Setup Instructions

### Using Supabase

1. **Access Supabase SQL Editor**
   - Go to https://app.supabase.com
   - Select your project
   - Navigate to SQL Editor

2. **Run Schema**
   - Copy contents of `schema.sql`
   - Paste into SQL Editor
   - Click "Run"

3. **Insert Sample Data (Optional)**
   - Copy contents of `sample_data.sql`
   - Paste into SQL Editor
   - Click "Run"

### Using Local PostgreSQL

1. **Create Database**
```bash
psql -U postgres
CREATE DATABASE hrms_db;
\c hrms_db
```

2. **Run Schema**
```bash
psql -U postgres -d hrms_db -f schema.sql
```

3. **Insert Sample Data**
```bash
psql -U postgres -d hrms_db -f sample_data.sql
```

## Database Schema

### Tables

#### employees
- `id` - Serial primary key
- `employee_id` - Unique employee identifier (VARCHAR)
- `full_name` - Employee full name
- `email` - Unique email address
- `department` - Department name
- `created_at` - Timestamp

#### attendance
- `id` - Serial primary key
- `employee_id` - Foreign key to employees
- `date` - Attendance date
- `status` - Present or Absent
- `created_at` - Timestamp

### Constraints
- Unique constraint on `employees.employee_id`
- Unique constraint on `employees.email`
- Unique constraint on `(employee_id, date)` in attendance
- Check constraint on attendance.status (Present/Absent only)
- Foreign key with CASCADE delete

## Sample Data

The sample data includes:
- 10 employees across different departments
- 5 days of attendance records
- Mix of Present/Absent statuses

## Getting Supabase Connection String

1. Go to Project Settings > Database
2. Copy the connection string under "Connection string"
3. Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
4. Replace `[PASSWORD]` with your database password
5. Use this in your backend `.env` file
