// Fade/slide in any [data-reveal] element once it scrolls into view.
export function initScrollReveal() {
  const reveals = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -8% 0px' }
  );
  reveals.forEach((el) => observer.observe(el));
}
