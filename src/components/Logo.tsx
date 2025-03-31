import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'logo-small';
      case 'large':
        return 'logo-large';
      default:
        return 'logo-medium';
    }
  };

  return (
    <Link to="/" className={`logo ${getSizeClass()}`}>
      <span className="logo-text">Coli<span className="logo-highlight">Up</span></span>
    </Link>
  );
};

export default Logo;