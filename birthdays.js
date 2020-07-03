const months = [ "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "novmeber", "december" ];
const calendar = require('./birthday_calendar');
const helper = require('./helperFunctions');

function getAllBirthdays() {
  var result;
  
  for (var month in calendar) {
    if (!helper.isEmpty(calendar[month])) {
      result[month] = (calendar[month]);
    }
  }
  return result;
}

function getTodayBirthdays() {
  var todayDate = new Date();
  var thisMonth = 'december';
  var thisDay = 23;
  // var thisMonth = 'july';
  // var thisDay = 10;
  // var thisMonth = months[todayDate.getMonth()];
  // var thisDay = todayDate.getDate();
  var result;

  for(var month in calendar) {
    if (!helper.isEmpty(calendar[month]) && month == thisMonth) {
      for(var day in calendar[month]) {
        if (parseInt(day) == thisDay) {
          result = calendar[month][day];
          break;
        }
      }
    } 
  }

  return result;
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


// function isEmpty(obj) {
//     for(var key in obj) {
//         if(obj.hasOwnProperty(key))
//             return false;
//     }
//     return true;
// }

// module.exports = { getAllBirthdays, getTodayBirthdays, getBirthdaysByMonth, getOtherBirthdays }

module.exports = { getAllBirthdays, getTodayBirthdays }
