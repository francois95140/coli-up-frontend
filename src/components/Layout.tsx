import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <div className="layout">
      <header className="navbar">
        <Logo />
        <nav>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className={`nav-link ${isActive('/home')}`}>Accueil</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>Profil</Link>
            </li>
            {onLogout && (
              <li className="nav-item">
                <button onClick={onLogout} className="btn btn-primary btn-sm">Déconnexion</button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="content">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Coli Up. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;