/* -------------------------------------------------------------------  */
/*                                Weather                               */
/* -------------------------------------------------------------------  */
var weatherApiKey = "ebd153ae1727f03c10d93ef05e14e355";
var unit = "imperial";
/* -------------------------------------------------------------------  */
/*                        Search elements                               */
/* -------------------------------------------------------------------  */
var inputTxtEl = document.querySelector("#searchTextField");
var searchBtnEl = document.querySelector("#search-btn");
var clearBtnEl = document.querySelector("#clear-search-history");
var searchHistoryEl = document.querySelector("#search_history");
var searchHistory = [];
var cityFormEl = document.querySelector("#city-form");
var searchedCityEl = document.querySelector("#searched-city");
var pastCitySearchBtnEl = document.querySelector("#buttons");
/* -------------------------------------------------------------------  */
/*                                Current                               */
/* -------------------------------------------------------------------  */

var currentDtEl = document.querySelector("#current-date");
var currentIconEl = document.querySelector("#current-icon");
var currentTempEl = document.querySelector("#currentTemp");
var currentHumidEl = document.querySelector("#currentHumid");
var currentWindEl = document.querySelector("#currentWind");
var currentUVEl = document.querySelector("#currentUV");

/* -------------------------------------------------------------------  */
/*                                  Temperature                         */
/* -------------------------------------------------------------------  */
var temp1El = document.querySelector("#temp1");
var temp2El = document.querySelector("#temp2");
var temp3El = document.querySelector("#temp3");
var temp4El = document.querySelector("#temp4");
var temp5El = document.querySelector("#temp5");

/* -------------------------------------------------------------------  */
/*                                Humidity                              */
/* -------------------------------------------------------------------  */
var humid1El = document.querySelector("#humid1");
var humid2El = document.querySelector("#humid2");
var humid3El = document.querySelector("#humid3");
var humid4El = document.querySelector("#humid4");
var humid5El = document.querySelector("#humid5");

/* -------------------------------------------------------------------  */
/*                                  Wind                                */
/* -------------------------------------------------------------------  */
var wind1El = document.querySelector("#wind1");
var wind2El = document.querySelector("#wind2");
var wind3El = document.querySelector("#wind3");
var wind4El = document.querySelector("#wind4");
var wind5El = document.querySelector("#wind5");

/* -------------------------------------------------------------------  */
/*                            Forecast days                             */
/* -------------------------------------------------------------------  */
var day1El = document.querySelector("#firstDay");
var day2El = document.querySelector("#secondDay");
var day3El = document.querySelector("#thirdDay");
var day4El = document.querySelector("#forthDay");
var day5El = document.querySelector("#fifthDay");

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
  var weatherTempEl = weather.main.temp;
  var weatherHumidEl = weather.main.humidity;
  var weatherWindEl = weather.wind.speed;
  var iconEl = weather.weather[0].icon;
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
  let cityEl = inputTxtEl.value.trim(); // TODO
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
day1El.innerHTML = day1;
console.log(day1);
/* Day 2 */
var day2 = moment().add(2, "days").format("L");
day2El.innerHTML = day2;
console.log(day2);
/* Day 3 */
var day3 = moment().add(3, "days").format("L");
day3El.innerHTML = day3;
console.log(day3);
/* Day 4 */
var day4 = moment().add(4, "days").format("L");
day4El.innerHTML = day4;
console.log(day4);
/* Day 5 */
var day5 = moment().add(5, "days").format("L");
day5El.innerHTML = day5;
console.log(day5);
