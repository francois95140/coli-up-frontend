import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../PackageTracking.css';
import { FaArrowLeft, FaCopy, FaPlane, FaShip, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaCircle, FaPhone, FaEnvelope } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Define types for the tracking events
interface TrackingEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
}

// Define types for the package data
interface PackageData {
  trackingNumber: string;
  recipient: string;
  status: 'pending' | 'processing' | 'delivered';
  shippingMethod: 'air' | 'sea';
  origin: string;
  destination: string;
  estimatedDelivery: string;
  weight: string;
  dimensions: string;
  trackingEvents: TrackingEvent[];
  recipientAddress: string;
  recipientPhone: string;
  recipientEmail: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const PackageTracking: React.FC = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const navigate = useNavigate();
  const [mapLoaded, setMapLoaded] = useState(false);

  // This would normally come from an API call using the trackingNumber
  const packageData: PackageData = {
    trackingNumber: trackingNumber || 'COL123456789',
    recipient: 'John Doe',
    status: 'processing', // pending, processing, delivered
    shippingMethod: 'air',
    origin: 'Paris, France',
    destination: 'New York, USA',
    estimatedDelivery: 'June 15, 2023',
    weight: '2.5 kg',
    dimensions: '30 x 20 x 10 cm',
    trackingEvents: [
      {
        date: 'June 10, 2023 - 09:30',
        title: 'Package Shipped',
        description: 'Your package has been shipped from our facility in Paris.',
        status: 'completed'
      },
      {
        date: 'June 12, 2023 - 14:45',
        title: 'In Transit',
        description: 'Your package is in transit to the destination country.',
        status: 'active'
      },
      {
        date: 'June 14, 2023 - 08:00',
        title: 'Customs Clearance',
        description: 'Your package is being processed by customs.',
        status: 'pending'
      },
      {
        date: 'June 15, 2023 - 10:00',
        title: 'Out for Delivery',
        description: 'Your package is out for delivery.',
        status: 'pending'
      },
      {
        date: 'June 15, 2023 - 17:00',
        title: 'Delivered',
        description: 'Your package has been delivered.',
        status: 'pending'
      }
    ],
    recipientAddress: '123 Main St, Apt 4B, New York, NY 10001, USA',
    recipientPhone: '+1 (555) 123-4567',
    recipientEmail: 'john.doe@example.com',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  };

  // Map container style
  const mapContainerStyle = {
    width: '100%',
    height: '250px',
    borderRadius: '12px'
  };

  // Map center (New York coordinates)
  const center = packageData.coordinates || {
    lat: 40.7128,
    lng: -74.0060
  };

  const handleCopyTracking = (): void => {
    navigator.clipboard.writeText(packageData.trackingNumber);
    alert('Tracking number copied to clipboard!');
  };

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'status-badge-large status-pending';
      case 'processing':
        return 'status-badge-large status-processing';
      case 'delivered':
        return 'status-badge-large status-delivered';
      default:
        return 'status-badge-large status-pending';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="tracking-page">
      <div className="tracking-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour
        </button>
        <h1 className="tracking-title">Suivi de colis</h1>
        <div></div>
      </div>

      <div className="package-info-card">
        <div className="package-header">
          <div>
            <div className="tracking-number">
              <span>TG-{packageData.trackingNumber}</span>
              <button className="copy-button" onClick={handleCopyTracking}>
                <FaCopy />
              </button>
            </div>
            <p className="recipient-name">{packageData.recipient}</p>
          </div>
          <div className={`status-indicator status-${packageData.status}`}>
            {getStatusText(packageData.status)}
          </div>
        </div>
        
