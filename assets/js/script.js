
var weatherApiKey = "ebd153ae1727f03c10d93ef05e14e355";
var unit = "imperial";
var weatherIconUrl = "https://openweathermap.org";

var inputTxtEl = document.querySelector("#searchTextField");
var searchBtnEl = document.querySelector("#search-btn");
var clearBtnEl = document.querySelector("#clear-search-history");
var searchHistoryEl = document.querySelector("#search_history");
var searchHistory = [];
var cityFormEl = document.querySelector("#city-form");
var searchedCityEl = document.querySelector("#searched-city");
var pastCitySearchBtnEl = document.querySelector("#buttons");

var currentDtEl = document.querySelector("#current-date");
var currentIconEl = document.querySelector("#current-icon");
var currentTempEl = document.querySelector("#currentTemp");
var currentHumidEl = document.querySelector("#currentHumid");
var currentWindEl = document.querySelector("#currentWind");
var currentUVEl = document.querySelector("#currenUV");

/* -------------------------------------------------------------------  */
/*                              Get Current Weather                             */
/* -------------------------------------------------------------------  */

function getWeather(city) {
  var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherApiKey + "&units=" + unit;
  fetch(weatherUrl).then((response) => {
    response.json().then((data) => {
      showCurrentWeather(data, city);
    });
  });
}

/* -------------------------------------------------------------------  */
/*         Show Current Weather: icon, temp, humidity, wind             */
/*                https://openweathermap.org/current                    */
/* -------------------------------------------------------------------  */
function showCurrentWeather(weather, searchQuery) {
  cityFormEl.textContent = searchQuery;
  let weatherTempEl = weather.main.temp;
  let weatherHumidEl = weather.main.humidity;
  let weatherWindEl = weather.wind.speed;
  iconEl = weather.weather[0].icon;
  currentIconEl.src = "https://openweathermap.org/img/wn/" + iconEl + "@2x.png";
  currentTempEl.innerHTML = weatherTempEl;
  currentHumidEl.innerHTML = weatherHumidEl;
  currentWindEl.innerHTML = weatherWindEl;
}





/* -------------------------------------------------------------------  */
/*          handle submit event                                         */
/*          show and save list button with history                      */
/*          Retrive from local storage                                  */
/* -------------------------------------------------------------------  */


function formSubmitHandler(event) {
  event.preventDefault();
  let cityEl = inputTxtEl.value.trim(); // saturating the value of city
  let btn = document.createElement("button");
  btn.className = "searched-list btn";
  btn.innerHTML = cityEl;
  buttons.appendChild(btn);
  listCity();
  if (!searchHistory.includes(cityEl) && cityEl != "") {
    searchHistory.push(cityEl);
  }
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  if (cityEl) {
    getWeather(cityEl);
    inputTxtEl.value = "";
  } else {
    alert("Enter a city name to get the weather!");
  }
}
function listCity() {
  searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (!searchHistory) {
    searchHistory = [];
  }
}
function saveSearch() {
  for (var i = 0; i < searchHistory.length; i++) {
    let btn = document.createElement("button");
    btn.className = "searched-list btn";
    btn.innerHTML = searchHistory[i];
    buttons.appendChild(btn);
  }
  /* ************************************************* */
  /* Past Search Button                                */
  /* ************************************************* */
  let pastListBtnEl = document.querySelectorAll(".searched-list");
  for (var i = 0; i < pastListBtnEl.length; i++) {
    pastListBtnEl[i].addEventListener("click", (event) => {
      getWeather(event.target.textContent);
    });
  }
}
/* Listen to the submitted query form */
cityFormEl.addEventListener("submit", formSubmitHandler);
listCity();
saveSearch();


/* ------------------------------------------------------------------  */
/* Google API autocomplete: enable Maps JavaScript API and Places API  */
/* ------------------------------------------------------------------- */

function initAutocomplete() {
  // Create the search box and link it to the UI element.
  const searchTxtEl = document.getElementById("searchTextField");
  const searchBox = new google.maps.places.SearchBox(searchTxtEl);
  map.controls[google.maps.ControlPosition].push(searchTxtEl);
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
  });
}

/* -------------------------------------------------------  */
/*                  Today's Data                             */
/* -------------------------------------------------------  */

var currentDt = moment().format("L");
currentDtEl.innerHTML = currentDt;
console.log(currentDt);

/* -------------------------------------------------------  */
/*                  Five day forecast                       */
/* -------------------------------------------------------  */

/* Day 1 */
var day1 = moment().add(1, "days").format("L");
document.getElementById("firstDay").innerHTML = day1;
console.log(day1);
/* Day 2 */
var day2 = moment().add(2, "days").format("L");
document.getElementById("secondDay").innerHTML = day2;
console.log(day2);
/* Day 3 */
var day3 = moment().add(3, "days").format("L");
document.getElementById("thirdDay").innerHTML = day3;
console.log(day3);
/* Day 4 */
var day4 = moment().add(4, "days").format("L");
document.getElementById("forthDay").innerHTML = day4;
console.log(day4);
/* Day 5 */
var day5 = moment().add(5, "days").format("L");
document.getElementById("fifthDay").innerHTML = day5;
console.log(day5);
