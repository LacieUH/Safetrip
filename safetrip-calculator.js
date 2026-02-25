console.log("Safetrip Calculator Loaded");

// Constants
const MIN_SALES = 0;
const MAX_SALES = 15000;

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

function getSelectedRate() {
  return parseFloat(
    document.querySelector("input[name='contract']:checked").value
  );
}

// Update slider background
function updateSliderFill() {
  const percent = slider.value;
  slider.style.background = `linear-gradient(90deg, var(--orange) 0% ${percent}%, var(--grey-300) ${percent}% 100%)`;
}

// Update function
function updateCalculator() {
  minLabel.textContent = MIN_SALES.toLocaleString();
  maxLabel.textContent = MAX_SALES.toLocaleString();

  const percent = parseFloat(slider.value);
  percentEl.textContent = percent;

  updateSliderFill();

  const selectedSales = MIN_SALES + (MAX_SALES - MIN_SALES) * (percent / 100);
  const revenue = selectedSales * getSelectedRate();

  projectedEl.textContent = toUSD(Math.round(revenue));
}

// Event Listeners
slider.addEventListener("input", updateCalculator);
contractRadios.forEach(radio =>
  radio.addEventListener("change", updateCalculator)
);

// Initialize
updateCalculator();




