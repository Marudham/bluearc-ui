// Lets a campaign landing page be copied/downloaded as a single portable
// HTML file — for pasting into an ad platform's landing-page field, an
// email tool, or handing to a teammate running a campaign. This is a
// static site with no backend, so "export" means: read the live, rendered
// export-root element (its markup already carries a <style> tag scoped to
// a unique wrapper class — see CampaignLandingPage.js) and wrap it in a
// minimal standalone <html> document. Never includes the toolbar itself
// (that's a site-authoring affordance, not part of the shareable asset).
//
// The logo/screenshot <img> tags are authored with root-relative src
// values (`/blueark.jpeg`, `/arkmail/...`) via PUBLIC_URL — correct for
// this site's own pages, but meaningless once the markup is pasted
// somewhere else entirely (an ad platform's field, an email builder, a
// locally opened file): a root-relative path there resolves against THAT
// host/filesystem instead and 404s. Fetching each image from wherever this
// page is CURRENTLY being served (dev or production, whichever is live
// right now) and inlining it as a base64 data URI makes the exported file
// genuinely self-contained — it renders correctly immediately, with no
// dependency on this redesign having been deployed yet.
//
// UPDATE (email clients): the base64 approach above renders fine in a
// browser, but this HTML is also pasted into ArkMail campaigns and sent as
// email, and Gmail (a) strips any <style> tag that isn't in <head> and
// (b) refuses `data:` image URIs entirely. Result: unstyled page + broken
// logo in Gmail, while Titan/Outlook/browsers looked fine. So the export is
// now email-safe: images become absolute https URLs on the live site, and
// every CSS rule is inlined onto the elements it matches. Responsive
// @media rules can't be inlined, so those stay in a <style> in <head>
// (which Gmail does honor).
const SITE_ORIGIN = 'https://blueark.co.in';

const toAbsoluteImageUrls = (root) => {
  root.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    if (!src || src.startsWith('data:') || /^https?:\/\//i.test(src)) return;
    img.setAttribute('src', new URL(src, SITE_ORIGIN).href);
  });
};

// Copies every plain CSS rule from the live page's <style> onto the cloned
// elements it matches, in stylesheet order (later rules win, as in a real
// cascade). Returns the @media text separately so it can go in <head>.
const inlineStyles = (liveRoot, clone) => {
  const styleEl = liveRoot.querySelector('style');
  const mediaCss = [];
  if (styleEl && styleEl.sheet) {
    Array.from(styleEl.sheet.cssRules).forEach((rule) => {
      if (rule.type === CSSRule.MEDIA_RULE) {
        mediaCss.push(rule.cssText);
        return;
      }
      if (rule.type !== CSSRule.STYLE_RULE) return;
      const targets = Array.from(clone.querySelectorAll(rule.selectorText));
      if (clone.matches(rule.selectorText)) targets.push(clone);
      targets.forEach((el) => {
        const existing = el.getAttribute('style') || '';
        el.setAttribute('style', `${existing}${existing && !existing.trim().endsWith(';') ? ';' : ''}${rule.style.cssText}`);
      });
    });
  }
  // The <style> tag itself is replaced by inline styles + head media rules.
  const cloneStyle = clone.querySelector('style');
  if (cloneStyle) cloneStyle.remove();
  return mediaCss.join('\n');
};

const buildStandaloneDocument = async (element, pageTitle) => {
  // Clone rather than mutate the live, on-screen element.
  const clone = element.cloneNode(true);
  const mediaCss = inlineStyles(element, clone);
  toAbsoluteImageUrls(clone);

  const markup = clone.outerHTML;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${pageTitle}</title>${mediaCss ? `\n    <style>\n${mediaCss}\n    </style>` : ''}
  </head>
  <body style="margin:0;">
${markup}
  </body>
</html>
`;
};

export const copyLandingPageHtml = async (elementId, pageTitle) => {
  const element = document.getElementById(elementId);
  if (!element) return { ok: false, error: 'Nothing to copy yet.' };

  const html = await buildStandaloneDocument(element, pageTitle);

  try {
    await navigator.clipboard.writeText(html);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Could not access the clipboard — try the Download option instead.' };
  }
};

export const downloadLandingPageHtml = async (elementId, pageTitle, filename) => {
  const element = document.getElementById(elementId);
  if (!element) return { ok: false, error: 'Nothing to download yet.' };

  const html = await buildStandaloneDocument(element, pageTitle);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { ok: true };
};
