import React from 'react';
import '../styles/components/ServiceCard.css';

const ServiceCard = ({ service, isExpanded, onClick }) => {
  return (
    <div 
      className={`service-card ${isExpanded ? 'expanded' : ''}`}
      onClick={onClick}
    >
      <div className="service-header">
        <div className="service-icon">
          <i className={service.icon}></i>
        </div>
        <h3>{service.title}</h3>
        <div className="expand-icon">
          <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </div>
      </div>
      
      <div className="service-content">
        <p className="service-description">{service.description}</p>
        
        {isExpanded && (
          <div className="service-details">
            <ul className="service-features">
              {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className="service-tagline"><strong>{service.tagline}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;