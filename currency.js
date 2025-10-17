import {countryList} from "./list.js";
// console.log(Object.keys(countryList));
const selected=document.querySelectorAll("select");
const btn=document.querySelector(".done button");
const from=document.querySelector(".from select");
const to=document.querySelector(".to select");
// thie function for select tag
function selector(){
 selected.forEach(select=>{
 for(let text of Object.keys(countryList)){
    let option=document.createElement("option");
    option.innerText=text;
    option.value=text;
    select.appendChild(option);
}
    select.addEventListener("change",(evt)=>{
       updateflag(evt.target);
    });
  });
}
// flag update function 
const updateflag=(element)=>{
    let contry_code=element.value;
    let contry_flag=countryList[contry_code];
    let newscr = `https://flagsapi.com/${contry_flag}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newscr;
}
btn.addEventListener("click",async(e)=>{
  e.preventDefault();
  let amount=document.querySelector(".amount input");
  let amtVl=amount.value;
  if (amtVl === "" || amtVl <= 0) {
    alert("Please enter a valid amount!");
    return;
  }
  // console.log(amtVl);
  const fromCode = from.value.toLowerCase();
  const toCode = to.value.toLowerCase();
// console.log(fromCode,toCode);
  const url=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCode}.json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const baseRates = data[fromCode] || data; // if nested, take fromCode key
    if (!baseRates[toCode]) {
      alert(`Conversion failed: ${toCode.toUpperCase()} not found`);
      return;
    }

    const converted = (amtVl * baseRates[toCode]).toFixed(2);
    const output=document.getElementById("p2");
    const result = `${amtVl}${" "}${fromCode.toUpperCase()} = ${converted}${" "}${toCode.toUpperCase()} `;
    output.innerText=result;
    // console.log("Converted:", converted);

  } catch (err) {
    console.error("Error fetching API:", err);
    alert("Something went wrong while fetching rates");
  }
});
selector();
// 🔹 set different default currencies
from.value = "USD"; // ya koi aur default
to.value = "PKR";   // ya koi aur default

// 🔹 update both flags to match selected values
updateflag(from);
updateflag(to);