import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { copyLandingPageHtml, downloadLandingPageHtml } from '../../lib/exportHtml';
import '../../styles/components/CampaignLandingPage.css';

// Shared template for a focused, single-CTA campaign/demand-gen landing
// page — deliberately NOT wrapped in the main site Header/nav (a real
// campaign asset keeps the visitor's attention on one conversion action,
// not site navigation). Two real instances use this: DemandGenLandingPage
// (BlueArk's own outreach offer) and ArkMailLandingPage (the ArkMail beta
// promo), per Marudham's explicit ask to build both.
//
// IMPORTANT: everything inside #export-root — including its own <style>
// tag — is exactly what "Copy HTML" / "Download .html" hand over (see
// src/lib/exportHtml.js). It uses literal hex colors and a scoped
// `cl-` class prefix (never the app's CSS variables/App.css classes) so
// the exported file renders correctly when pasted somewhere with no
// access to this app's stylesheet — an ad platform's landing-page field,
// an email builder, or a teammate's own static page.
const CampaignLandingPage = ({
  pageId,
  pageTitle,
  metaDescription,
  canonicalPath,
  kicker,
  brandName,
  brandLogo,
  headline,
  subheadline,
  bullets,
  screenshot,
  ctaText,
  ctaHref,
  ctaNote,
  footerNote,
}) => {
  const [exportStatus, setExportStatus] = useState(null);

  useEffect(() => {
    // Standalone route outside the home page's scroll-section system —
    // React Router doesn't reset scroll on client-side navigation (see the
    // identical note in ProductPage.js).
    window.scrollTo(0, 0);

    document.title = pageTitle;
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) metaDescriptionTag.setAttribute('content', metaDescription);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://blueark.co.in${canonicalPath}`);
  }, [pageTitle, metaDescription, canonicalPath]);

  // Both exports now inline the logo/screenshot images as base64 (see
  // exportHtml.js) so the HTML is genuinely self-contained — that means a
  // real fetch+encode step per image, not an instant string op, so show a
  // "preparing" state rather than leaving the button looking unresponsive.
  const handleCopy = async () => {
    setExportStatus({ type: 'pending', message: 'Preparing…' });
    const result = await copyLandingPageHtml(pageId, pageTitle);
    setExportStatus(result.ok ? { type: 'success', message: 'Copied — paste it into your campaign tool.' } : { type: 'error', message: result.error });
    setTimeout(() => setExportStatus(null), 4000);
  };

  const handleDownload = async () => {
    setExportStatus({ type: 'pending', message: 'Preparing…' });
    const result = await downloadLandingPageHtml(pageId, pageTitle, `${pageId}.html`);
    setExportStatus(result.ok ? { type: 'success', message: 'Downloaded.' } : { type: 'error', message: result.error });
    setTimeout(() => setExportStatus(null), 4000);
  };

  return (
    <div className="landing-asset-shell">
      <div className="landing-asset-toolbar">
        <Link to="/" className="landing-asset-back">
          <i className="fas fa-arrow-left"></i> BlueArk site
        </Link>
        <div className="landing-asset-toolbar-actions">
          {exportStatus && (
            <span className={`landing-asset-status landing-asset-status-${exportStatus.type}`}>
              {exportStatus.message}
            </span>
          )}
          <button type="button" className="landing-asset-toolbar-btn" onClick={handleCopy}>
            <i className="fas fa-copy"></i> Copy HTML
          </button>
          <button type="button" className="landing-asset-toolbar-btn" onClick={handleDownload}>
            <i className="fas fa-download"></i> Download .html
          </button>
        </div>
      </div>

      {/* ===== Everything below this line is the exportable campaign asset ===== */}
      <div id={pageId} className="cl-landing">
        <style>{`
          .cl-landing { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: #f5f7fb; color: #101828; }
          .cl-landing * { box-sizing: border-box; }
          .cl-top { display: flex; align-items: center; gap: 0.6rem; padding: 1.5rem 1.5rem 0; max-width: 960px; margin: 0 auto; }
          .cl-top img { height: 28px; width: auto; }
          .cl-top span { font-weight: 800; font-size: 1.05rem; color: #0a2a66; }
          .cl-hero { max-width: 760px; margin: 0 auto; padding: 2.5rem 1.5rem 2rem; text-align: center; }
          .cl-kicker { display: inline-block; background: rgba(13,148,136,0.12); color: #0f766e; font-weight: 700; font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.45rem 1rem; border-radius: 999px; margin-bottom: 1.25rem; }
          .cl-hero h1 { font-size: 2.3rem; line-height: 1.2; font-weight: 800; margin: 0 0 1rem; color: #0a2a66; }
          .cl-hero p { font-size: 1.08rem; line-height: 1.6; color: #475467; margin: 0 auto; max-width: 560px; }
          .cl-bullets { max-width: 620px; margin: 2rem auto; padding: 0 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem 1.5rem; list-style: none; }
          .cl-bullets li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.98rem; font-weight: 600; color: #1d2939; text-align: left; }
          .cl-check { flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; background: rgba(16,185,129,0.14); color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 900; margin-top: 2px; }
          .cl-shot { max-width: 760px; margin: 2rem auto; padding: 0 1.5rem; }
          .cl-shot img { width: 100%; border-radius: 16px; border: 1px solid #e4e7ec; box-shadow: 0 20px 45px rgba(16,24,40,0.12); display: block; }
          .cl-cta-wrap { text-align: center; padding: 1rem 1.5rem 3rem; }
          .cl-cta { display: inline-block; background: linear-gradient(135deg,#2dd4bf,#0d9488); color: #052e2b; font-weight: 800; font-size: 1.05rem; padding: 1rem 2.3rem; border-radius: 999px; text-decoration: none; box-shadow: 0 14px 30px rgba(13,148,136,0.3); }
          .cl-cta-note { margin-top: 0.9rem; font-size: 0.85rem; color: #667085; }
          .cl-footer { text-align: center; padding: 1.5rem; border-top: 1px solid #e4e7ec; font-size: 0.82rem; color: #98a2b3; }
          @media (max-width: 560px) {
            .cl-bullets { grid-template-columns: 1fr; }
            .cl-hero h1 { font-size: 1.8rem; }
          }
        `}</style>

        <div className="cl-top">
          <img src={brandLogo} alt={`${brandName} logo`} />
          <span>{brandName}</span>
        </div>

        <div className="cl-hero">
          <span className="cl-kicker">{kicker}</span>
          <h1>{headline}</h1>
          <p>{subheadline}</p>
        </div>

        <ul className="cl-bullets">
          {bullets.map((bullet) => (
            <li key={bullet}>
              <span className="cl-check">&#10003;</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {screenshot && (
          <div className="cl-shot">
            <img src={screenshot.src} alt={screenshot.alt} />
          </div>
        )}

        <div className="cl-cta-wrap">
          <a href={ctaHref} className="cl-cta" target="_blank" rel="noopener noreferrer">{ctaText}</a>
          {ctaNote && <p className="cl-cta-note">{ctaNote}</p>}
        </div>

        <div className="cl-footer">{footerNote}</div>
      </div>
    </div>
  );
};

export default CampaignLandingPage;
