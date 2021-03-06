require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const help = require('./help');
const birthdays = require('./birthdays');
const helper = require('./helperFunctions');

client.on('message', msg => {
  var message = msg.content;

  if (message.substring(0, 3) == 'b/ ') {
    var args = message.substring(3).split(' ');
    var cmd = args[0];
    var inputMonth = '';

    if (cmd.includes('month')) {
      inputMonth = message.substring(9, message.length).toLowerCase();
    }

    switch(cmd) {
      case 'ping':
        msg.reply('pong');
        break;
      case 'all':
        msg.reply(showAllBirthdays());
        break;
      case 'help':
        msg.reply(showHelp());
        break;
      case 'month':
        msg.reply(showBirthdaysByMonth(inputMonth));
        break;
      case 'past':
        msg.reply(showOtherBirthdays(cmd));
        break;
      case 'next':
        msg.reply(showOtherBirthdays(cmd));
        break;
      case 'today':
        msg.reply(showTodayBirthdays());
        break;
      case 'login':
        msg.reply(startBirthdayBot());
        break;
    }
  }
});

function showHelp() {
  var helpList = help.helpList();
  var message = "";

  for (var cmd in helpList) {
    message = message + `\n${cmd.padEnd(20, ' ')} ${helpList[cmd]}`;
  }

  return message;
}

function showTodayBirthdays() {
  var calendarMonth = birthdays.getTodayBirthdays();
  var message = "Happy birthday ";

  if (!(helper.isEmpty(calendarMonth))) {
    if (typeof(calendarMonth) == 'object') {
      for (let i = 0; i < calendarMonth.length; i++) {
        if (i == calendarMonth.length - 1) {
          message = message + ` and ${calendarMonth[i]}`;
        } else if (i == 0) {
          message = message + `${calendarMonth[i]}`;
        } else {
          message = message + `, ${calendarMonth[i]}`;
        }
      }
    } else {
      message = message + calendarMonth;
    }
  } else {
    message = "There are no birthdays to show today."
  }

  return message;
}

function showAllBirthdays() {
  var calendar = birthdays.getAllBirthdays();
  var message = "";

  for (var month in calendar) {
    message = message + `\n${month.toUpperCase()}: `;

    for (var day in calendar[month]) {
      message = message + formatBirthdayMessage(day, calendar[month][day]);
    }
  }

  return message;
}

function showBirthdaysByMonth(inputMonth) {
  var calendarMonth = birthdays.getBirthdaysByMonth(inputMonth);
  var message = "";

  if (typeof(calendarMonth) == 'object') {
    message = `\n${inputMonth.toUpperCase()} birthdays: `;

    for (var day in calendarMonth) {
      message = message + formatBirthdayMessage(day, calendarMonth[day]);
    }
  } else {
    message = calendarMonth;
  }

  return message;
}

function showOtherBirthdays(cmd) {
  var date = new Date();
  var calendarMonth = birthdays.getOtherBirthdays(date.getDate(), date.getMonth(), cmd);
  var message = "";

  if (!(helper.isEmpty(calendarMonth))) {
    message = (cmd == "past" ? "Previous birthdays for this month:" : "Upcoming birthdays for the month:");

    for (var day in calendarMonth) {
      message = message + formatBirthdayMessage(day, calendarMonth[day]);
    }
  } else {
    message = "No birthdays to show";
  }

  return message;
}

function formatBirthdayMessage(key, value) {
  var message = "";

  if(typeof(value) == 'string') {
    message = message + `\n\t${key.padEnd(3, ' ')}: ${value}`;
  } else {
    for (var i = 0; i < value.length; i++) {
      message = message + `\n\t${key.padEnd(3, ' ')}: ${value[i]}`;
    }
  }

  return message;
}

client.login(process.env.DISCORD_TOKEN);
