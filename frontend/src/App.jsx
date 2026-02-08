import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import PillNav from './components/PillNav'
import ShinyText from './components/ShinyText'
import './App.css'

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const showNavbar = !['/', '/login', '/home'].includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const createLogoDataURL = () => {
    const svg = `<svg width="36" height="36" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="50" r="18" fill="white"/>
      <path d="M 150 70 C 135 75, 135 95, 135 95 L 165 95 C 165 95, 165 75, 150 70 Z" fill="white" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="235" cy="100" r="18" fill="white"/>
      <path d="M 235 120 C 220 125, 220 145, 220 145 L 250 145 C 250 145, 250 125, 235 120 Z" fill="white" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="265" cy="180" r="18" fill="white"/>
      <path d="M 265 200 C 250 205, 250 225, 250 225 L 280 225 C 280 225, 280 205, 265 200 Z" fill="white" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="225" cy="250" r="18" fill="white"/>
      <path d="M 225 270 C 210 275, 210 295, 210 295 L 240 295 C 240 295, 240 275, 225 270 Z" fill="white" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="75" cy="250" r="18" fill="white"/>
      <path d="M 75 270 C 60 275, 60 295, 60 295 L 90 295 C 90 295, 90 275, 75 270 Z" fill="white" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="35" cy="180" r="18" fill="white"/>
      <path d="M 35 200 C 20 205, 20 225, 20 225 L 50 225 C 50 225, 50 205, 35 200 Z" fill="white" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="65" cy="100" r="18" fill="white"/>
      <path d="M 65 120 C 50 125, 50 145, 50 145 L 80 145 C 80 145, 80 125, 65 120 Z" fill="white" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 165 60 Q 200 70, 220 90" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 245 115 Q 260 140, 260 165" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 258 195 Q 245 220, 230 238" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 210 258 Q 170 270, 150 270" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 130 270 Q 100 268, 85 258" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 65 238 Q 45 215, 38 190" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 38 165 Q 38 135, 55 115" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 75 90 Q 105 70, 135 62" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round"/>
    </svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/employees', label: 'Employees' },
    { href: '/attendance', label: 'Attendance' }
  ];

  return (
    <div className="app">
      {showNavbar && (
        <div className="app-navbar" style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(80, 80, 204, 0.1)',
          padding: '20px 30px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {/* HRMS Lite Dashboard branding */}
          <div style={{
            flex: '0 0 auto'
          }}>
            <h2 className="navbar-title" style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              margin: 0,
              whiteSpace: 'nowrap'
            }}>
              <ShinyText 
                text="HRMS Lite Dashboard" 
                color="#5050CC"
                shineColor="#ffffff"
                speed={3}
                spread={80}
              />
            </h2>
          </div>

          {/* Navigation Pills and Logout */}
          <div className="navbar-actions" style={{
            flex: '1 1 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '20px',
            minWidth: 0
          }}>
            <PillNav
              logo={createLogoDataURL()}
              logoAlt="HRMS Logo"
              items={navItems}
              activeHref={location.pathname}
              baseColor="#5050CC"
              pillColor="rgba(255, 255, 255, 0.95)"
              hoveredPillTextColor="#ffffff"
              pillTextColor="#5050CC"
              initialLoadAnimation={false}
            />
            
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                color: '#5050CC',
                border: '2px solid rgba(80, 80, 204, 0.3)',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                height: '42px',
                flexShrink: 0
              }}
              onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px rgba(80, 80, 204, 0.3)')}
              onMouseOut={(e) => (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <main className={showNavbar ? "main-content" : ""} style={{
        padding: showNavbar ? '30px' : '0',
        minHeight: showNavbar ? 'calc(100vh - 150px)' : '100vh'
      }}>
        {children}
      </main>

      {showNavbar && (
        <footer className="footer">
          <p>&copy; 2026 HRMS Lite. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/employees" element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          } />
          <Route path="/attendance" element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
