// Count-up animation for the About section stats, once each scrolls into view.
export function initStatCounters() {
  const counters = document.querySelectorAll('.stat-num');

  const countUp = (el) => {
    const raw = el.dataset.count;
    const target = parseFloat(raw);
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = target * (1 - Math.pow(1 - progress, 3));
      el.textContent = value.toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          countUp(e.target);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => observer.observe(el));
}
