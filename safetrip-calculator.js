/*************************************************************
 * EDIT THESE DEFAULTS
 *************************************************************/
const DEFAULT_TOTAL = 1309000;     // Total Revenue (Calendar Year)
const DEFAULT_POSSIBLE = 4000000;  // Possible/Projected Revenue

// ---- DOM ----
console.log('Safetrip JS loaded');
const totalLabel = document.getElementById('totalLabel');
const possibleLabel = document.getElementById('possibleLabel');
const totalDefault = document.getElementById('totalDefault');
const possibleDefault = document.getElementById('possibleDefault');

const warnEl = document.getElementById('warn');
const slider = document.getElementById('slider');
const percentEl = document.getElementById('percent');
const projectedEl = document.getElementById('projected');
const minLabel = document.getElementById('minLabel');
const maxLabel = document.getElementById('maxLabel');
const incPctEl = document.getElementById('incPct');
const deltaEl = document.getElementById('delta');

// ---- Helpers ----
function toUSD(n) {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
}
function setSliderFill(sliderEl, percent) {
  sliderEl.style.background =
    `linear-gradient(90deg, var(--blue) 0% ${percent}%, var(--grey-300) ${percent}% 100%)`;
}

// ---- State ----
let total = DEFAULT_TOTAL;
let possible = DEFAULT_POSSIBLE;

// ---- Logic ----
function clampPossible() {
  if (possible < total) {
    possible = total;
    warnEl.style.display = 'block';
  } else {
    warnEl.style.display = 'none';
  }
}

function refreshStaticLabels() {
  totalLabel.textContent = toUSD(total);
  possibleLabel.textContent = toUSD(possible);
  minLabel.textContent = toUSD(total);
  maxLabel.textContent = toUSD(possible);
  totalDefault.textContent = toUSD(total);
  possibleDefault.textContent = toUSD(possible);
}

function updateProjectionFromSlider() {
  const p = Number(slider.value); // 0..100
  percentEl.textContent = p;
  setSliderFill(slider, p);

  // Linear interpolation from total (0%) to possible (100%)
  const projected = Math.round(total + (possible - total) * (p / 100));
  projectedEl.textContent = toUSD(projected);

  const delta = projected - total;
  const incPct = total === 0 ? 0 : (delta / total) * 100;
  incPctEl.textContent = `${incPct.toFixed(0)}%`;
  deltaEl.textContent = toUSD(delta);
}

// ---- Init ----
(function boot() {
  clampPossible();
  refreshStaticLabels();
  setSliderFill(slider, Number(slider.value));
  updateProjectionFromSlider();
  slider.addEventListener('input', updateProjectionFromSlider);
})();