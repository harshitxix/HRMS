import { useState, useEffect } from 'react';
import { employeeAPI, attendanceAPI } from '../services/api';

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    employee_id: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      console.error('Fetch employees error:', err);
    }
  };

  const fetchAttendance = async (filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await attendanceAPI.getAll(filterParams);
      setAttendance(response.data);
    } catch (err) {
      setError('Failed to fetch attendance records');
      console.error('Fetch attendance error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filterParams = {};
    if (filters.employee_id) filterParams.employee_id = filters.employee_id;
    if (filters.start_date) filterParams.start_date = filters.start_date;
    if (filters.end_date) filterParams.end_date = filters.end_date;
    fetchAttendance(filterParams);
  };

  const clearFilters = () => {
    setFilters({ employee_id: '', start_date: '', end_date: '' });
    fetchAttendance();
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.employee_id) errors.employee_id = 'Please select an employee';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.status) errors.status = 'Status is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await attendanceAPI.create(formData);
      setSuccess('Attendance marked successfully!');
      setFormData({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      });
      setShowForm(false);
      fetchAttendance();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to mark attendance');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && attendance.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>Attendance</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>Track and manage employee attendance</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '0.625rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #5050CC 0%, #4040AA 100%)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(80, 80, 204, 0.2)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {showForm ? 'Cancel' : '+ Mark Attendance'}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              background: showFilters ? 'rgba(80, 80, 204, 0.1)' : 'white',
              border: '1px solid rgba(80, 80, 204, 0.3)',
              cursor: 'pointer',
              padding: '0.625rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5050CC',
              transition: 'all 0.2s',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(80, 80, 204, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(80, 80, 204, 0.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = showFilters ? 'rgba(80, 80, 204, 0.1)' : 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            title="Toggle filters"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <form onSubmit={handleSubmit} style={{ 
            padding: '1.5rem', 
            background: '#ffffff',
            border: '1px solid rgba(80, 80, 204, 0.15)',
            borderRadius: '12px'
          }}>
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#5050CC', marginBottom: '0.5rem' }}>Employee *</label>
                <select
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleInputChange}
                  className={`form-select ${formErrors.employee_id ? 'error' : ''}`}
                  style={{
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(80, 80, 204, 0.2)',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.employee_id}>
                      {emp.employee_id} - {emp.full_name}
                    </option>
                  ))}
                </select>
                {formErrors.employee_id && <div className="form-error">{formErrors.employee_id}</div>}
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#5050CC', marginBottom: '0.5rem' }}>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.date ? 'error' : ''}`}
                  max={new Date().toISOString().split('T')[0]}
                  style={{
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(80, 80, 204, 0.2)',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                />
                {formErrors.date && <div className="form-error">{formErrors.date}</div>}
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#5050CC', marginBottom: '0.5rem' }}>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`form-select ${formErrors.status ? 'error' : ''}`}
                  style={{
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(80, 80, 204, 0.2)',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
                {formErrors.status && <div className="form-error">{formErrors.status}</div>}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={submitting}
              style={{
                marginTop: '0.5rem',
                padding: '0.625rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #5050CC 0%, #4040AA 100%)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(80, 80, 204, 0.2)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {submitting ? 'Marking...' : 'Mark Attendance'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <h2 className="card-title">Attendance Records</h2>
        
        {showFilters && (
          <div style={{ 
            marginBottom: '1.5rem', 
            padding: '1.5rem', 
            background: '#ffffff',
            border: '1px solid rgba(80, 80, 204, 0.15)',
            borderRadius: '12px'
          }}>
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#5050CC', marginBottom: '0.5rem' }}>Employee</label>
                <select
                  name="employee_id"
                  value={filters.employee_id}
                  onChange={handleFilterChange}
                  className="form-select"
                  style={{
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(80, 80, 204, 0.2)',
                    borderRadius: '8px'
                  }}
                >
                  <option value="">All Employees</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.employee_id}>
                      {emp.employee_id} - {emp.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#5050CC', marginBottom: '0.5rem' }}>Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={filters.start_date}
                  onChange={handleFilterChange}
                  className="form-input"
                  style={{
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(80, 80, 204, 0.2)',
                    borderRadius: '8px'
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#5050CC', marginBottom: '0.5rem' }}>End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={filters.end_date}
                  onChange={handleFilterChange}
                  className="form-input"
                  style={{
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(80, 80, 204, 0.2)',
                    borderRadius: '8px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-primary btn-sm" 
                onClick={applyFilters}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #5050CC 0%, #4040AA 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(80, 80, 204, 0.2)'
                }}
              >
                Apply Filters
              </button>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={clearFilters}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  background: 'white',
                  border: '1px solid rgba(80, 80, 204, 0.3)',
                  borderRadius: '8px',
                  color: '#5050CC'
                }}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {attendance.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3 className="empty-state-title">No attendance records</h3>
            <p className="empty-state-text">Start marking attendance to see records here</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id}>
                    <td>{record.employee_id}</td>
                    <td>{record.full_name}</td>
                    <td>{record.department}</td>
                    <td>{formatDate(record.date)}</td>
                    <td>
                      <span className={`badge ${record.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
