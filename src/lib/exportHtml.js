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
const imageElementToDataUrl = async (img) => {
  const src = img.getAttribute('src');
  if (!src || src.startsWith('data:')) return;
  const absoluteUrl = new URL(src, window.location.origin).href;
  const response = await fetch(absoluteUrl);
  if (!response.ok) throw new Error(`Failed to fetch ${absoluteUrl}`);
  const blob = await response.blob();
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
  img.setAttribute('src', dataUrl);
};

const buildStandaloneDocument = async (element, pageTitle) => {
  // Clone rather than mutate the live, on-screen element — swapping its
  // images to (much larger) data URIs in place would be a visible,
  // pointless re-render of the real page the whole time this runs.
  const clone = element.cloneNode(true);
  const images = Array.from(clone.querySelectorAll('img'));
  await Promise.all(
    images.map((img) =>
      imageElementToDataUrl(img).catch(() => {
        // Best-effort: if a fetch fails (offline, image moved), leave the
        // original src rather than breaking the whole export over one image.
      })
    )
  );

  const markup = clone.outerHTML;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${pageTitle}</title>
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
