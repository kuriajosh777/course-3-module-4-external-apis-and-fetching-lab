// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";
 
// Grab the elements we will work with
const stateInput = document.querySelector('#state-input');
const fetchButton = document.querySelector('#fetch-alerts');
const alertsDisplay = document.querySelector('#alerts-display');
const errorMessage = document.querySelector('#error-message');
