const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// initial varialble needs

let currentTab = userTab;

const API_KEY = "9b6b02239ec68a8730c496eab5292a44";

currentTab.classList.add("current-tab");

// shifting bg color of tabs
function switchTab(clickedTab) {
  if (clickedTab !== currentTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");
  }

  if (!searchForm.classList.contains("active")) {
    // if serch form invisible make it visible
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    searchForm.classList.add("active");
  } else {
    //  i was on search tab. abh weather tab visible karna hai
    searchForm.classList.remove("active");
    userInfoContainer.classList.remove("active");
    // now i am on weather tab, so i have to display weather, checking local storage for coordinates

    getFromSessionStorage();
  }
}

userTab.addEventListener("click", () => {
  //  pass clicked tab as ip parameter
  switchTab(userTab);
});
searchTab.addEventListener("click", () => {
  //  pass clicked tab as ip parameter
  switchTab(searchTab);
});

// check if coordinates are present in session storage

function getFromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    grantAccessContainer.classList.add("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;
  // make grant container invisible
  grantAccessContainer.classList.remove("active");
  loadingScreen.classList.add("active");

  //api call

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();
    console.log(data);
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");

    renderWeatherInfo(data);
  } catch (error) {
    loadingScreen.classList.remove("active");
    console.log("error");
  }
}

function renderWeatherInfo(weatherInfo) {
  // firstly we have tp fetch the elements

  const cityName = document.querySelector("[data-cityName]");
  const countryIcon = document.querySelector("[data-countryIcon]");
  const desc = document.querySelector("[data-weatherDesc]");
  const weatherIcon = document.querySelector("[data-weatherIcon]");
  const temp = document.querySelector("[data-temp]");
  const windspeed = document.querySelector("[data-windspeed]");
  const humidity = document.querySelector("[data-humidity]");
  const cloudliness = document.querySelector("[data-cloudiness]");

  //fetch values from weatherInfo object and put in ui
  cityName.innerText = weatherInfo?.name;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  desc.innerText = weatherInfo?.weather?.[0]?.description;
  weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
  temp.innerText = weatherInfo?.main?.temp;
  windspeed.innerText = weatherInfo?.wind?.speed;
  humidity.innerText = weatherInfo?.main?.humidity;
  cloudliness.innerText = weatherInfo?.clouds?.all;
}

// geolocation

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("No geoLocation Support");
  }
}

function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  //displaying it on UI
  fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]")
searchForm.addEventListener("submit", (e)=>{

    e.preventDefault();
    //value
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else
    fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    try {  
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        console.log(data);
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);
    
    } catch (error) {
        console.log("Error fetching weather for the searched city", error);
        loadingScreen.classList.remove("active");
    }
    
}

