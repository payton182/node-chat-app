var moment = require('moment');

var timeStamp = moment().valueOf();

var createdAt = 1000;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
