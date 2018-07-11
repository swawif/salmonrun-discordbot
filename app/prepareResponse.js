/*jshint esversion: 6 */
const coopSchedule = require('../coop.json');

exports.scheduleResponse = function prepareResponse(num) {
    var currentDate = new Date();                                                   //get today time
    var start0Epoch = coopSchedule.schedules[num].start_time * 1000;                        //get salmon schedule in Epoch and then convert Epoch time to JS time
    var end0Epoch = coopSchedule.schedules[num].end_time * 1000;
    var start0 = new Date(start0Epoch);                                             //convert JS time to zulu (Z) time
    var end0 = new Date(end0Epoch);
    var diffStart = start0.getTime() / 1000 - currentDate.getTime() / 1000;         //get time remaining until start of next salmon
    var diffEnd = end0.getTime() / 1000 - currentDate.getTime() / 1000;             //get time remaining until end of current salmon
    var mapsName = coopSchedule.details[num].stage.name;                                    //get current map name
    var currentWeapon1 = coopSchedule.details[num].weapons[0].weapon.name;                  //get current weapon names
    var currentWeapon2 = coopSchedule.details[num].weapons[1].weapon.name;
    var currentWeapon3 = coopSchedule.details[num].weapons[2].weapon.name;
    var currentWeapon4 = coopSchedule.details[num].weapons[3].weapon.name;

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

};