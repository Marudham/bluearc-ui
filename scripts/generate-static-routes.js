// Runs after `react-scripts build` (see package.json "postbuild").
// GitHub Pages has no server-side rewrites, so a direct hit / crawler request
// for e.g. /services needs a real build/services/index.html file to get a 200
// response instead of a 404 (a 404-status SPA-fallback trick would work for
// users but tells crawlers the page doesn't exist, defeating the point of
// giving each section its own indexable path).
//
// This copies build/index.html once per route below, swapping in that route's
// title/description/canonical/og tags so crawlers see distinct content even
// without executing JS. React Router then takes over client-side and the
// values here are re-applied by src/hooks/useSectionRouting.js — keep both in
// sync with src/sectionsConfig.js.
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');

const ROUTES = [
  {
    dir: 'services',
    title: 'Our Services - Lead Generation, B2B Data, Meta Ads & More | BlueArk',
    description:
      "Explore BlueArk's services: lead generation, B2B data, Meta Ads, demand generation, web development, and BI reporting built to grow your business.",
  },
  {
    dir: 'why-us',
    title: 'Why Work With BlueArk? - Verified Data, Modern Web Solutions',
    description:
      'See why businesses choose BlueArk: 100% verified B2B data, client-acquisition focus, modern scalable web solutions, and dedicated support.',
  },
  {
    dir: 'contact',
    title: 'Contact BlueArk - Get Your Free Consultation',
    description:
      'Get in touch with BlueArk to discuss lead generation, B2B data, web development, or BI reporting for your business.',
  },
];

if (!fs.existsSync(indexPath)) {
  console.error('[generate-static-routes] build/index.html not found, skipping.');
  process.exit(0);
}

const baseHtml = fs.readFileSync(indexPath, 'utf8');

for (const route of ROUTES) {
  const canonicalUrl = `https://blueark.co.in/${route.dir}`;

  let html = baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`)
    .replace(
      /(<meta name="description" content=")(.*?)(")/,
      `$1${route.description}$3`
    )
    .replace(
      /(<meta property="og:title" content=")(.*?)(")/,
      `$1${route.title}$3`
    )
    .replace(
      /(<meta property="og:description" content=")(.*?)(")/,
      `$1${route.description}$3`
    )
    .replace(
      /(<meta property="og:url" content=")(.*?)(")/,
      `$1${canonicalUrl}$3`
    )
    .replace(
      /(<meta name="twitter:title" content=")(.*?)(")/,
      `$1${route.title}$3`
    )
    .replace(
      /(<meta name="twitter:description" content=")(.*?)(")/,
      `$1${route.description}$3`
    )
    .replace(
      /(<link rel="canonical" href=")(.*?)(")/,
      `$1${canonicalUrl}$3`
    );

  const outDir = path.join(buildDir, route.dir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log(`[generate-static-routes] wrote build/${route.dir}/index.html`);
}
