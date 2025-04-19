import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../components/Logo';
import PackageCard from '../components/PackageCard';
import AddPackageForm from '../components/AddPackageForm';

function Home() {
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  // Remove the showAddForm state since we're navigating to a separate page
  
  // Sample package data
  const [packages, setPackages] = useState([
    {
      id: '4164846412',
      vendor: 'Amazon',
      recipientName: 'Jean Marck',
      status: 'pending' as const,
      shippingMethod: 'air' as const,
      deliveryDate: '15 juin'
    },
    {
      id: '6789012345',
      vendor: 'Cdiscount',
      recipientName: 'Marie Dupont',
      status: 'delivered' as const,
      shippingMethod: 'sea' as const,
      deliveredDate: '10 juin'
    },
    {
      id: '2468013579',
      vendor: 'Alibaba',
      recipientName: 'Pierre Leroy',
      status: 'processing' as const,
      shippingMethod: 'sea' as const,
      deliveryDate: '25 juin'
    }
  ]);

  const handleAddPackage = (packageData: any) => {
    // Format the date to display in French format
    const date = new Date(packageData.estimatedDelivery);
    const formattedDate = date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long'
    });
    
    // Create a new package with the form data
    const newPackage = {
      id: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      vendor: packageData.vendor,
      recipientName: packageData.recipient,
      status: 'pending' as const,
      shippingMethod: packageData.shippingMethod as 'air' | 'sea',
      deliveryDate: formattedDate
    };
    
    // Add the new package to the list
    setPackages([newPackage, ...packages]);
    
    // Close the form
    setShowAddForm(false);
  };

  return (
    <div className="app-container">
      <div className="mobile-status-bar">
        <div className="icons">
          <span className="signal"></span>
          <span className="wifi"></span>
          <span className="battery"></span>
        </div>
      </div>

      <header className="app-header">
        <Logo size="small" />
        <div className="header-actions">
          <Link to="/profile" className="profile-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
        </div>
      </header>

      <main className="app-content">
        <section className="welcome-section">
          <h1>Bienvenue sur Coli Up</h1>
          <p>Suivez vos colis en toute simplicité</p>
        </section>

        <section className="packages-section">
          <div className="section-header">
            <h2>Mes colis</h2>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={() => navigate('/add-package')}
            >
              + Ajouter
            </button>
          </div>

          <div className="package-list">
            {packages.map(pkg => (
              <PackageCard 
                key={pkg.id}
                id={pkg.id}
                vendor={pkg.vendor}
                recipientName={pkg.recipientName}
                status={pkg.status}
                shippingMethod={pkg.shippingMethod}
                deliveryDate={pkg.deliveryDate}
                deliveredDate={pkg.deliveredDate}
              />
            ))}
          </div>
        </section>

        <section className="quick-actions">
          <h2>Actions rapides</h2>
          <div className="action-buttons">
            <button className="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Suivi
            </button>
            <button className="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Historique
            </button>
            <button className="action-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Aide
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;