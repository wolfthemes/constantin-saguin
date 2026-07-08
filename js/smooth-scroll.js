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

  // Keep the CSS scroll-margin-top (used for keyboard/fragment navigation)
  // and the Lenis scroll offset (used for click-driven scrollTo) in sync
  // with the sticky nav's real height instead of a guessed constant.
  const nav = document.querySelector('nav');
  const setNavHeight = () => {
    document.documentElement.style.setProperty('--nav-height', `${nav.offsetHeight}px`);
  };
  if (nav) {
    setNavHeight();
    window.addEventListener('resize', setNavHeight);
  }

  // Route in-page anchor links (nav, hero CTAs) through Lenis instead of
  // native jump-scrolling, so they get the same easing as wheel/touch input.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: nav ? -nav.offsetHeight : 0 });
    });
  });

  return lenis;
}
