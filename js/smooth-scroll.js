import Lenis from 'https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.mjs';

// Lenis takes over the rAF-driven smooth scroll; native `scroll-behavior:
// smooth` is switched off in CSS (html.lenis) to avoid the two fighting.
export function initSmoothScroll() {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Route in-page anchor links (nav, hero CTAs) through Lenis instead of
  // native jump-scrolling, so they get the same easing as wheel/touch input.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target);
    });
  });

  return lenis;
}
