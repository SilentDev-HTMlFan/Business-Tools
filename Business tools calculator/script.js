/**
 * Business Tools Calculator
 * 
 * Features:
 * 1. Burn Rate Calculator - Estimates startup runway.
 * 2. CAC Calculator - Measures customer acquisition cost.
 * 3. Loan Eligibility Calculator - Predicts loan qualification chances.
 */

// DOM Elements
const tabs = document.querySelectorAll('.tab');
const calculators = document.querySelectorAll('.calculator');
const burnRateResult = document.getElementById('burn-rate-result');
const cacResult = document.getElementById('cac-result');
const loanResult = document.getElementById('loan-result');

// Tab Navigation
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all calculators
        calculators.forEach(calc => calc.classList.add('hidden'));
        // Show selected calculator
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.remove('hidden');
    });
});

// Burn Rate Calculator
document.getElementById('calculate-burn-rate').addEventListener('click', () => {
    const cashBalance = parseFloat(document.getElementById('cash-balance').value);
    const monthlyExpenses = parseFloat(document.getElementById('monthly-expenses').value);
    
    if (isNaN(cashBalance) || isNaN(monthlyExpenses)) {
        alert("Please enter valid numbers!");
        return;
    }
    
    if (monthlyExpenses <= 0) {
        alert("Monthly expenses must be greater than zero!");
        return;
    }
    
    const monthsLeft = cashBalance / monthlyExpenses;
    burnRateResult.innerHTML = `
        <strong>Result:</strong><br>
        With a cash balance of <strong>$${cashBalance.toLocaleString()}</strong> and monthly expenses of <strong>$${monthlyExpenses.toLocaleString()}</strong>,<br>
        your startup has <strong>${monthsLeft.toFixed(1)} months</strong> of runway left.
    `;
    burnRateResult.style.display = 'block';
});

// CAC Calculator
document.getElementById('calculate-cac').addEventListener('click', () => {
    const marketingCost = parseFloat(document.getElementById('marketing-cost').value);
    const newCustomers = parseFloat(document.getElementById('new-customers').value);
    
    if (isNaN(marketingCost) || isNaN(newCustomers)) {
        alert("Please enter valid numbers!");
        return;
    }
    
    if (newCustomers <= 0) {
        alert("Number of new customers must be greater than zero!");
        return;
    }
    
    const cac = marketingCost / newCustomers;
    cacResult.innerHTML = `
        <strong>Result:</strong><br>
        Your Customer Acquisition Cost (CAC) is <strong>$${cac.toFixed(2)}</strong> per customer.
    `;
    cacResult.style.display = 'block';
});

// Loan Eligibility Calculator
document.getElementById('calculate-loan').addEventListener('click', () => {
    const revenue = parseFloat(document.getElementById('annual-revenue').value);
    const creditScore = parseFloat(document.getElementById('credit-score').value);
    const timeInBusiness = parseFloat(document.getElementById('time-in-business').value);
    
    if (isNaN(revenue) || isNaN(creditScore) || isNaN(timeInBusiness)) {
        alert("Please enter valid numbers!");
        return;
    }
    
    let eligibility = "Low";
    if (revenue > 100000 && creditScore >= 650 && timeInBusiness >= 2) {
        eligibility = "High";
    } else if (revenue > 50000 && creditScore >= 600 && timeInBusiness >= 1) {
        eligibility = "Medium";
    }
    
    loanResult.innerHTML = `
        <strong>Result:</strong><br>
        Based on your inputs:<br>
        - Annual Revenue: <strong>$${revenue.toLocaleString()}</strong><br>
        - Credit Score: <strong>${creditScore}</strong><br>
        - Time in Business: <strong>${timeInBusiness} years</strong><br><br>
        Your loan eligibility is: <strong>${eligibility}</strong>.
    `;
    loanResult.style.display = 'block';
});