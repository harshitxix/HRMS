-- HRMS Lite Database Schema
-- PostgreSQL / Supabase

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS employees CASCADE;

-- Create employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create attendance table
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Present', 'Absent')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    UNIQUE(employee_id, date)
);

-- Create indexes for better query performance
CREATE INDEX idx_employees_employee_id ON employees(employee_id);
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_attendance_employee_id ON attendance(employee_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_status ON attendance(status);

-- Add comments for documentation
COMMENT ON TABLE employees IS 'Stores employee information';
COMMENT ON TABLE attendance IS 'Stores daily attendance records for employees';

COMMENT ON COLUMN employees.employee_id IS 'Unique identifier for employee (e.g., EMP001)';
COMMENT ON COLUMN employees.full_name IS 'Full name of the employee';
COMMENT ON COLUMN employees.email IS 'Email address of the employee (must be unique)';
COMMENT ON COLUMN employees.department IS 'Department where employee works';

COMMENT ON COLUMN attendance.employee_id IS 'Reference to employee';
COMMENT ON COLUMN attendance.date IS 'Date of attendance';
COMMENT ON COLUMN attendance.status IS 'Attendance status: Present or Absent';
