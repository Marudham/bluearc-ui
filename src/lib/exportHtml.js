// Lets a campaign landing page be copied/downloaded as a single portable
// HTML file — for pasting into an ArkMail campaign step, an ad platform's
// landing-page field, an email tool, or handing to a teammate.
//
// WHY THIS IS A SEPARATE, TABLE-BASED TEMPLATE (not a copy of the on-screen DOM):
// this HTML is mostly sent as EMAIL, and email clients are far stricter than
// browsers. Two rounds of real-world failures drove this design:
//   1. Gmail strips <style> tags outside <head> and refuses `data:` images.
//   2. Even with CSS inlined, the Gmail mobile app (and Outlook) ignore
//      `display:flex` / `display:grid`, so logo/text and checkmark/text pairs
//      fell apart on phones while looking fine on desktop.
// Tables, inline styles and absolute https image URLs are the one layout
// vocabulary every email client agrees on, so the export is generated from the
// page's content props with exactly that — the web page itself keeps its own
// richer layout in CampaignLandingPage.js.
const SITE_ORIGIN = 'https://blueark.co.in';

const esc = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const absoluteUrl = (src) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  return new URL(src, SITE_ORIGIN).href;
};

export const buildEmailHtml = ({
  pageTitle,
  kicker,
  brandName,
  brandLogo,
  headline,
  subheadline,
  bullets = [],
  screenshot,
  ctaText,
  ctaHref,
  ctaNote,
  footerNote,
}) => {
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif";

  const bulletRows = bullets
    .map(
      (b) => `
            <tr>
              <td width="34" valign="top" style="padding:0 0 14px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="24" height="24">
                  <tr><td width="24" height="24" align="center" valign="middle" bgcolor="#d5eee5" style="width:24px;height:24px;border-radius:12px;font-family:${font};font-size:13px;line-height:24px;font-weight:bold;color:#10b981;">&#10003;</td></tr>
                </table>
              </td>
              <td valign="top" style="padding:2px 0 14px 0;font-family:${font};font-size:16px;line-height:22px;font-weight:600;color:#1d2939;text-align:left;">${esc(b)}</td>
            </tr>`
    )
    .join('');

  const screenshotRow = screenshot
    ? `
          <tr>
            <td align="center" style="padding:8px 24px 24px 24px;">
              <img src="${esc(absoluteUrl(screenshot.src))}" alt="${esc(screenshot.alt)}" width="552" style="display:block;width:100%;max-width:552px;height:auto;border:1px solid #e4e7ec;border-radius:12px;" />
            </td>
          </tr>`
    : '';

  const noteRow = ctaNote
    ? `<p style="margin:14px 0 0 0;font-family:${font};font-size:13px;line-height:19px;color:#667085;">${esc(ctaNote)}</p>`
    : '';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(pageTitle)}</title>
    <style>
      @media only screen and (max-width: 480px) {
        .cl-h1 { font-size: 26px !important; line-height: 32px !important; }
        .cl-pad { padding-left: 18px !important; padding-right: 18px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f7fb;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f7fb" style="background-color:#f5f7fb;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

            <tr>
              <td class="cl-pad" style="padding:0 24px 8px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="middle" style="padding:0 10px 0 0;"><img src="${esc(absoluteUrl(brandLogo))}" alt="${esc(brandName)}" height="32" style="display:block;height:32px;width:auto;border:0;" /></td>
                    <td valign="middle" style="font-family:${font};font-size:17px;line-height:32px;font-weight:800;color:#0a2a66;">${esc(brandName)}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="cl-pad" align="center" style="padding:28px 24px 8px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                  <tr><td bgcolor="#d9ebed" style="background-color:#d9ebed;border-radius:999px;padding:8px 16px;font-family:${font};font-size:12px;line-height:16px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#0f766e;">${esc(kicker)}</td></tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="cl-pad" align="center" style="padding:16px 24px 12px 24px;">
                <h1 class="cl-h1" style="margin:0;font-family:${font};font-size:34px;line-height:41px;font-weight:800;color:#0a2a66;">${esc(headline)}</h1>
              </td>
            </tr>

            <tr>
              <td class="cl-pad" align="center" style="padding:0 24px 24px 24px;">
                <p style="margin:0;font-family:${font};font-size:17px;line-height:27px;color:#475467;">${esc(subheadline)}</p>
              </td>
            </tr>

            <tr>
              <td class="cl-pad" align="center" style="padding:0 24px 12px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:100%;">${bulletRows}
                </table>
              </td>
            </tr>
${screenshotRow}
            <tr>
              <td class="cl-pad" align="center" style="padding:12px 24px 36px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                  <tr><td align="center" bgcolor="#14b8a6" style="background-color:#14b8a6;background-image:linear-gradient(135deg,#2dd4bf,#0d9488);border-radius:999px;"><a href="${esc(ctaHref)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:16px 34px;font-family:${font};font-size:16px;line-height:20px;font-weight:800;color:#052e2b;text-decoration:none;border-radius:999px;">${esc(ctaText)}</a></td></tr>
                </table>
                ${noteRow}
              </td>
            </tr>

            <tr>
              <td class="cl-pad" align="center" style="padding:20px 24px 0 24px;border-top:1px solid #e4e7ec;font-family:${font};font-size:12px;line-height:18px;color:#98a2b3;">${esc(footerNote)}</td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

export const copyLandingPageHtml = async (content) => {
  const html = buildEmailHtml(content);
  try {
    await navigator.clipboard.writeText(html);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Could not access the clipboard — try the Download option instead.' };
  }
};

export const downloadLandingPageHtml = async (content, filename) => {
  const html = buildEmailHtml(content);
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