        <div className="progress-tracker">
          <div className="progress-bar-container">
            <div className={`progress-bar progress-${packageData.status}`}></div>
          </div>
          <div className="progress-steps">
            <div className={`progress-step ${packageData.status === 'pending' || packageData.status === 'processing' || packageData.status === 'delivered' ? 'active' : ''}`}>
              <div className="step-dot"></div>
              <span>Expédié</span>
            </div>
            <div className={`progress-step ${packageData.status === 'processing' || packageData.status === 'delivered' ? 'active' : ''}`}>
              <div className="step-dot"></div>
              <span>En transit</span>
            </div>
            <div className={`progress-step ${packageData.status === 'delivered' ? 'active' : ''}`}>
              <div className="step-dot"></div>
              <span>Livré</span>
            </div>
          </div>
        </div>

        <div className="estimated-delivery">
          <div className="delivery-date-info">
            <span className="delivery-label">Livraison estimée</span>
            <span className="delivery-date">{packageData.estimatedDelivery}</span>
          </div>
          <div className="delivery-icon">
            <FaCalendarAlt />
          </div>
        </div>

        <div className="package-details-grid">
          <div className="detail-card">
            <span className="detail-icon">
              {packageData.shippingMethod === 'air' ? (
                <FaPlane />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19h16c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2z"></path>
                  <path d="M2 13h20"></path>
                  <path d="M4 9h16"></path>
                  <path d="M10 5h4"></path>
                </svg>
              )}
            </span>
            <div className="detail-content">
              <span className="detail-label">Mode d'expédition</span>
              <span className="detail-value">{packageData.shippingMethod === 'air' ? 'Fret aérien' : 'Fret maritime'}</span>
            </div>
          </div>
          
          <div className="detail-card">
            <span className="detail-icon"><FaMapMarkerAlt /></span>
            <div className="detail-content">
              <span className="detail-label">Origine</span>
              <span className="detail-value">{packageData.origin}</span>
            </div>
          </div>
          
          <div className="detail-card">
            <span className="detail-icon"><FaMapMarkerAlt /></span>
            <div className="detail-content">
              <span className="detail-label">Destination</span>
              <span className="detail-value">{packageData.destination}</span>
            </div>
          </div>
          
          <div className="detail-card">
            <span className="detail-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </span>
            <div className="detail-content">
              <span className="detail-label">Poids</span>
              <span className="detail-value">{packageData.weight}</span>
            </div>
          </div>
          
          <div className="detail-card">
            <span className="detail-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </span>
            <div className="detail-content">
              <span className="detail-label">Dimensions</span>
              <span className="detail-value">{packageData.dimensions}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tracking-timeline-card">
        <div className="timeline-header">
          <h2 className="timeline-title">Historique de suivi</h2>
        </div>
        <div className="timeline">
          {packageData.trackingEvents.map((event, index) => (
            <div className="timeline-event" key={index}>
              <div className={`timeline-dot ${event.status}`}>
                {event.status === 'completed' ? <FaCheckCircle size={12} /> : <FaCircle size={8} />}
              </div>
              <div className="timeline-content">
                <p className="timeline-date">{event.date}</p>
                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="delivery-info-card">
        <div className="timeline-header">
          <h2 className="timeline-title">Informations de livraison</h2>
        </div>
        
        <div className="delivery-address">
          <h3 className="address-title">Adresse de livraison</h3>
          <p className="address-text">{packageData.recipientAddress}</p>
        </div>
        
        <div className="map-container">
          <LoadScript
            googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
            onLoad={() => setMapLoaded(true)}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={14}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
        
        <div className="recipient-info">
          <div className="detail-row">
            <span className="detail-label">Destinataire</span>
            <span className="detail-value">{packageData.recipient}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Téléphone</span>
            <span className="detail-value">{packageData.recipientPhone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{packageData.recipientEmail}</span>
          </div>
        </div>
      </div>

      <div className="tracking-actions">
        <button className="action-button">
          <FaPhone /> Contacter le support
        </button>
        <button className="action-button">
          <FaEnvelope /> Mises à jour par email
        </button>
        <button className="action-button primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
          </svg>
          Suivre sur la carte
        </button>
      </div>
    </div>
  );
};

export default PackageTracking;