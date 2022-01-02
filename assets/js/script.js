/* Global variable */

const weatherApiKey = "ebd153ae1727f03c10d93ef05e14e355";
const weatherApiUrl = "api.openweathermap.org/data/2.5/";
const unit = "metric";
// const searchHistory = [];
const weatherIconUrl = "openweathermap.org";

/* Dom element reference */

var searchBtnEl = document.querySelector("search-btn");
var cityNameHistoryEl = document.getElementById("clear-history-btn");
var cityNameListEl = document.getElementById("city-list");
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
