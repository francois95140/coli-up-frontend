import React from 'react';
import { FaPlane, FaShip } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './AddPackageForm.css';

// Define enums to match your backend
enum Status {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

enum Drop {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP'
}

enum Path {
  MARITIME = 'MARITIME',
  AERIAL = 'AERIAL'
}

// Create schema for form validation
const packageSchema = z.object({
  description: z.string().optional(),
  origin: z.string().min(1, "Pays de départ requis"),
  destination: z.string().min(1, "Pays d'arrivée requis"),
  weight: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  dimensions: z.string().optional(),
  receiverId: z.string().min(1, "ID du destinataire requis"),
  status: z.nativeEnum(Status).default(Status.PENDING),
  drop_System: z.nativeEnum(Drop).default(Drop.DELIVERY),
  path: z.nativeEnum(Path).default(Path.AERIAL),
});

type PackageFormData = z.infer<typeof packageSchema>;

interface AddPackageFormProps {
  onSubmit: (packageData: any) => void;
}

const AddPackageForm: React.FC<AddPackageFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PackageFormData>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      status: Status.PENDING,
      drop_System: Drop.DELIVERY,
      path: Path.AERIAL
    }
  });

  const path = watch('path');
  const dropSystem = watch('drop_System');

  // List of countries for origin and destination
  const countries = [
    "France", "Chine", "États-Unis", "Royaume-Uni", "Allemagne", "Japon", 
    "Togo", "Sénégal", "Côte d'Ivoire", "Ghana", "Bénin", "Nigeria", 
    "Cameroun", "Maroc", "Algérie", "Tunisie", "Afrique du Sud"
  ];

  const onFormSubmit = (data: PackageFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="package-form">
      <div className="form-group">
        <label htmlFor="description">Description (optionnel)</label>
        <textarea
          id="description"
          {...register('description')}
          placeholder="Description du colis"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="origin">Pays de départ</label>
        <select
          id="origin"
          {...register('origin')}
          className="form-select"
        >
          <option value="">Sélectionner un pays</option>
          {countries.map(country => (
            <option key={`origin-${country}`} value={country}>{country}</option>
          ))}
        </select>
        {errors.origin && <p className="error-message">{errors.origin.message}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="destination">Pays d'arrivée</label>
        <select
          id="destination"
          {...register('destination')}
          className="form-select"
        >
          <option value="">Sélectionner un pays</option>
          {countries.map(country => (
            <option key={`dest-${country}`} value={country}>{country}</option>
          ))}
        </select>
        {errors.destination && <p className="error-message">{errors.destination.message}</p>}
      </div>
      
      <div className="form-row">
        <div className="form-group half">
          <label htmlFor="weight">Poids (kg, optionnel)</label>
          <input
            type="number"
            id="weight"
            step="0.01"
            min="0"
            {...register('weight')}
            placeholder="Ex: 2.5"
          />
        </div>
        
        <div className="form-group half">
          <label htmlFor="dimensions">Dimensions (optionnel)</label>
          <input
            type="text"
            id="dimensions"
            {...register('dimensions')}
            placeholder="Ex: 30x20x10 cm"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="receiverId">ID du destinataire</label>
        <input
          type="text"
          id="receiverId"
          {...register('receiverId')}
          placeholder="ID unique du destinataire"
        />
        {errors.receiverId && <p className="error-message">{errors.receiverId.message}</p>}
      </div>
      
      <div className="form-group">
        <label>Mode d'expédition</label>
        <div className="shipping-method-selector">
          <div 
            className={`shipping-option ${path === Path.AERIAL ? 'selected' : ''}`}
            onClick={() => setValue('path', Path.AERIAL)}
          >
            <div className="shipping-icon air">
              <FaPlane size={24} />
            </div>
            <span>Avion</span>
          </div>
          
          <div 
            className={`shipping-option ${path === Path.MARITIME ? 'selected' : ''}`}
            onClick={() => setValue('path', Path.MARITIME)}
          >
            <div className="shipping-icon sea">
              <FaShip size={24} />
            </div>
            <span>Bateau</span>
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label>Système de livraison</label>
        <div className="delivery-method-selector">
          <div 
            className={`delivery-option ${dropSystem === Drop.DELIVERY ? 'selected' : ''}`}
            onClick={() => setValue('drop_System', Drop.DELIVERY)}
          >
            <span>Livraison à domicile</span>
          </div>
          
          <div 
            className={`delivery-option ${dropSystem === Drop.PICKUP ? 'selected' : ''}`}
            onClick={() => setValue('drop_System', Drop.PICKUP)}
          >
            <span>Point de retrait</span>
          </div>
        </div>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Ajouter</button>
      </div>
    </form>
  );
};

export default AddPackageForm;