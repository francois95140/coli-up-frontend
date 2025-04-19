import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to verify credentials
    console.log('Login attempt with:', { email, password });
    
    // For demo purposes, we'll just simulate a successful login
    onLogin();
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <div className="mobile-status-bar">
        <div className="icons">
          <span className="signal"></span>
          <span className="wifi"></span>
          <span className="battery"></span>
        </div>
      </div>

      <div className="auth-content">
        <div className="auth-logo">
          <Logo size="large" />
        </div>
        
        <h1 className="auth-title">Connexion</h1>
        <p className="auth-subtitle">Entrez votre email pour vous connecter</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domaine.com"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Continuer
          </button>
        </form>
        
        <div className="divider">
          <span>ou</span>
        </div>
        
        <div className="social-login">
          <button className="btn btn-social btn-google">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '10px' }}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuer avec Google
          </button>
          <button className="btn btn-social btn-apple">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '10px' }}>
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.87 1.17-.28 2.3-.99 3.46-.84 1.47.2 2.58.99 3.11 2.43-3.23 1.98-2.37 6.72.35 8.1-.5 1.11-.93 2.2-2 2.41zm-5.29-15.54c.06-1.95 1.41-3.59 3.08-3.73.34 2.08-1.56 4.04-3.08 3.73z" fill="#000"/>
            </svg>
            Continuer avec Apple
          </button>
        </div>
        
        <p className="terms-text">
          En cliquant sur continuer, vous acceptez nos{' '}
          <Link to="/terms">Conditions d'utilisation</Link> et{' '}
          <Link to="/privacy">Politique de confidentialité</Link>
        </p>
        
        <p className="auth-switch">
          Pas encore de compte? <Link to="/register">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;