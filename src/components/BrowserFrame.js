import React from 'react';
import '../styles/components/BrowserFrame.css';

// A lightweight "browser window" chrome around a product screenshot —
// reused by the ArkMail product page and the ArkMail landing page so a
// static PNG reads as "a real, live app" rather than a bare image.
const BrowserFrame = ({ url, src, alt, className = '' }) => {
  return (
    <div className={`browser-frame ${className}`}>
      <div className="browser-frame-bar">
        <span className="browser-frame-dot browser-frame-dot-red"></span>
        <span className="browser-frame-dot browser-frame-dot-yellow"></span>
        <span className="browser-frame-dot browser-frame-dot-green"></span>
        {url && <span className="browser-frame-url">{url}</span>}
      </div>
      <img src={src} alt={alt} className="browser-frame-image" loading="lazy" />
    </div>
  );
};

export default BrowserFrame;
