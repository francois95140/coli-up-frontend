import React from 'react';
import { Link } from 'react-router-dom';

interface PackageCardProps {
  id: string;
  vendor: string;
  recipientName?: string;
  status: 'pending' | 'delivered' | 'processing';
  shippingMethod: 'air' | 'sea';
  deliveryDate?: string;
  deliveredDate?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  id,
  vendor,
  recipientName,
  status,
  shippingMethod,
  deliveryDate,
  deliveredDate
}) => {
  // Fonction pour obtenir le texte d'état en français
  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'En transit';
      case 'processing': return 'En traitement';
      case 'delivered': return 'Livré';
      default: return 'En transit';
    }
  };

  return (
    <Link to={`/package/${id}`} className="package-card-link">
      <div className="package-card">
        <div className="package-left">
          <h3 className="tracking-number">TG-{id}</h3>
          <p className="recipient-name">{recipientName || vendor}</p>
          
          <div className="card-bottom">
            <button className={`status-button status-${status}`}>
              {getStatusText(status)}
            </button>
            
            {deliveryDate && status !== 'delivered' && (
              <p className="delivery-estimate">Livraison: {deliveryDate}</p>
            )}
            {deliveredDate && status === 'delivered' && (
              <p className="delivery-estimate">Livré le: {deliveredDate}</p>
            )}
          </div>
        </div>
        
        <div className={`shipping-method-icon ${shippingMethod}`}>
          {shippingMethod === 'air' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17h18"></path>
              <path d="M3 10l2-3h4l2-4h4l2 4h4l2 3"></path>
              <path d="M3 17l1.5-5"></path>
              <path d="M9.5 17l1-5"></path>
              <path d="M14.5 17l-1-5"></path>
              <path d="M21 17l-1.5-5"></path>
              <path d="M12 7v3"></path>
            </svg>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;