from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase client
supabase: Client = None

def get_supabase_client():
    global supabase
    if supabase is None:
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_KEY")
        
        if not supabase_url or not supabase_key:
            raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in environment variables")
        
        supabase = create_client(supabase_url, supabase_key)
    return supabase

app = FastAPI(title="HRMS Lite API", version="1.0.0")

# Initialize Supabase client on startup
@app.on_event("startup")
async def startup_event():
    get_supabase_client()

# CORS configuration
origins = [
    "http://localhost:3001",
    "http://localhost:5173",
    os.getenv("FRONTEND_URL", "http://localhost:3001"),
]

# Add wildcard only for development
if os.getenv("ENVIRONMENT", "development") == "development":
    origins.append("*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
class Employee(BaseModel):
    employee_id: str = Field(..., min_length=1, max_length=50)
    full_name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    department: str = Field(..., min_length=1, max_length=100)

class EmployeeResponse(Employee):
    id: int
    created_at: Optional[str] = None

class AttendanceRecord(BaseModel):
    employee_id: str = Field(..., min_length=1)
    date: date
    status: str = Field(..., pattern="^(Present|Absent)$")

class AttendanceResponse(AttendanceRecord):
    id: int
    created_at: Optional[str] = None

class AttendanceWithEmployee(AttendanceResponse):
    full_name: Optional[str] = None
    department: Optional[str] = None

# Root endpoint
@app.get("/")
async def root():
    return {"message": "HRMS Lite API", "version": "1.0.0", "status": "connected"}

# Employee Endpoints
@app.post("/api/employees", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
async def create_employee(employee: Employee):
    try:
        supabase = get_supabase_client()
        
        # Check if employee_id already exists
        existing = supabase.table("employees").select("employee_id").eq("employee_id", employee.employee_id).execute()
        if existing.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Employee ID already exists"
            )
        
        # Check if email already exists
        existing_email = supabase.table("employees").select("email").eq("email", employee.email).execute()
        if existing_email.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already exists"
            )
        
        # Insert new employee
        response = supabase.table("employees").insert({
            "employee_id": employee.employee_id,
            "full_name": employee.full_name,
            "email": employee.email,
            "department": employee.department
        }).execute()
        
        if response.data:
            return response.data[0]
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create employee"
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )

@app.get("/api/employees", response_model=List[EmployeeResponse])
async def get_employees():
    try:
        supabase = get_supabase_client()
        response = supabase.table("employees").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )

@app.delete("/api/employees/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_employee(employee_id: str):
    try:
        supabase = get_supabase_client()
        
        # Check if employee exists
        existing = supabase.table("employees").select("employee_id").eq("employee_id", employee_id).execute()
        if not existing.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found"
            )
        
        # Delete employee
        supabase.table("employees").delete().eq("employee_id", employee_id).execute()
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )

# Attendance Endpoints
@app.post("/api/attendance", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
async def mark_attendance(attendance: AttendanceRecord):
    try:
        supabase = get_supabase_client()
        
        # Check if employee exists
        employee = supabase.table("employees").select("employee_id").eq("employee_id", attendance.employee_id).execute()
        if not employee.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found"
            )
        
        # Check if attendance already exists for this date
        existing = supabase.table("attendance").select("*").eq("employee_id", attendance.employee_id).eq("date", str(attendance.date)).execute()
        if existing.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Attendance already marked for this employee on this date"
            )
        
        # Insert attendance record
        response = supabase.table("attendance").insert({
            "employee_id": attendance.employee_id,
            "date": str(attendance.date),
            "status": attendance.status
        }).execute()
        
        if response.data:
            return response.data[0]
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to mark attendance"
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )

@app.get("/api/attendance", response_model=List[AttendanceWithEmployee])
async def get_attendance(employee_id: Optional[str] = None, start_date: Optional[date] = None, end_date: Optional[date] = None):
    try:
        supabase = get_supabase_client()
        
        # Build query with joins
        query = supabase.table("attendance").select(
            "id, employee_id, date, status, created_at, employees(full_name, department)"
        )
        
        # Apply filters
        if employee_id:
            query = query.eq("employee_id", employee_id)
        
        if start_date:
            query = query.gte("date", str(start_date))
        
        if end_date:
            query = query.lte("date", str(end_date))
        
        # Order by date descending
        response = query.order("date", desc=True).execute()
        
        # Transform data to flatten employee info
        result = []
        for record in response.data:
            employee_data = record.pop("employees", {})
            record["full_name"] = employee_data.get("full_name") if employee_data else None
            record["department"] = employee_data.get("department") if employee_data else None
            result.append(record)
        
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )

@app.get("/api/attendance/stats/{employee_id}")
async def get_attendance_stats(employee_id: str):
    try:
        supabase = get_supabase_client()
        
        # Check if employee exists
        employee = supabase.table("employees").select("employee_id, full_name").eq("employee_id", employee_id).execute()
        if not employee.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found"
            )
        
        # Get all attendance records for this employee
        attendance = supabase.table("attendance").select("status").eq("employee_id", employee_id).execute()
        
        total_days = len(attendance.data)
        present_days = sum(1 for record in attendance.data if record["status"] == "Present")
        absent_days = sum(1 for record in attendance.data if record["status"] == "Absent")
        
        return {
            "employee_id": employee_id,
            "full_name": employee.data[0]["full_name"],
            "total_days": total_days,
            "present_days": present_days,
            "absent_days": absent_days
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )

@app.get("/api/dashboard")
async def get_dashboard():
    try:
        supabase = get_supabase_client()
        
        # Get total employees
        employees = supabase.table("employees").select("id", count="exact").execute()
        total_employees = employees.count
        
        # Get total attendance records
        all_attendance = supabase.table("attendance").select("id", count="exact").execute()
        total_records = all_attendance.count
        
        # Get today's date
        today = date.today().isoformat()
        
        # Get today's present count
        present_today_data = supabase.table("attendance").select("id").eq("date", today).eq("status", "Present").execute()
        present_today = len(present_today_data.data)
        
        # Get today's absent count
        absent_today_data = supabase.table("attendance").select("id").eq("date", today).eq("status", "Absent").execute()
        absent_today = len(absent_today_data.data)
        
        return {
            "total_employees": total_employees,
            "total_attendance_records": total_records,
            "present_today": present_today,
            "absent_today": absent_today
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )
