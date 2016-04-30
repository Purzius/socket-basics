// use unix as it takes care of timezones

var moment = require('moment');
var now = moment();

console.log(now.format());

// utc unix in seconds
console.log(now.format('X'));

// javascript unix in milliseconds
console.log(now.format('x'));

// get utc javascript unix timestamp as number
console.log(now.valueOf());

var timestamp = 1462010683993;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('H:mm a'));


// now.subtract(1, 'year');

// console.log(now.format());
// console.log(now.format('MMM Do YYYY, H:mm:ss'));