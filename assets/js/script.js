/* Todays Data */
// var t_date = moment().toString();
var t_date = moment().format('L');
document.getElementById("todaysdate").innerHTML = t_date;
console.log(t_date);

/* Five day forecast */
/* Day 1 */
var day1 = moment().add(1, 'days').format('L');
document.getElementById("firstDay").innerHTML= day1;
console.log(day1);
/* Day 2 */
var day2 = moment().add(2, 'days').format('L');
document.getElementById("secondDay").innerHTML= day2;
console.log(day2);
/* Day 3 */
var day3 = moment().add(3, 'days').format('L');
document.getElementById("thirdDay").innerHTML= day3;
console.log(day3);
/* Day 4 */
var day4 = moment().add(4, 'days').format('L');
document.getElementById("forthDay").innerHTML= day4;
console.log(day4);
/* Day 5 */
var day5 = moment().add(5, 'days').format('L');
document.getElementById("fifthDay").innerHTML= day5;
console.log(day5);
