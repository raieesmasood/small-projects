console.log("hi");
const API_KEY = "9b6b02239ec68a8730c496eab5292a44";

async function showWeather() {
  try {
    let lat = 15.333;
    let lon = 74.0833;
    // let city = "goa";

    // API URL with proper interpolation of variables
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    // if (!response.ok) {
    //     console.error("Failed to fetch weather data:", response.statusText);
    //     return;
    // }


    console.log("Weather data:", data);

    // Correct temperature extraction
    let temperature = data?.main?.temp.toFixed(2);

    // Create and append the paragraph to display the temperature
    let newPara = document.createElement("p");
    newPara.textContent = `Current temperature: ${temperature} °C`;
    document.body.appendChild(newPara);


    // renderWeatherInfo(data);
  } catch (error) {
    console.log("error");
  }
}

showWeather();


async function getCustomWeatherDetails(){
try {  
  let lat = 15.6333;
  let lon = 18.3333;

  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)

  let data = await response.json();
  console.log(data)
  
} catch (error) {
  console.log("error")
}

}

getCustomWeatherDetails();



function switchTab(clickedTab){

  apiErrorContainer.classList.remove("active");
  if (clickedTab !== currentTab){
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");

    if(!searchForm.classList.contains("active")){
      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active")
    }
    else{
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      getFromSessionStorage();
    }
  }

}


function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition)
  }
  else{
    console.log("No geoLocation Support")
  }
}

function showPosition(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
}