/*jshint esversion: 6 */
const request = require('request');
const fs = require('fs');
const coopUrl = "https://splatoon2.ink/data/coop-schedules.json";

exports.getCoopSchedule = function getCoopJson(){
    fs.stat('coop.json', (err) => {
      if (err){
        console.log("No JSON Found!");
      } else {console.log("coop.json found! updating...");}
    });
    request({url: coopUrl, json: true},
      function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("successfully retrieved coop-schedules.json from splatoon2.ink");
        console.log(body);
        var coopJson = body;
        fs.writeFile('coop.json', JSON.stringify(coopJson), (err) => {
          if (err) throw err;
          console.log('coop.json has been updated at ' + Date());
        });
      }
    });
  };