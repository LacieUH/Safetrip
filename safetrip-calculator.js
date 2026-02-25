console.log("Safetrip Calculator Loaded");

const minSalesInput = document.getElementById("minSales");
const maxSalesInput = document.getElementById("maxSales");
const slider = document.getElementById("slider");
const percentEl = document.getElementById("percent");
const projectedEl = document.getElementById("projected");
const minLabel = document.getElementById("minLabel");
const maxLabel = document.getElementById("maxLabel");
const contractRadios = document.querySelectorAll("input[name='contract']");

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

function updateCalculator() {
  let minSales = parseFloat(minSalesInput.value) || 0;
  let maxSales = parseFloat(maxSalesInput.value) || 0;

  if (maxSales < minSales) {
    maxSales = minSales;
    maxSalesInput.value = minSales;
  }

  minLabel.textContent = formatNumber(minSales);
  maxLabel.textContent = formatNumber(maxSales);

  const percent = parseFloat(slider.value);
  percentEl.textContent = percent;

  const selectedSales = minSales + (maxSales - minSales) * (percent / 100);
  const revenue = selectedSales * getSelectedRate();

  projectedEl.textContent = toUSD(Math.round(revenue));
}

slider.addEventListener("input", updateCalculator);
minSalesInput.addEventListener("input", updateCalculator);
maxSalesInput.addEventListener("input", updateCalculator);
contractRadios.forEach(radio =>
  radio.addEventListener("change", updateCalculator)
);

updateCalculator();

