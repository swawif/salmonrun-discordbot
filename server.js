const Discord = require("discord.js");
const client = new Discord.Client();
const request = require('request');
const url = "https://splatoon2.ink/data/coop-schedules.json";
const config = require('./config.json');

// convert seconds to Hour minute and seconds
function secondsToHms(d){
    d = Number(d);
    var h = Math.floor(d/3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    return hDisplay + mDisplay;
}

// make a simple response
client.on("message", (message) => {
    if (message.content.startsWith("!luigi")) {
      message.channel.send("Number One!");
    }
    if (message.content.startsWith("!salmon")) {

        request({url: url, json: true},                                                     //my horrible code to process, parse, and send the salmon run schedule
            function (error, response, body) {
            if (!error && response.statusCode === 200) {
            
                console.log('successfully get json from splatoon2.ink');                    //Successfull fetch = Happy Face

                //set the variables to get
                var currentDate = new Date();                                               //get today time
                var start0Epoch = body.schedules[0].start_time * 1000;                      //get salmon schedule in Epoch and then convert Epoch time to JS time
                var end0Epoch = body.schedules[0].end_time * 1000;
                var start0 = new Date(start0Epoch);                                         //convert JS time to zulu (Z) time
                var end0 = new Date(end0Epoch);
                var diffStart = start0.getTime() / 1000 - currentDate.getTime() / 1000;     //get time remaining until start of next salmon
                var diffEnd = end0.getTime() / 1000 - currentDate.getTime() / 1000;         //get time remaining until end of current salmon
                var mapsName = body.details[0].stage.name;                                  //get current map name
                var currentWeapon1 = body.details[0].weapons[0].weapon.name;                //get current weapon names
                var currentWeapon2 = body.details[0].weapons[1].weapon.name;
                var currentWeapon3 = body.details[0].weapons[2].weapon.name;
                var currentWeapon4 = body.details[0].weapons[3].weapon.name;
                //var weaponArray = [currentWeapon1, currentWeapon2, currentWeapon3, currentWeapon4];                       //Unused
                var weaponString = currentWeapon1 + ", " + currentWeapon2 + ", " + currentWeapon3 + ", " + currentWeapon4;  //concatenate all weapon into one gigantic string
                var imageLink = '';

                switch(mapsName){
                    default:
                        imageLink = 'https://cdn.wikimg.net/en/splatoonwiki/images/5/5f/Salmon_Run_logo.png';
                        break;
                    case "Salmonid Smokeyard" : 
                        imageLink = 'https://cdn.wikimg.net/en/splatoonwiki/images/c/c7/S2_Stage_Salmonid_Smokeyard.png';
                        break;
                    case "Spawning Grounds" : 
                        imageLink = 'https://cdn.wikimg.net/en/splatoonwiki/images/2/29/S2_Stage_Spawning_Grounds.png';
                        break;
                    case "Marooner's Bay" : 
                        imageLink = 'https://cdn.wikimg.net/en/splatoonwiki/images/6/6c/S2_Stage_Marooner%27s_Bay.png';
                        break;
                    case "Lost Outpost" : 
                        imageLink = 'https://cdn.wikimg.net/en/splatoonwiki/images/6/68/S2_Stage_Lost_Outpost.png';
                        break;

                }

                //convert to date
                var d1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleDateString();  //Convert JS-Epoch to local date
                var t1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleTimeString();  //Convert JS-Epoch to local time
                var d2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleDateString();
                var t2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleTimeString();

                var nextSchedule = "";                                                          //Set nextSchedule variable
                var timeUntil = "";                                                             //set timeUntil variable 

                if(diffStart < 0){                                                              //Adjust timeUntil according to current salmon run time (Available or not)
                    timeUntil = "Ends in " + secondsToHms(diffEnd);
                    nextSchedule = "Ends at " + d2 + ", " + t2;                                        
                } else {
                    timeUntil = "Starts in " + secondsToHms(diffStart);
                    nextSchedule = "Starts at " + d1 + ", " + t1;
                }

              
                const embed = new Discord.RichEmbed()                                           //Prepare the response using Discord.js's RichEmbed function
                    .setTitle("Salmon run schedule")
                    .setColor(3447003)
                    .setDescription(timeUntil)
                    .addField("Schedule", nextSchedule)
                    .addField("Current Map",mapsName)
                    .addField("Current Weapons", weaponString)
                    .setImage(imageLink)
                    .setFooter("Source : Splatoon2.ink. Generated on ")
                    .setTimestamp();

                console.log("Today (zulu) is : " + currentDate);                                //debug making sure the variables are correct
                console.log("Start zulu time : " + start0); 
                console.log("End zulu time : " + end0);
                console.log("Time until Start " + diffStart);
                console.log("Time until End " + diffEnd);
                console.log("nextSchedule " + nextSchedule);
                console.log("time until next " + timeUntil);
                console.log("The weapons are : " + weaponString);
                console.log(imageLink);
                console.log(embed);

                message.channel.send({embed});                                                  //Send the message to discord

            }
        
        });
    }
    if (message.content.startsWith("!nextsalmon")) {

        request({url: url, json: true},                                                     //my horrible code to process, parse, and send the salmon run schedule
            function (error, response, body) {
            if (!error && response.statusCode === 200) {
            
                console.log('successfully get json from splatoon2.ink');                    //Successfull fetch = Happy Face

                //set the variables to get
                var currentDate = new Date();                                               //get today time
                var start0Epoch = body.schedules[1].start_time * 1000;                      //get salmon schedule in Epoch and then convert Epoch time to JS time
                var end0Epoch = body.schedules[1].end_time * 1000;
                var start0 = new Date(start0Epoch);                                         //convert JS time to zulu (Z) time
                var end0 = new Date(end0Epoch);
                var diffStart = start0.getTime() / 1000 - currentDate.getTime() / 1000;     //get time remaining until start of next salmon
                var diffEnd = end0.getTime() / 1000 - currentDate.getTime() / 1000;         //get time remaining until end of current salmon
                var mapsName = body.details[1].stage.name;                                  //get current map name
                var currentWeapon1 = body.details[1].weapons[0].weapon.name;                //get current weapon names
                var currentWeapon2 = body.details[1].weapons[1].weapon.name;
                var currentWeapon3 = body.details[1].weapons[2].weapon.name;
                var currentWeapon4 = body.details[1].weapons[3].weapon.name;
                //var weaponArray = [currentWeapon1, currentWeapon2, currentWeapon3, currentWeapon4];                       //Unused
                var weaponString = currentWeapon1 + ", " + currentWeapon2 + ", " + currentWeapon3 + ", " + currentWeapon4;  //concatenate all weapon into one gigantic string
                var imageLink = '';

                switch(mapsName){
                    default:
                        imageLink = 'https://cdn.wikimg.net/en/splatoonwiki/images/5/5f/Salmon_Run_logo.png';
                        break;
                    case "Salmonid Smokeyard" : 
                        imageLink = 'https://cdn.wikimg.net/en/splatoonwiki/images/c/c7/S2_Stage_Salmonid_Smokeyard.png';
                        break;
                    case "Spawning Grounds" : 
                        imageLink = 'https://cdn.wikimg.net/en/splatoonwiki/images/2/29/S2_Stage_Spawning_Grounds.png';
                        break;
                    case "Marooner's Bay" : 
                        imageLink = 'https://cdn.wikimg.net/en/splatoonwiki/images/6/6c/S2_Stage_Marooner%27s_Bay.png';
                        break;
                    case "Lost Outpost" : 
                        imageLink = 'https://cdn.wikimg.net/en/splatoonwiki/images/6/68/S2_Stage_Lost_Outpost.png';
                        break;

                }

                //convert to date
                var d1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleDateString();  //Convert JS-Epoch to local date
                var t1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleTimeString();  //Convert JS-Epoch to local time
                var d2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleDateString();
                var t2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleTimeString();

                var timeUntil = "";                                                          //Set nextSchedule variable
                var nextSchedule = "";

                if(diffStart < 0){                                                              //Adjust nextSchedule according to current salmon run time (Available or not)
                    timeUntil = "Ends in " + secondsToHms(diffEnd);
                    nextSchedule = "Ends at " + d2 + ", " + t2;
                } else {
                    timeUntil = "Starts in " + secondsToHms(diffStart);
                    nextSchedule = "Starts at " + d1 + ", " + t1;
                }

              
                const embed = new Discord.RichEmbed()                                           //Prepare the response using Discord.js's RichEmbed function
                    .setTitle("Salmon run schedule")
                    .setColor(3447003)
                    .setDescription(timeUntil)
                    .addField("Schedule",nextSchedule)
                    .addField("Current Map",mapsName)
                    .addField("Current Weapons", weaponString)
                    .setImage(imageLink)
                    .setFooter("Source : Splatoon2.ink. Generated on ")
                    .setTimestamp();

                console.log("Today (zulu) is : " + currentDate);                                //debug making sure the variables are correct
                console.log("Start zulu time : " + start0); 
                console.log("End zulu time : " + end0);
                console.log("Time until Start " + diffStart);
                console.log("Time until End " + diffEnd);
                console.log("nextSchedule " + timeUntil);
                console.log("The weapons are : " + weaponString);
                console.log(imageLink);
                console.log(embed);

                message.channel.send({embed});                                                  //Send the message to discord

            }
        
        });
    }

  });

client.login(config.token);

console.log("I'm Ready!");                              //startup message
console.log(Date());                                    //Print today's date