import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import '../../styles/components/CampaignAssetsIndex.css';

// A small internal directory for the standalone /landing/* campaign assets —
// they're deliberately NOT in the main site nav (a focused single-CTA page
// shouldn't advertise itself in global navigation), but that made them easy
// to lose track of entirely, so this page exists purely so the team always
// has one place to find and open each one.
const ASSETS = [
  {
    title: 'BlueArk — Free First Campaigns',
    description: 'Demand-gen / lead-gen offer: no cost for your first few campaigns. For BlueArk’s own outreach.',
    href: '/landing/demand-generation',
  },
  {
    title: 'ArkMail — Beta, Unlimited, Limited Time',
    description: 'ArkMail product promo: free and unlimited sends during Beta. For promoting the ArkMail product.',
    href: '/landing/arkmail',
  },
];

const CampaignAssetsIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Campaign Assets — BlueArk (Internal)';
  }, []);

  return (
    <div className="assets-index-page">
      <Header />
      <main className="assets-index-main">
        <div className="container">
          <p className="section-eyebrow">Internal</p>
          <h1>Campaign Assets</h1>
          <p className="assets-index-intro">
            Standalone landing pages built for sharing directly in campaign runs (ad platforms, email
            tools) — each has its own Copy HTML / Download .html export. Not linked from the main
            site nav on purpose.
          </p>

          <div className="assets-index-list">
            {ASSETS.map((asset) => (
              <Link key={asset.href} to={asset.href} className="assets-index-card">
                <div>
                  <h2>{asset.title}</h2>
                  <p>{asset.description}</p>
                </div>
                <span className="assets-index-open">
                  Open <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CampaignAssetsIndex;
