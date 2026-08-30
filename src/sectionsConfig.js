// Ordered list of top-level page sections. Each entry is both a nav/scroll target
// (id) and a real indexable route (path) — see src/hooks/useSectionRouting.js.
// Keep title/description in sync with scripts/generate-static-routes.js, which
// bakes the same values into static build/<path>/index.html files for crawlers
// that don't execute JS.
//
// "Voice of Our Clients" (id: clients) was intentionally removed from here per
// explicit request — re-add an entry with path: '/clients', id: 'clients' to
// restore it.
const SECTIONS = [
  {
    path: '/',
    id: 'home',
    label: 'Home',
    title: 'BlueArk - Lead Generation, B2B Data & Web Development Services',
    description:
      'BlueArk - Professional Lead Generation, B2B Data Services, Web Development & Data Analysis. Grow your business with quality leads and modern web solutions.',
  },
  {
    path: '/services',
    id: 'services',
    label: 'Services',
    title: 'Our Services - Lead Generation, B2B Data, Meta Ads & More | BlueArk',
    description:
      "Explore BlueArk's services: lead generation, B2B data, Meta Ads, demand generation, web development, and BI reporting built to grow your business.",
  },
  {
    path: '/why-us',
    id: 'why-us',
    label: 'Why Us?',
    title: 'Why Work With BlueArk? - Verified Data, Modern Web Solutions',
    description:
      'See why businesses choose BlueArk: 100% verified B2B data, client-acquisition focus, modern scalable web solutions, and dedicated support.',
  },
  {
    path: '/contact',
    id: 'contact',
    label: 'Contact',
    title: 'Contact BlueArk - Get Your Free Consultation',
    description:
      'Get in touch with BlueArk to discuss lead generation, B2B data, web development, or BI reporting for your business.',
  },
];

export default SECTIONS;
