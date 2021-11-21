let now = new Date();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let thisMonth = months[now.getMonth()];
let todaysDate = now.getDate();
let thisDay = days[now.getDay()];
let thisHour = now.getHours();
if (thisHour < 10) {
  thisHour = `0${thisHour}`;
}

let thisMinutes = now.getMinutes();
if (thisMinutes < 10) {
  thisMinutes = ` 0${thisMinutes}`;
}

let currentMonth = document.querySelector("#month");
currentMonth.innerHTML = `${thisMonth}`;

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${todaysDate}`;

let currentDay = document.querySelector("#day");
currentDay.innerHTML = `${thisDay}`;

let currentHour = document.querySelector("#hour");
currentHour.innerHTML = `${thisHour}.`;

let currentMinutes = document.querySelector("#minutes");
currentMinutes.innerHTML = `${thisMinutes}`;

function searchForLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8bfbf28022488dee7340fe98270ce789";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
function displayTemperature(response) {
  console.log(response.data);
  let description = response.data.weather[0].description;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  let condition = document.querySelector("#description");
  condition.innerHTML = `${description}`;

  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-a-city").value;
  search(city);
}

function search(city) {
  let apiKey = "8bfbf28022488dee7340fe98270ce789";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let myLocation = document.querySelector("#location-button");
myLocation.addEventListener("click", searchForLocation);

let typeACity = document.querySelector("#submit-form");
typeACity.addEventListener("submit", handleSubmit);

search("Agincourt");
