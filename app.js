// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Hide results
  document.getElementById("result").style.display = "none";
  // Show loading
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 1000);
  e.preventDefault();
});

// calculate Results
function calculateResults() {
  // UI Vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);
    // Show result that is hidden with none
    document.getElementById("result").style.display = "block";

    // Hide loading
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Check your numbers");
  }
}

function showError(error) {
  // Hide result
  document.getElementById("result").style.display = "none";

  // Hide loading
  document.getElementById("loading").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.classList = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 2000);
}

// Clear error function
function clearError() {
  document.querySelector(".alert").remove();
}
