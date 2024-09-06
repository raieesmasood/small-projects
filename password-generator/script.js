const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordlength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");
//set circle color to grey

//set password length according to slider

function handleSlider() {
  inputSlider.value = passwordlength;
  lengthDisplay.innerText = passwordlength;
  //   passwordDisplay.value = password
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  // shadow
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
  const randNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordlength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Coppied Successfully!";
  } catch (error) {
    copyMsg.innerText = "Failed!";
  }
  // make span visible
  copyBtn.classList.add("active");
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function shufflePassword(array){
    //Fisher Yates Method
 //Fisher Yates Method
 for (let i = array.length - 1; i > 0; i--) {
    //random J, find out using random function
    const j = Math.floor(Math.random() * (i + 1));
    //swap number at i index and j index
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
let str = "";
array.forEach((el) => (str += el));
return str;

}

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  //special condition
  if (passwordlength < checkCount) {
    passwordlength = checkCount;
    handleSlider();
  }
}
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

inputSlider.addEventListener("input", (event) => {
  passwordlength = event.target.value;
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});

generateBtn.addEventListener("click", () => {
    ///agar koi checkbox nahi hoga selected
    if (checkCount ==0) return;
    //special case

    if(passwordlength<checkCount){
        passwordlength = checkCount;
        handleSlider();
    }

    //finding new password 

    //remove old pw

    console.log("Start")

    password = "";

    //lets put the stuff mentioned by checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }




    let funcArr = [];
    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase)

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase)
    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber)
    if(symbolsCheck.checked)
        funcArr.push(generateSymbol)

    //compulsary addition 
    for (let i=0; i<funcArr.length; i++){
        password += funcArr[i](); 
    }

    console.log("Comulsary Addition Done")
        // remaining element
        for (let i = 0; i < passwordlength - funcArr.length; i++) {
            let randIndex = getRndInteger(0, funcArr.length);
            console.log("randIndex: " + randIndex); // Log randIndex
            if (funcArr.length > 0) { // Ensure funcArr is not empty
              password += funcArr[randIndex]();
            }
          }
    console.log("Remaining Addition Done")

    //shuffle password
    password = shufflePassword(Array.from(password));
    console.log("Shuffle Done")
    //show in UI
    passwordDisplay.value = password;

    console.log("UI update Done")
    //calculate srngth

    calcStrength();

});

