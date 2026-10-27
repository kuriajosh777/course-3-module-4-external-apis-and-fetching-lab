// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";
 
// Grab the elements we will work with
const stateInput = document.querySelector('#state-input');
const fetchButton = document.querySelector('#fetch-alerts');
const alertsDisplay = document.querySelector('#alerts-display');
const errorMessage = document.querySelector('#error-message');

// Step 1: fetch the alerts for a state abbreviation (e.g. "NY")
async function fetchWeatherAlerts(state) {
  const response = await fetch(`${weatherApi}${state}`);
 
  // fetch() only rejects on network failures, so check for HTTP errors too
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      // The weather API explains bad requests in a "detail" property
      const errorData = await response.json();
      if (errorData && errorData.detail) {
        message = errorData.detail;
      }
    } catch (parseError) {
      // The error response wasn't JSON, so keep the status message
    }
    throw new Error(message);
  }
 
  return response.json();
}

// Step 3: clear the input field every time the user fetches
  stateInput.value = '';
 
  try {
    // Empty input is an error we catch ourselves, before calling the API
    if (state === '') {
      throw new Error('Please enter a state abbreviation.');
    }
 
    const data = await fetchWeatherAlerts(state);
    clearError();
    displayAlerts(data);
  } catch (error) {
    console.log(error.message);
    showError(error.message);
  }
}
 
fetchButton.addEventListener('click', handleFetchClick);
