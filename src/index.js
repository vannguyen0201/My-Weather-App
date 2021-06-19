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

let celciusTemp = null;

let checkButton = document.querySelector("#search-form");
  checkButton.addEventListener("submit", searchCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);

displayCity("sydney");