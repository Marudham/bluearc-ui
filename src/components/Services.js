import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import '../styles/components/Services.css';

const Services = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const servicesData = [
    {
      icon: 'fas fa-bullseye',
      title: 'Lead Generation & Client Acquisition',
      description: 'We help you acquire new clients faster through highly targeted B2B outreach.',
      features: [
        'Verified C-level & decision-maker contacts',
        'Customized lead lists by industry & region',
        'LinkedIn & email outreach support',
        'Appointment setting & meeting arrangements'
      ],
      tagline: 'We bring you closer to your next client.'
    },
    {
      icon: 'fas fa-database',
      title: 'B2B Data Services',
      description: 'High-quality, business-ready data that fuels your sales and marketing campaigns.',
      features: [
        'Company & contact database building',
        'Direct phone numbers, emails & LinkedIn profiles',
        'Market research & industry-specific lists',
        'On-demand data delivery'
      ],
      tagline: 'Accurate data = higher conversion.'
    },
    {
      icon: 'fas fa-code',
      title: 'Web Development',
      description: 'Your website is the first impression—we make it count with clean, modern designs.',
      features: [
        'Business websites & landing pages',
        'Custom portfolio websites',
        'CRM & lead capture integration',
        'Mobile-friendly, SEO-ready design'
      ],
      tagline: 'Your 24/7 sales tool.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Data Analysis & BI Reporting',
      description: 'Transform raw numbers into powerful insights and actionable dashboards.',
      features: [
        'Sales & marketing performance analysis',
        'KPI tracking & reporting',
        'Interactive BI dashboards',
        'Forecasting & trend analysis'
      ],
      tagline: 'Smarter insights, better decisions.'
    }
  ];

  const handleCardClick = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null); // Collapse if clicking the same card
    } else {
      setExpandedCard(index); // Expand the clicked card
    }
  };

  return (
    <section id="services" className="services">
      <div className="container">
        <h2>🚀 Our Services</h2>
        <p className="section-subtitle">
          We help businesses grow with powerful client acquisition solutions and modern digital presence
        </p>
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              isExpanded={expandedCard === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;