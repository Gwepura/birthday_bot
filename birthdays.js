const months = [ "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "novmeber", "december" ];
const calendar = require('./birthday_calendar');
const helper = require('./helperFunctions');

function getAllBirthdays() {
  let result = {};

  for (var month in calendar) {
    if (!helper.isEmpty(calendar[month])) {
      result[month] = (calendar[month]);
    }
  }
  return result;
}

function getTodayBirthdays() {
  var todayDate = new Date();
  var thisMonth = months[todayDate.getMonth()];
  var thisDay = todayDate.getDate();
  // var thisDay = 10;
  let result;

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

function getBirthdaysByMonth(inputMonth) {
  let result;
  var validMonth = false;

  for(var month in calendar) {
    if (!helper.isEmpty(calendar[month]) && month == inputMonth.toLowerCase()) {
     result = calendar[month]
    }

    if (month == inputMonth.toLowerCase()) {
      validMonth = true;
    }
  }

  if (validMonth == true && !helper.isEmpty(result)) {
    return result;
  } else {
    return validMonth == true ? 'No birthdays were found for the selected month.' : "Invalid month!";
  }
}

function getOtherBirthdays(thisDay, monthPlaceHolder, cmd) {
  var thisMonth = months[monthPlaceHolder];
  let result = {};

  for(var month in calendar) {
    if (!helper.isEmpty(calendar[month]) && month == thisMonth) {
      for(var day in calendar[month]) {
        if (cmd == 'next') {
          if (parseInt(day) > thisDay) {
            result[day] = calendar[month][day];
          }
        } else {
          if (parseInt(day) < thisDay) {
            result[day] = calendar[month][day];
          }
        }
      }

    }
  }

  return result;
}

module.exports = { getAllBirthdays, getTodayBirthdays, getBirthdaysByMonth, getOtherBirthdays }
