const request = require('request');
const fs = require('fs');
const coopUrl = "https://splatoon2.ink/data/coop-schedules.json";

//Execute this file to initialize the environment, so that server.js could run without problem.

function getCoopJson(){
  fs.stat('coop.json', (err) => {
    if (err){
      console.log("No JSON Found!");
    } else {console.log("coop.json found!")};
  });
  request({url: coopUrl, json: true},
    function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("successfully retrieve coop-schedules.json from splatoon2.ink");
      console.log(body);
      var coopJson = body;
      fs.writeFile('coop.json', JSON.stringify(coopJson), (err) => {
        if (err) throw err;
        console.log('New coop.json has been created');
      });
    }
  });
};

getCoopJson();