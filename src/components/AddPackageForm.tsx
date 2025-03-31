import React, { useState } from 'react';

interface AddPackageFormProps {
  onClose: () => void;
  onSubmit: (packageData: any) => void;
}

const AddPackageForm: React.FC<AddPackageFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    trackingNumber: '',
    recipient: '',
    vendor: '',
    shippingMethod: 'air',
    estimatedDelivery: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Ajouter un colis</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="package-form">
          <div className="form-group">
            <label htmlFor="trackingNumber">Numéro de suivi</label>
            <input
              type="text"
              id="trackingNumber"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleChange}
              placeholder="Ex: 123456789"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="recipient">Destinataire</label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              placeholder="Nom du destinataire"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="vendor">Expéditeur / Vendeur</label>
            <input
              type="text"
              id="vendor"
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              placeholder="Ex: Amazon, Cdiscount..."
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="shippingMethod">Méthode d'expédition</label>
            <div className="shipping-method-selector">
              <div 
                className={`shipping-option ${formData.shippingMethod === 'air' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, shippingMethod: 'air' }))}
              >
                <div className="shipping-icon air">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                  </svg>
                </div>
                <span>Avion</span>
              </div>
              
              <div 
                className={`shipping-option ${formData.shippingMethod === 'sea' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, shippingMethod: 'sea' }))}
              >
                <div className="shipping-icon sea">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 17h18"></path>
                    <path d="M3 10l2-3h4l2-4h4l2 4h4l2 3"></path>
                    <path d="M3 17l1.5-5"></path>
                    <path d="M9.5 17l1-5"></path>
                    <path d="M14.5 17l-1-5"></path>
                    <path d="M21 17l-1.5-5"></path>
                    <path d="M12 7v3"></path>
                  </svg>
                </div>
                <span>Bateau</span>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="estimatedDelivery">Date de livraison estimée</label>
            <input
              type="date"
              id="estimatedDelivery"
              name="estimatedDelivery"
              value={formData.estimatedDelivery}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn btn-primary">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackageForm;