const HRMSLogo = ({ size = 48, color = "#FFFFFF" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center Circle - decorative */}
      <circle cx="150" cy="150" r="65" stroke={color} strokeWidth="0" fill="none"/>
      
      {/* Top Person */}
      <circle cx="150" cy="50" r="18" fill={color}/>
      <path d="M 150 70 C 135 75, 135 95, 135 95 L 165 95 C 165 95, 165 75, 150 70 Z" fill={color} stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Top Right Person */}
      <circle cx="235" cy="100" r="18" fill={color}/>
      <path d="M 235 120 C 220 125, 220 145, 220 145 L 250 145 C 250 145, 250 125, 235 120 Z" fill={color} stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Right Person */}
      <circle cx="265" cy="180" r="18" fill={color}/>
      <path d="M 265 200 C 250 205, 250 225, 250 225 L 280 225 C 280 225, 280 205, 265 200 Z" fill={color} stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Bottom Right Person */}
      <circle cx="225" cy="250" r="18" fill={color}/>
      <path d="M 225 270 C 210 275, 210 295, 210 295 L 240 295 C 240 295, 240 275, 225 270 Z" fill={color} stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Bottom Left Person */}
      <circle cx="75" cy="250" r="18" fill={color}/>
      <path d="M 75 270 C 60 275, 60 295, 60 295 L 90 295 C 90 295, 90 275, 75 270 Z" fill={color} stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Left Person */}
      <circle cx="35" cy="180" r="18" fill={color}/>
      <path d="M 35 200 C 20 205, 20 225, 20 225 L 50 225 C 50 225, 50 205, 35 200 Z" fill={color} stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Top Left Person */}
      <circle cx="65" cy="100" r="18" fill={color}/>
      <path d="M 65 120 C 50 125, 50 145, 50 145 L 80 145 C 80 145, 80 125, 65 120 Z" fill={color} stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Circular Connection Paths */}
      <path d="M 165 60 Q 200 70, 220 90" stroke={color} strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 245 115 Q 260 140, 260 165" stroke={color} strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 258 195 Q 245 220, 230 238" stroke={color} strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 210 258 Q 170 270, 150 270" stroke={color} strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 130 270 Q 100 268, 85 258" stroke={color} strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 65 238 Q 45 215, 38 190" stroke={color} strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 38 165 Q 38 135, 55 115" stroke={color} strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 75 90 Q 105 70, 135 62" stroke={color} strokeWidth="12" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

export default HRMSLogo;
