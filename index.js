let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();

let weatherDate = document.querySelector("#current-date");
weatherDate.innerHTML = `${day}, ${date} ${month}`;

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let weatherTime = document.querySelector("#current-time");
weatherTime.innerHTML = `${hours}:${minutes}`;

function currentWeather(city) {
  let apiKey = "0394971ede805c240c5c5a180c481699";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureCity);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#inputCity");
  currentWeather(cityInputElement.value);
}

function getForecast(coordinates) {
  let apiKey = "0394971ede805c240c5c5a180c481699";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperatureCity(response) {
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weather-details").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

let formCity = document.querySelector("#search-city");
formCity.addEventListener("submit", handleSubmit);

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `	<div class="col-2"> 
      <div class="weather-forecast-date">
        ${day}
      </div>
				<img src="https://openweathermap.org/img/wn/04d@2x.png" class="forecast-img"/>
		    <div class="weather-forecast-temperatures">
						<span class="weather-forecast-temperatures-max">18</span>° <span class="weather-forecast-temperatures-min">20°</span>
		    </div>
		</div>`;
  });

  forecastElement.innerHTML = forecastHTML;

  forecastHTML = forecastHTML + `</div>`;
}

currentWeather("Kyiv");
