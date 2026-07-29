// Sets each gallery marquee row's animation-duration from its actual track width,
// so speed stays constant (in px/s) however many images a row holds. Rows get a
// slightly different px/s so the three lanes don't feel mechanically identical.
const BASE_PX_PER_SEC = 11;
const ROW_SPEED_FACTORS = [1, 0.8, 1.1];

export function initMarqueeSpeed() {
  const rows = document.querySelectorAll('.marquee-row');

  const setDurations = () => {
    rows.forEach((row, i) => {
      const track = row.querySelector('.marquee-track');
      if (!track) return;
      const distance = track.scrollWidth / 2;
      const pxPerSec = BASE_PX_PER_SEC * ROW_SPEED_FACTORS[i % ROW_SPEED_FACTORS.length];
      track.style.setProperty('--marquee-duration', `${distance / pxPerSec}s`);
    });
  };

  setDurations();
  window.addEventListener('resize', setDurations);
}
