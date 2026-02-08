import { useState, useEffect, useRef } from 'react';
import { dashboardAPI, employeeAPI } from '../services/api';
import { ParticleCard, GlobalSpotlight } from '../components/MagicBento';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Shuffle from '../components/Shuffle';
import '../components/MagicBento.css';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('Admin');
  const gridRef = useRef(null);
  const employeesGridRef = useRef(null);

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Mock data for 7-day attendance trend
  const last7DaysData = [
    { day: 'Mon', present: 8, absent: 2 },
    { day: 'Tue', present: 9, absent: 1 },
    { day: 'Wed', present: 7, absent: 3 },
    { day: 'Thu', present: 10, absent: 0 },
    { day: 'Fri', present: 8, absent: 2 },
    { day: 'Sat', present: 6, absent: 4 },
    { day: 'Sun', present: 5, absent: 5 }
  ];

  // Mock data for department-wise employees
  const departmentData = [
    { name: 'Engineering', value: 4, color: '#5050CC' },
    { name: 'HR', value: 2, color: '#8080FF' },
    { name: 'Sales', value: 2, color: '#A0A0FF' },
    { name: 'Marketing', value: 2, color: '#C0C0FF' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsResponse, employeesResponse] = await Promise.all([
        dashboardAPI.getStats(),
        employeeAPI.getAll()
      ]);
      setStats(statsResponse.data);
      // Get last 6 employees
      const allEmployees = employeesResponse.data || [];
      const recent = allEmployees.slice(-6).reverse();
      setRecentEmployees(recent);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>Dashboard</h1>
          <p className="page-subtitle" style={{ margin: 0 }}>Overview of your HRMS system</p>
        </div>
        <Shuffle
          text={`Welcome, ${username}!`}
          tag="div"
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#5050CC',
            fontFamily: 'inherit'
          }}
          shuffleDirection="right"
          duration={0.5}
          ease="power3.out"
          threshold={0}
          triggerOnce={false}
          triggerOnHover={true}
          shuffleTimes={3}
          stagger={0.02}
          textAlign="right"
        />
      </div>

      <GlobalSpotlight 
        gridRef={gridRef} 
        enabled={true}
        spotlightRadius={250}
        glowColor="80, 80, 204"
      />

      <div className="dashboard-grid bento-section" ref={gridRef}>
        {/* Total Employees Card */}
        <ParticleCard
          className="magic-bento-card magic-bento-card--border-glow stat-card"
          particleCount={8}
          glowColor="80, 80, 204"
          enableTilt={false}
          clickEffect={true}
          enableMagnetism={false}
        >
          <div className="magic-bento-card__header">
            <div className="magic-bento-card__icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <div className="magic-bento-card__content">
            <div className="magic-bento-card__label">Total Employees</div>
            <div className="magic-bento-card__value">{stats?.total_employees || 0}</div>
          </div>
        </ParticleCard>

        {/* Attendance Records Card */}
        <ParticleCard
          className="magic-bento-card magic-bento-card--border-glow stat-card"
          particleCount={8}
          glowColor="80, 80, 204"
          enableTilt={false}
          clickEffect={true}
          enableMagnetism={false}
        >
          <div className="magic-bento-card__header">
            <div className="magic-bento-card__icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>
          <div className="magic-bento-card__content">
            <div className="magic-bento-card__label">Attendance Records</div>
            <div className="magic-bento-card__value">{stats?.total_attendance_records || 0}</div>
          </div>
        </ParticleCard>

        {/* Present Today Card */}
        <ParticleCard
          className="magic-bento-card magic-bento-card--border-glow stat-card"
          particleCount={8}
          glowColor="16, 185, 129"
          enableTilt={false}
          clickEffect={true}
          enableMagnetism={false}
        >
          <div className="magic-bento-card__header">
            <div className="magic-bento-card__icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <div className="magic-bento-card__content">
            <div className="magic-bento-card__label">Present Today</div>
            <div className="magic-bento-card__value success">{stats?.present_today || 0}</div>
          </div>
        </ParticleCard>

        {/* Absent Today Card */}
        <ParticleCard
          className="magic-bento-card magic-bento-card--border-glow stat-card"
          particleCount={8}
          glowColor="239, 68, 68"
          enableTilt={false}
          clickEffect={true}
          enableMagnetism={false}
        >
          <div className="magic-bento-card__header">
            <div className="magic-bento-card__icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
          </div>
          <div className="magic-bento-card__content">
            <div className="magic-bento-card__label">Absent Today</div>
            <div className="magic-bento-card__value danger">{stats?.absent_today || 0}</div>
          </div>
        </ParticleCard>

        {/* 7-Day Attendance Trend Chart */}
        <ParticleCard
          className="magic-bento-card magic-bento-card--border-glow chart-card chart-card-wide"
          particleCount={12}
          glowColor="80, 80, 204"
          enableTilt={false}
          clickEffect={true}
          enableMagnetism={false}
        >
          <h3>Last 7 Days Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={last7DaysData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="day" stroke="#666" style={{ fontSize: '12px' }} />
              <YAxis stroke="#666" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px',
                  fontSize: '12px'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="present" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ParticleCard>

        {/* Department-wise Employees Pie Chart */}
        <ParticleCard
          className="magic-bento-card magic-bento-card--border-glow chart-card chart-card-wide"
          particleCount={12}
          glowColor="80, 80, 204"
          enableTilt={false}
          clickEffect={true}
          enableMagnetism={false}
        >
          <h3>Employees by Department</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px',
                  fontSize: '12px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </ParticleCard>
      </div>

      {/* Recently Added Employees Section */}
      <div style={{ marginTop: '3rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#333',
            margin: '0 0 0.5rem 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Recently Added Employees
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
            Latest additions to your team
          </p>
        </div>

        <GlobalSpotlight 
          gridRef={employeesGridRef} 
          enabled={true}
          spotlightRadius={250}
          glowColor="80, 80, 204"
        />

        <div className="bento-section" ref={employeesGridRef} style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingBottom: '1rem',
          scrollbarWidth: 'thin',
          scrollbarColor: '#5050CC #e0e0e0',
          WebkitOverflowScrolling: 'touch'
        }}>
          {recentEmployees.length > 0 ? (
            recentEmployees.map((employee) => (
              <ParticleCard
                key={employee.id}
                className="magic-bento-card magic-bento-card--border-glow"
                particleCount={6}
                glowColor="80, 80, 204"
                enableTilt={false}
                clickEffect={true}
                enableMagnetism={false}
                style={{ minHeight: '140px', minWidth: '280px', flex: '0 0 280px' }}
              >
                <div className="magic-bento-card__header">
                  <div className="magic-bento-card__icon" style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #5050CC 0%, #8080FF 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.25rem',
                    fontWeight: '600'
                  }}>
                    {employee.name?.charAt(0).toUpperCase() || 'E'}
                  </div>
                </div>
                <div className="magic-bento-card__content">
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '0.25rem'
                  }}>
                    {employee.name}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#5050CC',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    {employee.position || 'Employee'}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    {employee.department || 'N/A'}
                  </div>
                </div>
              </ParticleCard>
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '2rem',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              No employees added yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
