import { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees');
      console.error('Fetch error:', err);
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

  const validateForm = () => {
    const errors = {};
    if (!formData.employee_id.trim()) errors.employee_id = 'Employee ID is required';
    if (!formData.full_name.trim()) errors.full_name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.department.trim()) errors.department = 'Department is required';
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
      await employeeAPI.create(formData);
      setSuccess('Employee added successfully!');
      setFormData({ employee_id: '', full_name: '', email: '', department: '' });
      setShowForm(false);
      fetchEmployees();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add employee');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (employeeId, fullName) => {
    if (!confirm(`Are you sure you want to delete ${fullName}?`)) return;

    try {
      setError(null);
      await employeeAPI.delete(employeeId);
      setSuccess('Employee deleted successfully!');
      fetchEmployees();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete employee');
    }
  };

  if (loading && employees.length === 0) {
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
          <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>Employees</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>Manage employee records</p>
        </div>
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
          {showForm ? 'Cancel' : '+ Add Employee'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <form onSubmit={handleSubmit} style={{ 
            marginBottom: '2rem', 
            padding: '1.5rem', 
            background: '#ffffff',
            border: '1px solid rgba(80, 80, 204, 0.15)',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(80, 80, 204, 0.08)'
          }}>
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#5050CC', marginBottom: '0.5rem' }}>Employee ID *</label>
                <input
                  type="text"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.employee_id ? 'error' : ''}`}
                  placeholder="e.g., EMP001"
                  style={{
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(80, 80, 204, 0.2)',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#5050CC'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(80, 80, 204, 0.2)'}
                />
                {formErrors.employee_id && <div className="form-error">{formErrors.employee_id}</div>}
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#5050CC', marginBottom: '0.5rem' }}>Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.full_name ? 'error' : ''}`}
                  placeholder="e.g., John Doe"
                  style={{
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(80, 80, 204, 0.2)',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#5050CC'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(80, 80, 204, 0.2)'}
                />
                {formErrors.full_name && <div className="form-error">{formErrors.full_name}</div>}
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#5050CC', marginBottom: '0.5rem' }}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.email ? 'error' : ''}`}
                  placeholder="e.g., john@company.com"
                  style={{
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(80, 80, 204, 0.2)',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#5050CC'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(80, 80, 204, 0.2)'}
                />
                {formErrors.email && <div className="form-error">{formErrors.email}</div>}
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.875rem', fontWeight: '600', color: '#5050CC', marginBottom: '0.5rem' }}>Department *</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.department ? 'error' : ''}`}
                  placeholder="e.g., Engineering"
                  style={{
                    padding: '0.625rem 0.875rem',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(80, 80, 204, 0.2)',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#5050CC'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(80, 80, 204, 0.2)'}
                />
                {formErrors.department && <div className="form-error">{formErrors.department}</div>}
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
              {submitting ? 'Adding...' : 'Add Employee'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <h2 className="card-title">Employee List</h2>

        {employees.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3 className="empty-state-title">No employees yet</h3>
            <p className="empty-state-text">Get started by adding your first employee</p>
            {!showForm && (
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                Add Employee
              </button>
            )}
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.employee_id}</td>
                    <td>{employee.full_name}</td>
                    <td>{employee.email}</td>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#5050CC',
                        background: 'linear-gradient(135deg, rgba(80, 80, 204, 0.1) 0%, rgba(80, 80, 204, 0.05) 100%)',
                        border: '1px solid rgba(80, 80, 204, 0.2)',
                        borderRadius: '12px',
                        letterSpacing: '0.3px'
                      }}>
                        {employee.department}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(employee.employee_id, employee.full_name)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ef4444',
                          transition: 'all 0.2s',
                          borderRadius: '8px'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        title="Delete employee"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
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

export default Employees;
