console.log("Safetrip Calculator Loaded");

// DOM Elements
const minSalesInput = document.getElementById("minSales");
const maxSalesInput = document.getElementById("maxSales");
const slider = document.getElementById("slider");
const percentEl = document.getElementById("percent");
const projectedEl = document.getElementById("projected");
const minLabel = document.getElementById("minLabel");
const maxLabel = document.getElementById("maxLabel");
const contractRadios = document.querySelectorAll("input[name='contract']");

// Helpers
function formatNumber(n) {
  return n.toLocaleString("en-US");
}

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

// Main update function
function updateCalculator() {
  const minSales = parseFloat(minSalesInput.value) || 0;
  const maxSales = parseFloat(maxSalesInput.value) || 0;

  // Update labels
  minLabel.textContent = formatNumber(minSales);
  maxLabel.textContent = formatNumber(maxSales);

  const percent = parseFloat(slider.value);
  percentEl.textContent = percent;

  // Calculate selected sales
  let selectedSales;
  if (maxSales < minSales) {
    // If Max < Min, just use Min for calculation
    selectedSales = minSales;
  } else {
    selectedSales = minSales + (maxSales - minSales) * (percent / 100);
  }

  // Calculate revenue
  const revenue = selectedSales * getSelectedRate();
  projectedEl.textContent = toUSD(Math.round(revenue));
}

// Event Listeners
slider.addEventListener("input", updateCalculator);
minSalesInput.addEventListener("input", updateCalculator);
maxSalesInput.addEventListener("input", updateCalculator);
contractRadios.forEach(radio =>
  radio.addEventListener("change", updateCalculator)
);

// Initialize
updateCalculator();


