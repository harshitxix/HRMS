-- Sample Data for HRMS Lite
-- Insert sample employees

INSERT INTO employees (employee_id, full_name, email, department) VALUES
('EMP001', 'John Doe', 'john.doe@company.com', 'Engineering'),
('EMP002', 'Jane Smith', 'jane.smith@company.com', 'Human Resources'),
('EMP003', 'Michael Johnson', 'michael.johnson@company.com', 'Engineering'),
('EMP004', 'Emily Davis', 'emily.davis@company.com', 'Marketing'),
('EMP005', 'Robert Brown', 'robert.brown@company.com', 'Sales'),
('EMP006', 'Sarah Wilson', 'sarah.wilson@company.com', 'Finance'),
('EMP007', 'David Martinez', 'david.martinez@company.com', 'Engineering'),
('EMP008', 'Lisa Anderson', 'lisa.anderson@company.com', 'Operations'),
('EMP009', 'James Taylor', 'james.taylor@company.com', 'Engineering'),
('EMP010', 'Jennifer Thomas', 'jennifer.thomas@company.com', 'Human Resources');

-- Insert sample attendance records for the past week
-- February 6, 2026 (Today)
INSERT INTO attendance (employee_id, date, status) VALUES
('EMP001', '2026-02-06', 'Present'),
('EMP002', '2026-02-06', 'Present'),
('EMP003', '2026-02-06', 'Absent'),
('EMP004', '2026-02-06', 'Present'),
('EMP005', '2026-02-06', 'Present'),
('EMP006', '2026-02-06', 'Present'),
('EMP007', '2026-02-06', 'Present'),
('EMP008', '2026-02-06', 'Absent'),
('EMP009', '2026-02-06', 'Present'),
('EMP010', '2026-02-06', 'Present');

-- February 5, 2026
INSERT INTO attendance (employee_id, date, status) VALUES
('EMP001', '2026-02-05', 'Present'),
('EMP002', '2026-02-05', 'Present'),
('EMP003', '2026-02-05', 'Present'),
('EMP004', '2026-02-05', 'Absent'),
('EMP005', '2026-02-05', 'Present'),
('EMP006', '2026-02-05', 'Present'),
('EMP007', '2026-02-05', 'Present'),
('EMP008', '2026-02-05', 'Present'),
('EMP009', '2026-02-05', 'Present'),
('EMP010', '2026-02-05', 'Absent');

-- February 4, 2026
INSERT INTO attendance (employee_id, date, status) VALUES
('EMP001', '2026-02-04', 'Present'),
('EMP002', '2026-02-04', 'Present'),
('EMP003', '2026-02-04', 'Present'),
('EMP004', '2026-02-04', 'Present'),
('EMP005', '2026-02-04', 'Absent'),
('EMP006', '2026-02-04', 'Present'),
('EMP007', '2026-02-04', 'Present'),
('EMP008', '2026-02-04', 'Present'),
('EMP009', '2026-02-04', 'Present'),
('EMP010', '2026-02-04', 'Present');

-- February 3, 2026
INSERT INTO attendance (employee_id, date, status) VALUES
('EMP001', '2026-02-03', 'Present'),
('EMP002', '2026-02-03', 'Present'),
('EMP003', '2026-02-03', 'Absent'),
('EMP004', '2026-02-03', 'Present'),
('EMP005', '2026-02-03', 'Present'),
('EMP006', '2026-02-03', 'Present'),
('EMP007', '2026-02-03', 'Absent'),
('EMP008', '2026-02-03', 'Present'),
('EMP009', '2026-02-03', 'Present'),
('EMP010', '2026-02-03', 'Present');

-- February 2, 2026
INSERT INTO attendance (employee_id, date, status) VALUES
('EMP001', '2026-02-02', 'Present'),
('EMP002', '2026-02-02', 'Absent'),
('EMP003', '2026-02-02', 'Present'),
('EMP004', '2026-02-02', 'Present'),
('EMP005', '2026-02-02', 'Present'),
('EMP006', '2026-02-02', 'Present'),
('EMP007', '2026-02-02', 'Present'),
('EMP008', '2026-02-02', 'Present'),
('EMP009', '2026-02-02', 'Absent'),
('EMP010', '2026-02-02', 'Present');
