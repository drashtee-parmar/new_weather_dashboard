/* -------------------------------------------------------------------  */
/*                                Weather                               */
/* -------------------------------------------------------------------  */
let weatherApiKey = "ebd153ae1727f03c10d93ef05e14e355";
let unit = "imperial";
/* -------------------------------------------------------------------  */
/*                        Search elements                               */
/* -------------------------------------------------------------------  */
let inputTxtEl = document.querySelector("#searchTextField");
let searchBtnEl = document.querySelector("#search-btn");
let clearBtnEl = document.querySelector("#clear-search-history");
let searchHistoryEl = document.querySelector("#search_history");
let searchHistory = [];
let cityFormEl = document.querySelector("#city-form");
let searchedCityEl = document.querySelector("#searched-city");
let pastCitySearchBtnEl = document.querySelector("#buttons");
/* -------------------------------------------------------------------  */
/*                                Current                               */
/* -------------------------------------------------------------------  */
let currentDtEl = document.querySelector("#current-date");
let currentIconEl = document.querySelector("#current-icon");
let currentTempEl = document.querySelector("#currentTemp");
let currentHumidEl = document.querySelector("#currentHumid");
let currentWindEl = document.querySelector("#currentWind");
let currentUVEl = document.querySelector("#currentUV");
let currentDescEl = document.querySelector("#current-description");
/* -------------------------------------------------------------------  */
/*                                  Temperature                         */
/* -------------------------------------------------------------------  */
let temp1El = document.querySelector("#temp1");
let temp2El = document.querySelector("#temp2");
let temp3El = document.querySelector("#temp3");
let temp4El = document.querySelector("#temp4");
let temp5El = document.querySelector("#temp5");
/* -------------------------------------------------------------------  */
/*                                Humidity                              */
/* -------------------------------------------------------------------  */
let humid1El = document.querySelector("#humid1");
let humid2El = document.querySelector("#humid2");
let humid3El = document.querySelector("#humid3");
let humid4El = document.querySelector("#humid4");
let humid5El = document.querySelector("#humid5");
/* -------------------------------------------------------------------  */
/*                                  Wind                                */
/* -------------------------------------------------------------------  */
let wind1El = document.querySelector("#wind1");
let wind2El = document.querySelector("#wind2");
let wind3El = document.querySelector("#wind3");
let wind4El = document.querySelector("#wind4");
let wind5El = document.querySelector("#wind5");
/* -------------------------------------------------------------------  */
/*                            Forecast days                             */
/* -------------------------------------------------------------------  */
let day1El = document.querySelector("#firstDay");
let day2El = document.querySelector("#secondDay");
let day3El = document.querySelector("#thirdDay");
let day4El = document.querySelector("#forthDay");
let day5El = document.querySelector("#fifthDay");
/* -------------------------------------------------------------------  */
/*                Forecast days  Descriptions                           */
/* -------------------------------------------------------------------  */
let desc1El = document.querySelector("#firstDay_desc");
let desc2El = document.querySelector("#secondDay_desc");
let desc3El = document.querySelector("#thirdDay_desc");
let desc4El = document.querySelector("#forthDay_desc");
let desc5El = document.querySelector("#fifthDay_desc");
/* -------------------------------------------------------------------  */
/*                               Icons                                 */
/* -------------------------------------------------------------------  */
let forecastIcon1El = document.querySelector("#icon1");
let forecastIcon2El = document.querySelector("#icon2");
let forecastIcon3El = document.querySelector("#icon3");
let forecastIcon4El = document.querySelector("#icon4");
let forecastIcon5El = document.querySelector("#icon5");
/* -------------------------------------------------------------------  */
/*                              Get Current Weather                     */
/* -------------------------------------------------------------------  */
const getWeather = (city) => {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=${unit}`;
  fetch(weatherUrl).then((response) => {
    response.json().then((data) => {
      showCurrentWeather(data, city);
    });
  });
};
/* -------------------------------------------------------------------  */
/*         Show Current Weather: icon, temp, humidity, wind             */
/*                https://openweathermap.org/current                    */
/* -------------------------------------------------------------------  */
const showCurrentWeather = (weather, searchQuery) => {
  searchedCityEl.textContent = searchQuery;
  let weatherTempEl = weather.main.temp;
  let weatherHumidEl = weather.main.humidity;
  let weatherWindEl = weather.wind.speed;
  let weatherDescription = weather.weather[0].description;
  let iconEl = weather.weather[0].icon;
  currentIconEl.src = `https://openweathermap.org/img/wn/${iconEl}@2x.png`;
  currentDescEl.innerHTML = weatherDescription;
  currentTempEl.innerHTML = weatherTempEl;
  currentHumidEl.innerHTML = weatherHumidEl;
  currentWindEl.innerHTML = weatherWindEl;
};
/* -------------------------------------------------------------------  */
/*                              Get Forecast                            */
/* -------------------------------------------------------------------  */
const getForecast = (city) => {
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=${unit}`;
  fetch(forecastURL).then((response) => {
    response.json().then((data) => {
      showForecast(data, city);
      /* UVI 
      curl --location --request GET 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,hourly&units=imperial&appid=ebd153ae1727f03c10d93ef05e14e355'
      */
      let lat = data.city.coord.lat;
      let lon = data.city.coord.lon;
      const getUVIndex = (city) => {
        let UVIndexURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=${unit}&appid=${weatherApiKey}`;
        fetch(UVIndexURL).then((response) => {
          response.json().then((data) => {
            console.log(data);
            currentUVEl.innerHTML = data.daily[0].uvi;
            if (data.daily[0].uvi <= 3) {
              currentUVEl.setAttribute(`class`, `favorableLevel`);
            } else if (data.daily[0].uvi > 3 && data.daily[0].uvi <= 10) {
              currentUVEl.setAttribute(`class`, `moderateLevel`);
            } else {
              currentUVEl.setAttribute(`class`, `severeLevel`);
            }
          });
        });
      };
      getUVIndex();
    });
  });
};
const showForecast = (forecast, searchQuery) => {
  searchedCityEl.textContent = searchQuery;
  /* First day forecast */
  temp1El.innerHTML = forecast.list[0].main.temp;
  humid1El.innerHTML = forecast.list[0].main.humidity;
  wind1El.innerHTML = forecast.list[0].wind.speed;
  desc1El.innerHTML = forecast.list[0].weather[0].description;
  let icon1El = forecast.list[0].weather[0].icon;
  forecastIcon1El.src = `https://openweathermap.org/img/wn/${icon1El}@2x.png`;
  /* Second day forecast */
  temp2El.innerHTML = forecast.list[1].main.temp;
  humid2El.innerHTML = forecast.list[1].main.humidity;
  wind2El.innerHTML = forecast.list[1].wind.speed;
  desc2El.innerHTML = forecast.list[1].weather[0].description;
  let icon2El = forecast.list[1].weather[0].icon;
  forecastIcon2El.src = `https://openweathermap.org/img/wn/${icon2El}@2x.png`;
  /* Third day forecast */
  temp3El.innerHTML = forecast.list[2].main.temp;
  humid3El.innerHTML = forecast.list[2].main.humidity;
  wind3El.innerHTML = forecast.list[2].wind.speed;
  desc3El.innerHTML = forecast.list[2].weather[0].description;
  let icon3El = forecast.list[2].weather[0].icon;
  forecastIcon3El.src = `https://openweathermap.org/img/wn/${icon3El}@2x.png`;
  /* Forth day forecast */
  temp4El.innerHTML = forecast.list[3].main.temp;
  humid4El.innerHTML = forecast.list[3].main.humidity;
  wind4El.innerHTML = forecast.list[3].wind.speed;
  desc4El.innerHTML = forecast.list[3].weather[0].description;
  let icon4El = forecast.list[3].weather[0].icon;
  forecastIcon4El.src = `https://openweathermap.org/img/wn/${icon4El}@2x.png`;
  /* Fifth day forecast */
  temp5El.innerHTML = forecast.list[4].main.temp;
  humid5El.innerHTML = forecast.list[4].main.humidity;
  wind5El.innerHTML = forecast.list[4].wind.speed;
  desc5El.innerHTML = forecast.list[4].weather[0].description;
  let icon5El = forecast.list[4].weather[0].icon;
  forecastIcon5El.src = `https://openweathermap.org/img/wn/${icon5El}@2x.png`;
};
/* -------------------------------------------------------------------  */
/*          handle submit event                                         */
/*          show and save list button with history                      */
/*          Retrive from local storage                                  */
/* -------------------------------------------------------------------  */
const formSubmitHandler = (event) => {
  event.preventDefault();
  let cityEl = inputTxtEl.value.trim();
  let btn = document.createElement("button");
  btn.className = "searched-list btn";
  btn.innerHTML = cityEl;
  buttons.appendChild(btn);
  listCity();
  if (!(!searchHistory.includes(cityEl) && cityEl !== "")) {
  } else {
    searchHistory.push(cityEl);
  }
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  if (!cityEl) {
    alert("Enter a city name to get the weather!");
  } else {
    getWeather(cityEl);
    getForecast(cityEl);
    inputTxtEl.value = "";
  }
};
const listCity = () => {
  searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (searchHistory) {
    return;
  }
  searchHistory = [];
};
const saveSearch = () => {
  for (let i = 0; i < searchHistory.length; i++) {
    let btn = document.createElement("button");
    btn.className = "searched-list btn";
    btn.innerHTML = searchHistory[i];
    buttons.appendChild(btn);
  }
  /* -------------------------------------------------------------------  */
  /*                        Past Search Button                            */
  /* -------------------------------------------------------------------  */
  let pastListBtnEl = document.querySelectorAll(".searched-list");
  for (let i = 0; i < pastListBtnEl.length; i++) {
    pastListBtnEl[i].addEventListener("click", (event) => {
      getWeather(event.target.textContent);
      getForecast(event.target.textContent);
    });
  }
};
/* Listen to the submitted query form */
cityFormEl.addEventListener("submit", formSubmitHandler);
listCity();
saveSearch();
/* ------------------------------------------------------------------  */
/* Google API autocomplete: enable Maps JavaScript API and Places API  */
/*                        Need to be a function                         */
/* ------------------------------------------------------------------- */
function initAutocomplete() {
  // Create the search box and link it to the UI element.
  const searchTxtEl = document.getElementById("searchTextField");
  const searchBox = new google.maps.places.SearchBox(searchTxtEl);
  // map.controls[google.maps.ControlPosition].push(searchTxtEl);
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    if (places.length !== 0) {
    } else {
      return;
    }
  });
}
/* -------------------------------------------------------  */
/*                  Today's Data                             */
/* -------------------------------------------------------  */
let currentDt = moment().format("dddd, MMMM Do, h:mm a");
currentDtEl.innerHTML = currentDt;
console.log(currentDt);
/* -------------------------------------------------------  */
/*                  Five day forecast                       */
/* -------------------------------------------------------  */
/* Day 1 */
let day1 = moment().add(1, "days").format("L");
day1El.innerHTML = day1;
console.log(day1);
/* Day 2 */
let day2 = moment().add(2, "days").format("L");
day2El.innerHTML = day2;
console.log(day2);
/* Day 3 */
let day3 = moment().add(3, "days").format("L");
day3El.innerHTML = day3;
console.log(day3);
/* Day 4 */
let day4 = moment().add(4, "days").format("L");
day4El.innerHTML = day4;
console.log(day4);
/* Day 5 */
let day5 = moment().add(5, "days").format("L");
day5El.innerHTML = day5;
console.log(day5);

/* Default location */
getWeather("ATLANTA, GA, USA");
getForecast("ATLANTA, GA, USA");