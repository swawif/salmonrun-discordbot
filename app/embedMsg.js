/*jshint esversion:6*/
const Discord = require('discord.js');
const msgResponse = require('./jsonParse.js');

exports.embed = function embeded(a){
    const discordEmbed = new Discord.RichEmbed()                                           //Prepare the response using Discord.js's RichEmbed function
        .setTitle("The Salmon Run Bot")
        .setColor(3447003)
        .setDescription(msgResponse.timeUntilSalmon(a))
        .addField("Schedule", msgResponse.nextSchedules(a))
        .addField("Current Map",msgResponse.mapName(a))
        .addField("Current Weapons", msgResponse.weaponName(a))
        .setImage(msgResponse.imageLink(a))
        .setURL('https://github.com/swawif/salmonrun-discordbot')
        .setFooter("Source : Splatoon2.ink. Generated on ")
        .setTimestamp();

    return discordEmbed;
};