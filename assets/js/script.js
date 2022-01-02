/* Global variable */

var weatherApiKey = "ebd153ae1727f03c10d93ef05e14e355";
var weatherApiUrl = "https://api.openweathermap.org/";
var unit = "imperial";
var weatherIconUrl = "https://openweathermap.org";
// " http://openweathermap.org/img/wn/10d@2x.png"




const inputTxtEl = document.getElementById("searchTextField");
const searchBtnEl = document.getElementById("search-btn");
const clearBtnEl = document.getElementById("clear-search-history");
const searchHistoryEl = document.getElementById("search_history");
const searchHistory = [];



/* -------------------------------------------------------------------  */
/*                              Get Weather                             */
/* -------------------------------------------------------------------  */
//   let weatherURL = + weatherApiUrl + "data/2.5/weather?q=" + searchTextField + "&appid=" + weatherApiKey + "&unit=" + unit;



/* -------------------------------------------------------------------  */
/* Show Weather */
/* -------------------------------------------------------------------  */






/* -------------------------------------------------------------------  */
/*          Event listener search click event            */
/* -------------------------------------------------------------------  */

searchBtnEl.addEventListener("click", function () {
  const lookupItem = inputTxtEl.value;
  searchHistory.push(lookupItem);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  showSearchHistory();
})


/* ------------------------------------------------------------------  */
/*  Show History */
/* ------------------------------------------------------------------  */
function showSearchHistory(){
  searchHistoryEl.innerHTML = "";
  for(let i=0; i < searchHistory.length; i++){
    const historyList = document.createElement("input");
    historyList.setAttribute("class", "form-control d-block bg-white");
    historyList.setAttribute("type", "text");
    historyList.setAttribute("readonly", "true");
    historyList.setAttribute("value", searchHistory[i]);
    historyList.addEventListener("click", function(){
      // TODO
      // getWeather
    })
    searchHistoryEl.append(historyList);
  }
}
  showSearchHistory();
  if(searchHistory.length > 0){
    // TODO
    // getWeather
}

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

// var t_date = moment().toString();
var t_date = moment().format("L");
document.getElementById("todaysdate").innerHTML = t_date;
console.log(t_date);

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
