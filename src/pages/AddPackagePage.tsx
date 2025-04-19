import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import AddPackageForm from '../components/AddPackageForm';
import '../styles/AddPackagePage.css';

const AddPackagePage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (packageData: any) => {
    // Here you would typically send the data to your API
    console.log('Package data submitted:', packageData);
    
    // Navigate back to the packages list or home page
    navigate('/');
  };

  return (
    <div className="add-package-page">
      <div className="page-container">
        <div className="page-header">
          <button className="back-button" onClick={handleBack}>
            <FaArrowLeft /> Retour
          </button>
          <h2>Ajouter un colis</h2>
          <div></div> {/* Empty div for flex spacing */}
        </div>
        
        <AddPackageForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddPackagePage;