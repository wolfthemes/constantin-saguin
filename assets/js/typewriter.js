// Typing effect for hero subhead — measure the finished text first so the
// reserved space matches exactly and nothing shifts while it types.
export function initTypewriter() {
  const heroType = document.getElementById('hero-type');
  if (!heroType) return;

  const heroText = "I design and scale Awwwards-nominated themes, custom plugins, and enterprise WooCommerce solutions. Creator of WolfThemes, trusted by 36,000+ customers with $2M+ in lifetime sales.";
  const linkLabel = "Awwwards-nominated";
  const linkStart = heroText.indexOf(linkLabel);
  const linkEnd = linkStart + linkLabel.length;
  const linkHref = "https://www.awwwards.com/wolfthemes/";

  // Reveal the link as one unit at linkEnd so the anchor tag never gets
  // typed open without its closing tag.
  function renderSlice(i) {
    const slice = heroText.slice(0, i);
    if (i <= linkStart) return slice;
    const before = slice.slice(0, linkStart);
    const linked = slice.slice(linkStart, Math.min(i, linkEnd));
    const after = i > linkEnd ? slice.slice(linkEnd) : '';
    return `${before}<a class="hero-awwwards-link" href="${linkHref}" target="_blank">${linked}</a>${after}`;
  }

  heroType.textContent = heroText;
  heroType.style.minHeight = heroType.offsetHeight + 'px';
  heroType.textContent = '';

  let i = 0;
  (function tick() {
    heroType.innerHTML = renderSlice(i) + '<span class="cursor">|</span>';
    if (i <= heroText.length) {
      i += 3;
      requestAnimationFrame(() => setTimeout(tick, 8));
    }
  })();
}
