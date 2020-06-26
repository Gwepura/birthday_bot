require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const help = require('./help');
const birthdays = require('./birthdays');
const helperFunctions = require('./helperFunctions');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

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
  var message = "";
  if (!(helperFunctions.isEmpty(calendarMonth))) {
    console.log(calendarMonth);
  }
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

  if (calendarMonth) {
    if (typeof(calendarMonth) == 'object') {
      message = `\n${inputMonth.toUpperCase()} birthdays: `;

      for (var day in calendarMonth) {
        message = message + formatBirthdayMessage(day, calendarMonth[day]);
      }
    } else {
      message = calendarMonth;
    }
    
  } else {
    message = "Invalid month!";
  }
  
  return message;
}

function showOtherBirthdays(cmd) {
  var date = new Date();
  var calendarMonth = birthdays.getOtherBirthdays(date.getDate(), date.getMonth(), cmd);
  var message = "";

  if (!(helperFunctions.isEmpty(calendarMonth))) {
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
