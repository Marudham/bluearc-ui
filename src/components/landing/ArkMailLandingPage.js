import React from 'react';
import CampaignLandingPage from './CampaignLandingPage';

// ArkMail-branded campaign asset — the "if possible for ArkMail" half of
// the team's demand-gen landing-page ask, built on blueark.co.in (not
// inside ArkMail itself, which already has its own in-app Landing Page
// builder for a tenant's own campaigns — see docs/am21-deliverables).
// This is BlueArk promoting its own product, so it belongs on the parent
// marketing site, exportable the same way as the BlueArk version.
const ArkMailLandingPage = () => {
  return (
    <CampaignLandingPage
      pageId="arkmail-landing"
      pageTitle="ArkMail Beta — Free, Unlimited Email Outreach for a Limited Time"
      metaDescription="ArkMail is live in Beta — free and unlimited for a limited time. Real campaign sequences, deliverability tracking, and landing pages, built by BlueArk."
      canonicalPath="/landing/arkmail"
      kicker="Beta · Unlimited · Limited Time"
      brandName="ArkMail"
      brandLogo={`${process.env.PUBLIC_URL}/arkmail/arkmail-logo.png`}
      headline="Run Real Cold-Email Campaigns — Free and Unlimited During Beta"
      subheadline="ArkMail is a real email outreach platform from BlueArk: connect your own mailbox, send multi-step sequences, and track every open, click, reply, and bounce. No caps while Beta lasts."
      bullets={[
        'Unlimited sends during the Beta period',
        'Multi-step campaign sequences with content variants',
        'Real deliverability tracking — opens, clicks, replies, bounces',
        'A drag-free landing-page builder with conversion tracking',
        'Smart Aliases for team / round-robin sending',
        'No credit card required to start',
      ]}
      screenshot={{
        src: `${process.env.PUBLIC_URL}/arkmail/screenshot-quick-send.png`,
        alt: 'ArkMail Quick Send screen showing a real compose window with a spam-score check',
      }}
      ctaText="Create Your Free ArkMail Account"
      ctaHref="https://arkmail.blueark.co.in/signup"
      ctaNote="Beta is unlimited for every workspace — for a limited time only."
      footerNote="ArkMail by BlueArk — contact@blueark.co.in"
    />
  );
};

export default ArkMailLandingPage;
