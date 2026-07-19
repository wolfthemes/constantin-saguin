// Typing effect for hero subhead — measure the finished text first so the
// reserved space matches exactly and nothing shifts while it types.
export function initTypewriter() {
  const heroType = document.getElementById('hero-type');
  if (!heroType) return;

  const heroText = "From scaling modern infrastructures to engineering smooth interactive experiences, I build modern WordPress products designed for longevity and performance. Founder of WolfThemes (36,000+ clients). Currently looking to bring my expertise to a world-class remote agency where I can solve complex engineering challenges alongside a top-notch team.";
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
