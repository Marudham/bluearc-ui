import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ParticlesBackground from '../ParticlesBackground';
import BrowserFrame from '../BrowserFrame';
import useScrollReveal from '../../hooks/useScrollReveal';
import '../../styles/components/ProductPage.css';

const ARKMAIL_URL = 'https://arkmail.blueark.co.in';

const FEATURES = [
  { icon: 'fas fa-paper-plane', title: 'Quick Send', body: 'A fast, single-recipient send with HTML/plain-text, personalization, and scheduling.' },
  { icon: 'fas fa-route', title: 'Campaign Studio', body: 'Multi-step sequences, content variants, pacing controls, and automatic follow-up logic.' },
  { icon: 'fas fa-at', title: 'Smart Aliases', body: 'One address that resolves to different real inboxes — useful for team or round-robin sending.' },
  { icon: 'fas fa-users', title: 'Prospect Lists & Lead Finder', body: 'Organize who you’re reaching out to, and search your own saved contacts to build new lists fast.' },
  { icon: 'fas fa-window-restore', title: 'Landing Pages', body: 'A real block builder for a page you can link from a campaign, with its own conversion tracking.' },
  { icon: 'fas fa-chart-line', title: 'Tracker & Dashboard', body: 'Every send, open, click, reply, and bounce, in one place — per campaign or across your whole workspace.' },
  { icon: 'fas fa-bell', title: 'Rule Studio', body: 'Real alerts — in-app, Slack, Telegram — when a milestone hits or a health safeguard trips.' },
  { icon: 'fas fa-diagram-project', title: 'CRM', body: 'A real pipeline on top of your contacts — deals, stages, and sync to HubSpot or Salesforce.' },
];

const GALLERY = [
  {
    title: 'Campaign Studio',
    body: 'Build a multi-step sequence, enroll prospects, and watch real sends, opens, and replies roll in.',
    url: 'arkmail.blueark.co.in/campaigns',
    src: 'screenshot-campaigns.png',
    alt: 'ArkMail Campaigns list screen',
  },
  {
    title: 'Tracker',
    body: 'A high-density view of every send — recipient, mailbox, status — updated as it happens.',
    url: 'arkmail.blueark.co.in/tracker',
    src: 'screenshot-tracker.png',
    alt: 'ArkMail Tracker screen showing recent email activity',
  },
  {
    title: 'Landing Pages',
    body: 'A real block builder with Raw HTML or visual editing, hosted on your own ArkMail URL.',
    url: 'arkmail.blueark.co.in/pages',
    src: 'screenshot-landing-pages.png',
    alt: 'ArkMail Landing Page builder screen',
  },
];

const STEPS = [
  { title: 'Create your account', body: 'Sign up free — no setup wizard, you land straight in your own workspace.' },
  { title: 'Connect a mailbox', body: 'Any real SMTP/IMAP account works. ArkMail checks SPF/DKIM/DMARC automatically before you send.' },
  { title: 'Send your first email', body: 'Quick Send confirms everything’s wired up correctly before you build anything bigger.' },
  { title: 'Build a campaign', body: 'A real multi-step sequence with delays, variants, and merge-tag personalization.' },
  { title: 'Track what happens', body: 'Real opens, clicks, replies, and bounces as they happen — not estimates.' },
];

