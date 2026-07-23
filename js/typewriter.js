// Typing effect for hero subhead — measure the finished text first so the
// reserved space matches exactly and nothing shifts while it types.
export function initTypewriter() {
  const heroType = document.getElementById('hero-type');
  if (!heroType) return;

  const heroText = "I design and scale premium themes, plugins, and complex WooCommerce solutions. Creator of WolfThemes: products used by 36,000+ customers and generating $2M+ in revenue.";
  heroType.textContent = heroText;
  heroType.style.minHeight = heroType.offsetHeight + 'px';
  heroType.textContent = '';

  let i = 0;
  (function tick() {
    heroType.textContent = heroText.slice(0, i);
    heroType.innerHTML += '<span class="cursor">|</span>';
    if (i <= heroText.length) {
      i += 3;
      requestAnimationFrame(() => setTimeout(tick, 8));
    }
  })();
}
