import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas!");
      return;
    }
    
    // Here you would typically make an API call to register the user
    console.log('Registration attempt with:', { name, email, password });
    
    // For demo purposes, navigate to login after registration
    navigate('/login');
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
        
        <h1 className="auth-title">Créer un compte</h1>
        <p className="auth-subtitle">Entrez vos informations pour vous inscrire</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom complet"
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmer le mot de passe"
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
            <img src="/google-icon.svg" alt="Google" />
            Continuer avec Google
          </button>
          <button className="btn btn-social btn-apple">
            <img src="/apple-icon.svg" alt="Apple" />
            Continuer avec Apple
          </button>
        </div>
        
        <p className="terms-text">
          En cliquant sur continuer, vous acceptez nos{' '}
          <Link to="/terms">Conditions d'utilisation</Link> et{' '}
          <Link to="/privacy">Politique de confidentialité</Link>
        </p>
        
        <p className="auth-switch">
          Déjà un compte? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;