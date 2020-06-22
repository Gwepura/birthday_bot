const calendar = require('./birthday_calendar');

function getAllBirthdays() {
  var list = {};
  
  for (var month in calendar) {
    if (!(isEmpty(calendar[month]))) {
      list[month] = (calendar[month]);
    }
  }
  return list;
}

// function getBirthdaysByMonth(month) {
//for (var month in calendar) {
//   for (var day in calendar[month]) {
//     let current_month = calendar[month];
//     console.log(`${day}: ${current_month[day]}`);
//   }
//
//
// }
// }


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = { getAllBirthdays }
