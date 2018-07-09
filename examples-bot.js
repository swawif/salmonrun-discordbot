const Discord = require("discord.js");
const client = new Discord.Client();
const request = require('request');

//init the bot
client.on("ready", () => {
  console.log("I am ready!");
});

//response to !luigi message
client.on("message", (message) => {
  if (message.content.startsWith("!luigi")) {
    message.channel.send("Number One!");
  }
});

client.login("NDY1Njg0MDg2MTY2NjUwODgz.DiRFtg.rHe2wB5yw2lunpxirqk2nmfcYtU");

const url = "https://splatoon2.ink/data/coop-schedules.json";

client.on("message",(message) =>{
  if(message.content.startsWith("!salmon")){
    request({ url: url, json: true}, 
      function (error, response, body) {
        if (error) {
            console.log('error while getting json') // Print the json response
        };
        var start0Epoch = body.schedules[0].start_time;
        var end0Epoch = body.schedules[0].end_time;
        var a = new Date(start0Epoch);
        console.log(a);
      });
  }
})

client.on("message",(message) =>{
  if(message.content.startsWith("!salmonweaps")){
    request({ url: url, json: true}, 
      function (error, response, body) {
        if (error) {
            console.log('error while getting json') // Print the json response
        };
        var timeSchedule1 = body.schedules[0].start_time;
        var weapons = body.details[0].weapons[0];
        message.channel.send(weapons);
      });
  }
})

request({ url: url, json: true}, 
  function (error, response, body) {
    if (error) {
        console.log('error while getting json') // Print the json response
    };
    var timeSchedule1 = body.schedules[0];
    var weapons = body.details[0];
    console.log(timeSchedule1);
    console.log(weapons);
});