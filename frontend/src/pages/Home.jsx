import { useNavigate } from 'react-router-dom';
import Grainient from '../components/Grainient';
import ShinyText from '../components/ShinyText';
import SpotlightCard from '../components/SpotlightCard';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleLetsGo = () => {
    navigate('/login');
  };

  const handleViewGithub = () => {
    // Update this URL with your GitHub repository
    window.open('https://github.com/harshitxix/HRMS', '_blank');
  };

  return (
    <div className="home-container">
      {/* Grainient Background */}
      <div className="home-background">
        <Grainient
          color1="#FFFFFF"
          color2="#8080FF"
          color3="#FFFFFF"
          timeSpeed={0.3}
          grainAmount={0.15}
        />
      </div>

      {/* HRMS Lite Branding - Top Left */}
      <div className="home-branding">
        <h2 className="home-branding-title">
          <ShinyText 
            text="HRMS Lite" 
            color="#5050CC"
            shineColor="#ffffff"
            speed={3}
            spread={80}
          />
        </h2>
      </div>

      {/* Main Content */}
      <div className="home-content">
        {/* Hero Section */}
        <div className="home-hero">
          <h1 className="home-title">
            <ShinyText 
              text="Modern HR Management System" 
              color="#5050CC"
              shineColor="#ffffff"
              speed={4}
              spread={90}
            />
          </h1>
          
          <p className="home-subtitle">
            All-in-one employee management and attendance tracking made simple.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="home-buttons">
          <button
            onClick={handleLetsGo}
            className="home-button home-button-primary"
          >
            Let's Go →
          </button>

          <button
            onClick={handleViewGithub}
            className="home-button home-button-secondary"
          >
            View on GitHub ★
          </button>
        </div>

        {/* Feature Cards */}
        <div className="home-features">
          <SpotlightCard spotlightColor="rgba(128, 128, 255, 0.3)">
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '16px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="3" stroke="#8080FF" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 21C6 17.686 8.686 15 12 15C15.314 15 18 17.686 18 21" stroke="#8080FF" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="18" cy="8" r="2" stroke="#8080FF" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M20 15C21.5 15.5 23 17 23 19" stroke="#8080FF" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="6" cy="8" r="2" stroke="#8080FF" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M4 15C2.5 15.5 1 17 1 19" stroke="#8080FF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                Employee Management
              </div>
              <div style={{
                fontSize: '13px',
                color: '#666'
              }}>
                Add, view & manage employees
              </div>
            </div>
          </SpotlightCard>
          
          <SpotlightCard spotlightColor="rgba(128, 128, 255, 0.3)">
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '16px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="15" rx="2" stroke="#8080FF" strokeWidth="2"/>
                  <path d="M3 10H21" stroke="#8080FF" strokeWidth="2"/>
                  <path d="M8 3V6" stroke="#8080FF" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 3V6" stroke="#8080FF" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="8" cy="14" r="1" fill="#8080FF"/>
                  <circle cx="12" cy="14" r="1" fill="#8080FF"/>
                  <circle cx="16" cy="14" r="1" fill="#8080FF"/>
                  <circle cx="8" cy="18" r="1" fill="#8080FF"/>
                  <circle cx="12" cy="18" r="1" fill="#8080FF"/>
                </svg>
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                Attendance Tracking
              </div>
              <div style={{
                fontSize: '13px',
                color: '#666'
              }}>
                Mark & view daily attendance
              </div>
            </div>
          </SpotlightCard>
          
          <SpotlightCard spotlightColor="rgba(128, 128, 255, 0.3)">
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '16px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3V21H21" stroke="#8080FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 14L11 10L15 13L21 7" stroke="#8080FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 7H21V12" stroke="#8080FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                Reports & Analytics
              </div>
              <div style={{
                fontSize: '13px',
                color: '#666'
              }}>
                View statistics & insights
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

export default Home;
