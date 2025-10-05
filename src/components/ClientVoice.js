import React from 'react';
import '../styles/components/ClientVoice.css';

const ClientVoice = () => {
  const clients = [
    {
      id: 1,
      name: "Rajesh Sharma",
      title: "CEO",
      company: "FlowConnect",
      image: `${process.env.PUBLIC_URL}/flow-connect.jpeg`,
      quote: `"We were struggling to find accurate B2B contacts for our sales team, and most data providers gave us outdated information. After partnering with Bluearc, we received a highly targeted database with verified emails and direct phone numbers. Our outreach campaigns finally started converting, and we closed 3 new clients in the first month itself. The on-demand delivery from Bluearc saved us a lot of time too. Highly recommend if you want reliable data that actually works."`
    },
    {
      id: 2,
      name: "Priya Singh",
      title: "Entrepreneur",
      company: "Loop Hook",
      image: `${process.env.PUBLIC_URL}/loop-hook.jpeg`,
      quote: `"Our business had plenty of data but no clarity on what it actually meant. Bluearc helped us build custom BI dashboards in Tableau that track our KPIs in real time. We can now monitor sales performance, spot trends early, and make faster decisions. Their forecasting insights also helped us plan the next quarter more effectively. With Bluearc’s support, we finally understand our numbers, and that has directly improved our growth strategy."`
    }
  ];

  return (
    <section id="clients" className="clients-section">
      <div className="container">
        <h2 className="section-title">Voice of Our Clients</h2>
        <div className="clients-grid">
          {clients.map(client => (
            <div key={client.id} className="client-card">
              <div className="client-header">
                <img 
                  src={client.image} 
                  alt={client.name} 
                  className="client-image"
                />
                <div className="client-info">
                  <h3 className="client-name">{client.name}</h3>
                  <p className="client-title">{client.title}</p>
                  <p className="client-company">{client.company}</p>
                </div>
              </div>
              <div className="client-quote">
                {/* <span className="quote-icon">"</span> */}
                <p>{client.quote}</p>
                {/* <span className="quote-icon">"</span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientVoice;