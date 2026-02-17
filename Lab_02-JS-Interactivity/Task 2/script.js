// Get DOM elements
var num1Input = document.getElementById("num1");
var num2Input = document.getElementById("num2");
var operationSelect = document.getElementById("operation");
var resultDiv = document.getElementById("result");
var errorMsg = document.getElementById("error");


// Function to validate inputs
function validateInputs(value1, value2, operation) {
    // Check if inputs are empty
    if (value1 === "" || value2 === "") {
        showError("Please enter both numbers.");
        return false;
    }

    // Check if inputs are valid numbers
    if (isNaN(value1) || isNaN(value2)) {
        showError("Please enter valid numbers.");
        return false;
    }

    // Prevent division by zero
    if (operation === "divide" && parseFloat(value2) === 0) {
        showError("Cannot divide by zero!");
        return false;
    }

    return true;
}


// Function to display error messages
function showError(message) {
    errorMsg.textContent = message;
    resultDiv.style.display = "none";
    resultDiv.className = "result";
}


// Function to perform calculation
function performCalculation(num1, num2, operation) {
    var result;

    if (operation === "add") {
        result = num1 + num2;
    } else if (operation === "subtract") {
        result = num1 - num2;
    } else if (operation === "multiply") {
        result = num1 * num2;
    } else if (operation === "divide") {
        result = num1 / num2;
    }

    return result;
}


// Function to get operation symbol
function getOperationSymbol(operation) {
    if (operation === "add") return "+";
    if (operation === "subtract") return "-";
    if (operation === "multiply") return "x";
    if (operation === "divide") return "÷";
    return "";
}


// Main calculate function
function calculate() {
    var value1 = num1Input.value.trim();
    var value2 = num2Input.value.trim();
    var operation = operationSelect.value;

    // Validate inputs
    if (!validateInputs(value1, value2, operation)) {
        return;
    }

    // Parse numbers
    var num1 = parseFloat(value1);
    var num2 = parseFloat(value2);

    // Perform calculation
    var result = performCalculation(num1, num2, operation);

    // Round to avoid floating point issues
    result = Math.round(result * 10000) / 10000;

    // Clear error
    errorMsg.textContent = "";

    // Display result with operation details
    var symbol = getOperationSymbol(operation);
    resultDiv.textContent = num1 + " " + symbol + " " + num2 + " = " + result;
    resultDiv.style.display = "block";

    // Change background color based on positive/negative value
    resultDiv.className = "result";
    if (result > 0) {
        resultDiv.classList.add("positive");
    } else if (result < 0) {
        resultDiv.classList.add("negative");
    } else {
        resultDiv.classList.add("zero");
    }
}


// Clear all inputs and results
function clearAll() {
    num1Input.value = "";
    num2Input.value = "";
    operationSelect.selectedIndex = 0;
    resultDiv.style.display = "none";
    resultDiv.textContent = "";
    resultDiv.className = "result";
    errorMsg.textContent = "";
}
