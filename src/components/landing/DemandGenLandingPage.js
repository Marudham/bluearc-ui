import React from 'react';
import CampaignLandingPage from './CampaignLandingPage';

// BlueArk's own demand-gen/lead-gen campaign asset — per the team's ask
// (WhatsApp, 2026-10-01): a generic, industry-standard landing page with
// "no cost for first few campaigns" as the headline hook, sharable as a
// standalone HTML file for campaign runs via the Copy/Download buttons.
const DemandGenLandingPage = () => {
  return (
    <CampaignLandingPage
      pageId="demand-gen-landing"
      pageTitle="Free First Campaigns — BlueArk Demand Generation"
      metaDescription="Launch your first B2B demand-gen campaign with BlueArk at no cost. Verified data, multi-channel outreach, and real pipeline reporting."
      canonicalPath="/landing/demand-generation"
      kicker="No Cost For Your First Few Campaigns"
      brandName="BlueArk"
      brandLogo={`${process.env.PUBLIC_URL}/blueark.jpeg`}
      headline="Fill Your Pipeline Without Spending a Rupee on Your First Campaigns"
      subheadline="BlueArk runs your first demand-gen and lead-gen campaigns at no cost — verified B2B data, multi-channel outreach, and real reporting, so you can see the pipeline before you commit a budget."
      bullets={[
        'No cost for your first few campaigns',
        'Verified C-level & decision-maker contacts',
        'Email, LinkedIn & Meta Ads outreach',
        'Lead nurturing & MQL generation',
        'Campaign performance tracking & optimization',
        'A dedicated campaign strategist, not a ticket queue',
      ]}
      ctaText="Book a Free Strategy Call"
      ctaHref="https://blueark.co.in/contact"
      ctaNote="30-minute call. No obligation, no slide deck — just your pipeline goals."
      footerNote="BlueArk — Lead Generation, B2B Data & Demand Generation. contact@blueark.co.in"
    />
  );
};

export default DemandGenLandingPage;
