// Live "time in the craft" counter, computed from a fixed start date.
export function initCraftCounter() {
  const el = document.getElementById('craft-counter');
  if (!el) return;

  const CRAFT_START = new Date('2012-02-15T00:00:00Z');
  const now = new Date();
  let years = now.getUTCFullYear() - CRAFT_START.getUTCFullYear();
  let months = now.getUTCMonth() - CRAFT_START.getUTCMonth();
  let days = now.getUTCDate() - CRAFT_START.getUTCDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now.getUTCFullYear(), now.getUTCMonth(), 0).getUTCDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  el.textContent = `${years}y ${months}m ${days}d in the craft · available, remote`;
}
