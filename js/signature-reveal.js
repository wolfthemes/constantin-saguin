// Signature draw-on-scroll — vanilla stroke-dashoffset version of a GSAP
// DrawSVG effect, since this project ships with no build step and
// DrawSVGPlugin isn't available without a paid GreenSock license.
export function initSignatureReveal() {
  const svg = document.querySelector('.wolf-signature svg');
  if (!svg) return;

  const paths = Array.from(svg.querySelectorAll('path'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TOTAL_DURATION = 2000; // ms for the full signature

  const lengths = paths.map((p) => p.getTotalLength() || 1);
  const totalLength = lengths.reduce((sum, l) => sum + l, 0);

  paths.forEach((path, i) => {
    path.style.strokeDasharray = lengths[i];
    path.style.strokeDashoffset = reducedMotion ? 0 : lengths[i];
  });

  if (reducedMotion) return;

  const drawSignature = () => {
    const start = performance.now();
    const offsets = lengths.map((l) => (l / totalLength) * TOTAL_DURATION);
    const step = (now) => {
      const elapsed = now - start;
      paths.forEach((path, i) => {
        const pathStart = offsets.slice(0, i).reduce((s, d) => s + d, 0);
        const progress = Math.min(Math.max((elapsed - pathStart) / offsets[i], 0), 1);
        path.style.strokeDashoffset = lengths[i] * (1 - progress);
      });
      if (elapsed < TOTAL_DURATION) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          drawSignature();
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -20% 0px' }
  );
  observer.observe(svg);
}
