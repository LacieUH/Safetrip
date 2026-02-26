console.log("Safetrip Calculator Loaded");

// Constants
const MIN_PURCHASES = 0;
const MAX_PURCHASES = 30000;

// DOM Elements
const slider = document.getElementById("slider");
const percentEl = document.getElementById("percent");
const projectedEl = document.getElementById("projected");
const minLabel = document.getElementById("minLabel");
const maxLabel = document.getElementById("maxLabel");
const contractRadios = document.querySelectorAll("input[name='contract']");

// Helpers
function toUSD(n) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
}

function formatNumber(n) {
  return n.toLocaleString("en-US");
}

function getSelectedRate() {
  return parseFloat(
    document.querySelector("input[name='contract']:checked").value
  );
}

// Update slider background fill
function updateSliderFill(percent) {
  slider.style.background = `linear-gradient(90deg, var(--orange) 0% ${percent}%, var(--grey-300) ${percent}% 100%)`;
}

// Main update function
function updateCalculator() {
  const percent = parseFloat(slider.value);

  // Calculate selected Purchases
  const selectedPurchases = MIN_PURCHASES + (MAX_PURCHASES - MIN_PURCHASES) * (percent / 100);

  // Update slider fill
  updateSliderFill(percent);

  // Update labels
  minLabel.textContent = formatNumber(MIN_PURCHASES);
  maxLabel.textContent = formatNumber(MAX_PURCHASES);

  percentEl.textContent = `${percent}% (${formatNumber(Math.round(selectedPurchases))} purchases)`;

  // Calculate revenue
  const revenue = selectedPurchases * getSelectedRate();
  projectedEl.textContent = toUSD(Math.round(revenue));
}

// Event listeners
slider.addEventListener("input", updateCalculator);
contractRadios.forEach(radio =>
  radio.addEventListener("change", updateCalculator)
);

// Initialize
updateCalculator();







