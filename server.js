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
    var s = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}

// make a simple response
client.on("message", (message) => {
    if (message.content.startsWith("!luigi")) {
      message.channel.send("Number One!");
    }
  });

client.login(config.token);

console.log("I'm Ready!"); //startup message
console.log(Date());

//make salmon run schedule response
client.on("message", (message) => {
    if (message.content.startsWith("!salmon")) {

        request({url: url, json: true},
            function (error, response, body) {
            if (!error && response.statusCode === 200) {
            
                console.log('successfully get json from splatoon2.ink') // Print the json response

                //set the variables to get
                var currentDate = new Date();                                               //get today time
                var start0Epoch = body.schedules[0].start_time * 1000;                      //get salmon schedule in Epoch and then convert Epoch time to JS time
                var end0Epoch = body.schedules[0].end_time * 1000;
                var start0 = new Date(start0Epoch);                                         //convert JS time to zulu time
                var end0 = new Date(end0Epoch);
                var diffStart = start0.getTime() / 1000 - currentDate.getTime() / 1000;     //get time remaining until start of next salmon
                var diffEnd = end0.getTime() / 1000 - currentDate.getTime() / 1000;         //get time remaining until end of current salmon
                var mapsName = body.details[0].stage.name                                   //get current map name
                var currentWeapon1 = body.details[0].weapons[0].weapon.name;                //get current weapon names
                var currentWeapon2 = body.details[0].weapons[1].weapon.name;
                var currentWeapon3 = body.details[0].weapons[2].weapon.name;
                var currentWeapon4 = body.details[0].weapons[3].weapon.name;
                //var weaponArray = [currentWeapon1, currentWeapon2, currentWeapon3, currentWeapon4];                   //Unused
                var weaponString = currentWeapon1 + ", " + currentWeapon2 + ", " + currentWeapon3 + ", " + currentWeapon4;  //concatenate all weapon into one string

                //debug making sure the variables are correct
                console.log(start0); 
                console.log(end0);
                console.log(currentDate);
                console.log(diffStart);
                console.log(diffEnd);
                console.log(weaponString);

                //convert to date
                var d1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleDateString(); //Convert JS-Epoch to local date
                var t1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleTimeString(); //Convert JS-Epoch to local time
                var d2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleDateString();
                var t2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleTimeString();

                var nextSchedule = "";                                                          //Set nextSchedule variable

                if(diffStart < 0){
                    nextSchedule = "Ends in " + secondsToHms(diffEnd);
                } else {
                    nextSchedule = "Starts in " + secondsToHms(diffStart);
                };
                console.log("nextSchedule " + nextSchedule); //print result in console

                message.channel.send({embed: {
                    color: 3447003,
                    title: "Salmon run schedule",
                    description: nextSchedule,
                    fields: [
                        {
                        name: "Current map",
                        value: mapsName
                        },
                        {
                        name: "Weapon",
                        value: weaponString
                        },
                    ],
                    footer: {
                        text: "Source : splatoon2.ink"
                      }
                  }
                });
            }
        
        });
    }
  });

/* HALL OF SHAME - my personal experimentation code block - DON'T JUDGE ME ;-;

request({url: url, json: true},
    function astaga(error, response, body) {
    if (!error && response.statusCode === 200) {
    
        console.log('successfully get json from splatoon2.ink') // Print the json response
        var start0Epoch = body.schedules[0].start_time * 1000; //convert Epoch time to JS-Epoch time
        var end0Epoch = body.schedules[0].end_time * 1000;
            
        console.log(start0Epoch); //Debug - Print new Epoch time
        console.log(end0Epoch);
        
        var d1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleDateString(); //Convert JS-Epoch to local date
        var t1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleTimeString(); //Convert JS-Epoch to local time
        var d2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleDateString();
        var t2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleTimeString();
        console.log("salmon run will start at "+d1+" on "+t1+" and ends at "+d2+" on "+t2); //print result in console
    }});
*/
/*//REMEMBER, DATE IN JS IS COUNTED IN miliSeconds NOT Seconds LIKE EPOCH DO
var schedule = 1531202400*1000; //whatever the splatoon date is
var d = new Date( new Date(schedule).toUTCString() ).toLocaleString();
console.log(d);
*/