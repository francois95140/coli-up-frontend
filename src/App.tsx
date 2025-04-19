import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import AddPackagePage from './pages/AddPackagePage';

// Import components
import BottomNavBar from './components/BottomNavBar';
import PackageTracking from './components/PackageTracking';

// Wrapper component to conditionally render the BottomNavBar
const AppLayout = ({ children, isAuthenticated }: { children: React.ReactNode, isAuthenticated: boolean }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  return (
    <>
      {children}
      {isAuthenticated && !isAuthPage && <BottomNavBar />}
    </>
  );
};

function App() {
  // Make sure isAuthenticated is true for testing
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for testing
  
  // Load fonts
  useEffect(() => {
    // Add Google Fonts
    const montserrat = document.createElement('link');
    montserrat.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap';
    montserrat.rel = 'stylesheet';
    
    const openSans = document.createElement('link');
    openSans.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap';
    openSans.rel = 'stylesheet';
    
    document.head.appendChild(montserrat);
    document.head.appendChild(openSans);
    
    return () => {
      document.head.removeChild(montserrat);
      document.head.removeChild(openSans);
    };
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <AppLayout isAuthenticated={isAuthenticated}>
              <Navigate to="/home" />
            </AppLayout>
          } />
          <Route path="/login" element={
            <AppLayout isAuthenticated={isAuthenticated}>
              <Login onLogin={handleLogin} />
            </AppLayout>
          } />
          <Route path="/register" element={
            <AppLayout isAuthenticated={isAuthenticated}>
              <Register />
            </AppLayout>
          } />
          <Route path="/profile" element={
            <AppLayout isAuthenticated={isAuthenticated}>
              {isAuthenticated ? <Profile onLogout={handleLogout} /> : <Navigate to="/login" />}
            </AppLayout>
          } />
          <Route path="/home" element={
            <AppLayout isAuthenticated={isAuthenticated}>
              {isAuthenticated ? <Home /> : <Navigate to="/login" />}
            </AppLayout>
          } />
          <Route path="/packages" element={
            <AppLayout isAuthenticated={isAuthenticated}>
              {isAuthenticated ? <div>Page Colis</div> : <Navigate to="/login" />}
            </AppLayout>
          } />
          <Route path="/notifications" element={
            <AppLayout isAuthenticated={isAuthenticated}>
              {isAuthenticated ? <div>Page Notifications</div> : <Navigate to="/login" />}
            </AppLayout>
          } />
          <Route path="/tracking/:trackingNumber" element={
            isAuthenticated? <PackageTracking /> : <Navigate to="/login" />
          } />
          <Route path="/add-package" element={
            <AppLayout isAuthenticated={isAuthenticated}>
              {isAuthenticated? <AddPackagePage/> : <Navigate to="/login" />}
            </AppLayout>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
