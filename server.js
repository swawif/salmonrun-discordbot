/*jshint esversion: 6 */
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');
const localCoopJson = require('./coop.json');
const getJson = require('./app/getJson.js');
const embedMsg = require('./app/embedMsg.js');

//Debug
//getJson.getCoopSchedule();
//console.log(localCoopJson.schedules[0].end_time);
//console.log("TIMEUNTIL : " + msgResponse.timeUntilSalmon(0));
//console.log("NEXTSCHEDULE : " + msgResponse.nextSchedules(0));

// Responses list (!luigi, !salmon, !nextsalmon)
client.on("message", (message) => {
    if (message.content.startsWith("!luigi")) {                                 //SUPER SECRET RESPONSE
      message.channel.send("Number One!");
    }

    if (message.content.startsWith("!salmon")) {                                //Replies with current salmon run schedule
        console.log('GET !salmon request');
        var currentDate = new Date();
        var a = 0;
        if(localCoopJson.schedules[a].end_time * 1000 - currentDate <0){        //check if coop.json is outdated or not. if outdated, call getCoopSchedule to download the new coop.json
            console.log("JSON Cache is outdated! Refreshing...");
            getJson.getCoopSchedule();
        }
        console.log('JSON Cache is up to date!');

        var embed = embedMsg.embed(a);                                          //Ask embedMsg.JS to prep the file for sending

        message.channel.send({embed});                                          //Actually sends the message to discord
        console.log("Message has been succesfully sent");

    }

    if (message.content.startsWith("!nextsalmon")) {                            //Replies with the next salmon run schedule
        console.log('GET !nextsalmon request');
        var currentDate = new Date();
        var a = 1;
        if(localCoopJson.schedules[a].end_time * 1000 - currentDate <0){        //check if coop.json is outdated or not. if outdated, call getCoopSchedule to download the new coop.json
            console.log("JSON Cache is outdated! Refreshing...");
            getJson.getCoopSchedule();
        }
        console.log('JSON Cache is up to date!')
        var embed = embedMsg.embed(a);                                          //Ask embedMsg.JS to prep the file for sending

        message.channel.send({embed});                                          //Actually sends the message to discord
        console.log("Message has been succesfully sent");

    }

  });

client.login(config.token);

console.log("I'm Ready!");                              //startup message
console.log("Bot started at " + Date());                //Print today's date