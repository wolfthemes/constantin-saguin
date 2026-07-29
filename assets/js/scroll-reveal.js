// Fade/slide in any [data-reveal] element once it scrolls into view.
export function initScrollReveal() {
	const heroReveals = document.querySelectorAll(
		'#hero .hero-cta[data-reveal], #hero .hero-stack[data-reveal]'
	);

	// These elements are above the fold, so reveal them on page load instead of
	// waiting for an intersection event that may not fire until the user scrolls.
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			heroReveals.forEach((el) => el.classList.add('visible'));
		});
	});

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
