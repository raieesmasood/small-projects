//refering to html tag and getting value out of it
// const countValue = document.querySelector("#counter");
//OR 
const countValue = document.getElementById('counter')

const increment = () => {
  // Get the value in the form of a string and parse it to int
  let value = parseInt(countValue.innerText);
  // Update the value
  value = value + 1;
  // Set the value onto the UI
  countValue.innerText = value;
};

const decrement = () => {
  // Get the value in the form of a string and parse it to int
  let value = parseInt(countValue.innerText);
  // Update the value
  value = value - 1;
  // Set the value onto the UI
  countValue.innerText = value;
};
