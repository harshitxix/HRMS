import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grainient from '../components/Grainient';
import ShinyText from '../components/ShinyText';
import ElectricBorder from '../components/ElectricBorder';
import HRMSLogo from '../assets/HRMSLogo';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple authentication (you can enhance this later)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Store login status
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', credentials.username);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '20px'
    }}>
      {/* Grainient Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <Grainient
          color1="#FFFFFF"
          color2="#8080FF"
          color3="#FFFFFF"
          timeSpeed={0.3}
          grainAmount={0.15}
        />
      </div>

      {/* Home Button - Top Right */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(80, 80, 204, 0.3)',
          borderRadius: '12px',
          padding: '10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(80, 80, 204, 0.3)';
          e.currentTarget.style.background = 'rgba(80, 80, 204, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
        }}
        title="Back to Home"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5050CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </button>

      {/* Login Card */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '360px'
      }}>
        <ElectricBorder
          color="#5050CC"
          speed={1}
          chaos={0.01}
          borderRadius={18}
        >
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '24px 22px',
            borderRadius: '18px'
          }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #5050CC 0%, #4040AA 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(80, 80, 204, 0.4)'
          }}>
            <HRMSLogo size={36} color="#FFFFFF" />
          </div>
          <h1 style={{ 
            fontSize: '1.6rem', 
            marginBottom: '6px',
            fontWeight: '700'
          }}>
            <ShinyText 
              text="HRMS Lite" 
              color="#5050CC"
              shineColor="#ffffff"
              speed={3}
              spread={90}
            />
          </h1>
          <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>Welcome back! Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontWeight: '600',
              color: '#333',
              fontSize: '12px'
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '13px',
                boxSizing: 'border-box',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              placeholder="Enter your username"
              onFocus={(e) => e.target.style.borderColor = '#5050CC'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontWeight: '600',
              color: '#333',
              fontSize: '12px'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                fontSize: '13px',
                boxSizing: 'border-box',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              placeholder="Enter your password"
              onFocus={(e) => e.target.style.borderColor = '#5050CC'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          {error && (
            <div style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
              color: 'white',
              padding: '10px 12px',
              borderRadius: '10px',
              marginBottom: '14px',
              fontSize: '12px',
              fontWeight: '500',
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '11px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #5050CC 0%, #4040AA 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: loading ? 'none' : '0 6px 20px rgba(80, 80, 204, 0.4)',
              marginBottom: '14px'
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 12px 32px rgba(80, 80, 204, 0.5)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 8px 24px rgba(80, 80, 204, 0.4)')}
          >
            {loading ? '🔄 Logging in...' : 'Login'}
          </button>

          <div style={{
            marginTop: '14px',
            padding: '12px',
            background: 'linear-gradient(135deg, rgba(80, 80, 204, 0.1) 0%, rgba(64, 64, 170, 0.1) 100%)',
            borderRadius: '10px',
            fontSize: '11px',
            color: '#555',
            border: '1px solid rgba(80, 80, 204, 0.2)'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '4px', color: '#5050CC' }}>
              💡 Demo Credentials:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div><strong>Username:</strong> admin</div>
              <div><strong>Password:</strong> admin123</div>
            </div>
          </div>
        </form>
          </div>
        </ElectricBorder>
      </div>
    </div>
  );
}

export default Login;
