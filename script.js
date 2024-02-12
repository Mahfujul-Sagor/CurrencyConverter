let BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';
const dropdowns = document.querySelectorAll('.dropdown select');
const button = document.querySelector('button');
let fromCurr = document.querySelector('.from select');
let toCurr = document.querySelector('.to select');
let msg = document.querySelector('.msg');


for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOpt = document.createElement('option');
    newOpt.innerText = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOpt.selected = 'selected';
    }
    else if (select.name === "to" && currCode === "BDT") {
      newOpt.selected = 'selected';
    };
    select.append(newOpt);
  };
  select.addEventListener('change', (evt)=> {
    updateFlag(evt.target);
  });
};

const updateFlag = (element)=> {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector('img');
  img.src = newSrc;
};

const updateExchangeRate = async ()=> {
  let amount = document.querySelector('.amount input');
  let amountVal = amount.value;
  if (amountVal === '' || amountVal < 1) {
    amountVal = 1;
    amount.value = '1';
  };

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amountVal * rate;
  
  msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

button.addEventListener('click', (evt)=> {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener('load', ()=> {
  updateExchangeRate();
});