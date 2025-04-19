import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaShip, FaPhone } from 'react-icons/fa';

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
    <Link to={`/tracking/${id}`} className="package-card-link">
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
        
        <div className="shipping-method-icon-container">
          <div className={`shipping-method-icon ${shippingMethod}`}>
            {shippingMethod === 'air' ? (
              <FaPlane size={20} />
            ) : (
              <FaShip size={20} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;