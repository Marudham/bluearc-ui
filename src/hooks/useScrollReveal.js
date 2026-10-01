import { useEffect } from 'react';

// Watches every .reveal element currently in the DOM and adds
// .is-visible the first time it crosses into view, letting App.css's
// .reveal rule fade/slide it in. Call once per page-level component
// (PageLayout, ProductPage, landing pages) after mount — re-running on
// every render isn't needed since each page's own .reveal elements are
// already present on mount (this is a static, content-driven site, not
// a list that grows after initial render).
const useScrollReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default useScrollReveal;
