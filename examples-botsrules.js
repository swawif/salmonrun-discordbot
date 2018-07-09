const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');

//load the config
const config = require('./config.json');

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      // super-secret recipe to call events with all their proper arguments *after* the `client` var.
      client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
  });

//The Message listener function
client.on("message", (message) => {
    // Exit and stop if the prefix is not there or if user is a bot
    if (message.author.bot) return;                                                     //if the author of the message is bot, dont send anything
    if(message.content.indexOf(config.prefix) !== 0) return;                            //if the message don't contain the prefix, dont send anything


    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);       //some wonderful code to delete the prefix and to split arguments
    const command = args.shift().toLowerCase(); 

    switch(command){
        case "ping" :
            message.channel.send("pong");
        break;
        
        case "pong" :
            message.channel.send("ping");
        break;
    }
});

console.log('bot started successfully');

client.login(config.token);

