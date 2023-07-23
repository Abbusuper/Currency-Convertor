let fromInput = document.getElementById("from");
let toInput = document.getElementById("to");
let amountInput = document.getElementById("amount");
let result = document.getElementById('result');
const convertorButton = document.getElementById('c-btn');
convertorButton.addEventListener('click', convert);

function isValidCurrencyCode(code) {
  var apiUrl = 'https://openexchangerates.org/api/currencies.json';

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var validCodes = Object.keys(data);
      return validCodes.includes(code);
    })
    .catch(error => {
      console.log(error);
      return false;
    });
}

function convert() {
  let from = fromInput.value.toUpperCase();
  let to = toInput.value.toUpperCase();
  let amount = amountInput.value;

  if (!isValidCurrencyCode(from)) {
    result.innerText = '';
    console.log('Invalid currency');
    alert("Check Currency Codes");
    return;
  }

  let urlAPI = 'https://api.exchangerate-api.com/v4/latest/' + from;
  fetch(urlAPI)
    .then(response => response.json())
    .then(data => {
      let conversionRate = data.rates[to];
      if(conversionRate===undefined){
        alert("Invalid Currency Code");
        result.innerText='' 
      }else{
      let convertedAmount = amount * conversionRate;
      result.innerText = convertedAmount.toFixed(2) + ' ' + to;
      }
    })
    .catch(error => {
      console.log(error);
      alert("Invalid Currency Code");
      result.innerText=''
    });
}