const ProductPage = () => {
  useScrollReveal();

  useEffect(() => {
    // This is a standalone route outside the home page's scroll-section
    // system (see sectionsConfig.js/useSectionRouting.js) — React Router
    // doesn't reset scroll position on client-side navigation, so without
    // this, arriving here from partway down another page lands mid-scroll
    // instead of at the top of this page's own hero.
    window.scrollTo(0, 0);

    document.title = 'ArkMail by BlueArk — Email Outreach & Campaign Tracking, Free in Beta';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'ArkMail is BlueArk’s real email outreach platform — send campaigns, track opens/clicks/replies, and build landing pages. Free and unlimited during Beta.'
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://blueark.co.in/product');
  }, []);

  return (
    <div className="product-page">
      <ParticlesBackground />
      <Header />

      <main>
        <section className="product-hero">
          <div className="container product-hero-inner">
            <img
              src={`${process.env.PUBLIC_URL}/arkmail/arkmail-logo.png`}
              alt="ArkMail"
              className="product-hero-logo reveal"
            />
            <p className="product-eyebrow reveal" style={{ '--reveal-delay': '70ms' }}>
              <i className="fas fa-rocket"></i> Beta &middot; Unlimited &middot; Limited Time
            </p>
            <h1 className="reveal" style={{ '--reveal-delay': '140ms' }}>
              A real email outreach platform, built by BlueArk
            </h1>
            <p className="product-hero-subtitle reveal" style={{ '--reveal-delay': '210ms' }}>
              Connect your own mailbox, send campaigns with real tracking, and see exactly what
              happens after you hit send — opens, clicks, replies, and bounces, not estimates.
            </p>
            <div className="product-hero-ctas reveal" style={{ '--reveal-delay': '280ms' }}>
              <a href={`${ARKMAIL_URL}/signup`} className="cta-button" target="_blank" rel="noopener noreferrer">
                Start free during Beta
              </a>
              <a href={`${ARKMAIL_URL}/login`} className="cta-button cta-button-ghost" target="_blank" rel="noopener noreferrer">
                Log in <i className="fas fa-arrow-right"></i>
              </a>
            </div>
            <p className="product-hero-note reveal" style={{ '--reveal-delay': '340ms' }}>
              No credit card required — every workspace is unlimited for the full Beta period.
            </p>
          </div>
        </section>

        <section className="product-section">
          <div className="container">
            <div className="product-screenshot reveal">
              <BrowserFrame
                url="arkmail.blueark.co.in/quick-send"
                src={`${process.env.PUBLIC_URL}/arkmail/screenshot-quick-send.png`}
                alt="ArkMail Quick Send screen, showing a real compose window with a spam-score check and personalize menu"
              />
            </div>
          </div>
        </section>

        <section className="product-section">
          <div className="container">
            <p className="section-eyebrow reveal">See It In Action</p>
            <h2 className="reveal">More than a compose window</h2>
            <div className="product-gallery">
              {GALLERY.map((shot, index) => (
                <div
                  key={shot.title}
                  className="product-gallery-item reveal"
                  style={{ '--reveal-delay': `${index * 90}ms` }}
                >
                  <BrowserFrame
                    url={shot.url}
                    src={`${process.env.PUBLIC_URL}/arkmail/${shot.src}`}
                    alt={shot.alt}
                  />
                  <h3>{shot.title}</h3>
                  <p>{shot.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="product-section product-section-muted">
          <div className="container">
            <p className="section-eyebrow reveal">What You Can Do</p>
            <h2 className="reveal">Everything a cold-outreach team actually needs</h2>
            <div className="product-feature-grid">
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.title}
                  className="product-feature-card reveal"
                  style={{ '--reveal-delay': `${Math.min(index, 5) * 70}ms` }}
                >
                  <div className="product-feature-icon">
                    <i className={feature.icon}></i>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="product-section">
          <div className="container">
            <p className="section-eyebrow reveal">Getting Started</p>
            <h2 className="reveal">Live in five steps</h2>
            <ol className="product-steps">
              {STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="product-step reveal"
                  style={{ '--reveal-delay': `${Math.min(index, 5) * 80}ms` }}
                >
                  <span className="product-step-number">{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="product-cta-band reveal">
          <div className="container product-cta-band-inner">
            <h2>Beta is free. Beta is unlimited. Beta won’t last.</h2>
            <p>Every workspace created during Beta gets full access with no sending caps — lock it in now.</p>
            <a href={`${ARKMAIL_URL}/signup`} className="cta-button" target="_blank" rel="noopener noreferrer">
              Create your free account
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
