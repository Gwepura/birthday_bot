require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const help = require('./help');
const birthdays = require('./birthdays');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
  var message = msg.content;

  if (message.substring(0, 3) == 'b/ ') {
    var args = message.substring(3).split(' ');
    var cmd = args[0];

    switch(cmd) {
      case 'ping':
        msg.reply('pong');
        break;
      case 'all':
        msg.reply(showAllBirthdays());
        break;
      case 'help':
        msg.reply(showHelp());
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

function showAllBirthdays() {
  var calendar = birthdays.getAllBirthdays();
  var message = "";

  for (var month in calendar) {
    message = message + `\n${month.toUpperCase()}: `;
    for (var day in calendar[month]) {
      var current_day = calendar[month][day];

      if(typeof(current_day) == 'string') {
        message = message + `\n\t${day.padEnd(3, ' ')}: ${current_day}`;
      } else {
        for (var i = 0; i < current_day.length; i++) {
          message = message + `\n\t${day.padEnd(3, ' ')}: ${current_day[i]}`;
        }
      }
    }
  }

  return message;
}

client.login(process.env.DISCORD_TOKEN);
