import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SECTIONS from '../sectionsConfig';

// Height of the fixed header, so a scrolled-to section isn't hidden behind it.
const HEADER_OFFSET = 80;

// Keeps the URL and each section's <title>/meta description in sync with
// scrolling, while preserving the site's single continuous-scroll page feel:
// - visiting/clicking a section's path scrolls the page to that section
// - scrolling the page updates the URL (via replace, no extra history entries)
// - each section gets its own document title/description for indexing
const useSectionRouting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // GitHub Pages (and this app's own directory-index routes) may serve a
    // path with a trailing slash (e.g. /services/); match it the same as
    // /services rather than falling through to the home section.
    const normalizedPath =
      location.pathname !== '/' && location.pathname.endsWith('/')
        ? location.pathname.slice(0, -1)
        : location.pathname;
    const section =
      SECTIONS.find((s) => s.path === normalizedPath) || SECTIONS[0];

    document.title = section.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', section.description);
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute(
        'href',
        `https://blueark.co.in${section.path === '/' ? '' : section.path}`
      );
    }

    const el = document.getElementById(section.id);
    if (el) {
      isProgrammaticScroll.current = true;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });

      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 700);
    }

    return () => clearTimeout(scrollTimeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!mostVisible) return;

        const section = SECTIONS.find((s) => s.id === mostVisible.target.id);
        if (section && section.path !== location.pathname) {
          navigate(section.path, { replace: true });
        }
      },
      { threshold: [0.4], rootMargin: `-${HEADER_OFFSET}px 0px -40% 0px` }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, navigate]);
};

export default useSectionRouting;
