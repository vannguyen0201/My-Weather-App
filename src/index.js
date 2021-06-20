function searchCity(event) {
    event.preventDefault();
    let changeCity = document.querySelector("#search-city");
    displayCity(changeCity.value);
}

function displayCity(city) {
  let apiKey = "ae3ffbb2ba5fd172289cc56d929ac85e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemp);
}

function getTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = temperature;
  document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#currentDate").innerHTML = formatDate(response.data.dt * 1000);

  celciusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function formatDate(timestamp) {
  let today = new Date(timestamp);
  let hours = today.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let month = months[today.getMonth()];
    let day = days[today.getDay()];
    let date = today.getDate();
    return `Last updated: ${day} ${date} ${month}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"]
  return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#weather-forecast");

    let forecastHTML = `<div class="row" id="forecast-week">`
    forecast.forEach(function (forecastDay, index) {
      if (index < 7 && index > 0)  {
        forecastHTML = forecastHTML + `<div class="col-2" id="day-of-week">
        <div id="forecast-day">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" id="forecast-icon">
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span> 
            <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
          </div>
      </div>`
      }
    })
    
    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;
  }

function getForecast(coordinates) {
  let apiKey = "ae3ffbb2ba5fd172289cc56d929ac85e";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`
  axios.get(apiURL).then(displayForecast);
}

function showFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
    celcius.classList.remove("active");
    fahrenheit.classList.add("active");
    document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp);
}

function showCelcius(event) {
    event.preventDefault();
    celcius.classList.add("active");
    fahrenheit.classList.remove("active");
    document.querySelector("#temperature").innerHTML = Math.round(celciusTemp);
}

function showCurrentLocation(position) {
  let apiKey = `ae3ffbb2ba5fd172289cc56d929ac85e`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let celciusTemp = null;

let checkButton = document.querySelector("#search-form");
  checkButton.addEventListener("submit", searchCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

displayCity("melbourne, AU");