/*jshint esversion: 6 */
//this is the script responsible for creating the responses
const coopSchedule = require('../coop.json');

function secondsToHms(d){
    d = Number(d);
    var h = Math.floor(d/3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    return hDisplay + mDisplay;
}

exports.timeUntilSalmon = function timeUntil(num){

    var currentDate = new Date();
    var start0Epoch = coopSchedule.schedules[num].start_time * 1000;
    var end0Epoch = coopSchedule.schedules[num].end_time * 1000;
    var start0 = new Date(start0Epoch);
    var end0 = new Date(end0Epoch);
    var timeUntil = "";



    var diffStart = start0.getTime() / 1000 - currentDate.getTime() / 1000;
    var diffEnd = end0.getTime() / 1000 - currentDate.getTime() / 1000;

    var d1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleDateString();  //Convert JS-Epoch to local date
    var t1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleTimeString();  //Convert JS-Epoch to local time
    var d2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleDateString();
    var t2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleTimeString();

    if(diffStart < 0){                                                              //Adjust timeUntil according to current salmon run time (Available or not)
        timeUntil = "Ends in " + secondsToHms(diffEnd);                                     
    } else {
        timeUntil = "Starts in " + secondsToHms(diffStart);
    }

    console.log(currentDate, start0, start0Epoch, end0, end0Epoch, timeUntil);

    return timeUntil;

};

//console.log("TIMEUNTIL : " +timeUntil(2));

exports.nextSchedules = function nextSalmon(a){

    var currentDate = new Date();
    var start0Epoch = coopSchedule.schedules[a].start_time * 1000;
    var end0Epoch = coopSchedule.schedules[a].end_time * 1000;
    var start0 = new Date(start0Epoch);
    var nextSchedule = "";

    var diffStart = start0.getTime() / 1000 - currentDate.getTime() / 1000;

    var d1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleDateString();  //Convert JS-Epoch to local date
    var t1 = new Date( new Date(start0Epoch).toUTCString() ).toLocaleTimeString();  //Convert JS-Epoch to local time
    var d2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleDateString();
    var t2 = new Date( new Date(end0Epoch).toUTCString() ).toLocaleTimeString();

    if(diffStart < 0){                                                              //Adjust timeUntil according to current salmon run time (Available or not)
        nextSchedule = "Ends at " + d2 + ", " + t2;                                        
    } else {
        nextSchedule = "Starts at " + d1 + ", " + t1;
    }

    //console.log(nextSchedule);

    return nextSchedule;

};

exports.mapName = function mapNames(a) {
    var currentMap = "";
    if(a>1){
        console.log("Error! - No map has been assigned for this schedule yet");
        currentMap = "No map has been assigned for this schedule yet";
    }
    currentMap = coopSchedule.details[a].stage.name;

    console.log(currentMap);

    return currentMap;
};

exports.weaponName = function weapons(a){

    var weaponArray = new Array();
    if ( a > 1){
        weaponString = "No weapons has been assigned"
    } else {
        for (i = 0; i < 4; i++){
            const weapons = coopSchedule.details[a].weapons[i];
            const weapon = (weapons.weapon || weapons.coop_special_weapon);
            console.log(weapon.name);
            weaponArray.push(weapon.name);
            console.log(weaponArray);
        }
    }
    weaponString = weaponArray[0] + ", " + weaponArray[1] + ", " + weaponArray[2] + ", " + weaponArray[3];
    return weaponString;
};

exports.imageLink = function image(a){
    var currentMap = coopSchedule.details[a].stage.name;
    var mapImage = "";
    switch(currentMap){
        default:
            mapImage = 'https://cdn.wikimg.net/en/splatoonwiki/images/5/5f/Salmon_Run_logo.png';
            break;
        case "Salmonid Smokeyard" : 
            mapImage = 'https://cdn.wikimg.net/en/splatoonwiki/images/c/c7/S2_Stage_Salmonid_Smokeyard.png';
            break;
        case "Spawning Grounds" : 
            mapImage = 'https://cdn.wikimg.net/en/splatoonwiki/images/2/29/S2_Stage_Spawning_Grounds.png';
            break;
        case "Marooner's Bay" : 
            mapImage = 'https://cdn.wikimg.net/en/splatoonwiki/images/6/6c/S2_Stage_Marooner%27s_Bay.png';
            break;
        case "Lost Outpost" : 
            mapImage = 'https://cdn.wikimg.net/en/splatoonwiki/images/6/68/S2_Stage_Lost_Outpost.png';
            break;

    }
    console.log(mapImage);
    return mapImage;
};