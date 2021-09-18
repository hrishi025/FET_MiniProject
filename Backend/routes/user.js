const { json } = require("body-parser");
const { response } = require("express");
const express = require("express");

// importing file system class
const fs = require('fs');
const { request } = require("http");

// importing moment to get the date
const moment = require("moment");

// router will be used to add routes in the app server
const router = express.Router("");

router.get("/", (request, response) => {
    fs.readFile("./data/users.json",(err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            response.send(err);
        return;
        }
        console.log("File data:", jsonString);
        response.send(jsonString);
  });

});


router.post("/",(request,response)=>{
    // first get the json file
    fs.readFile("./data/users.json",(err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            response.send(err);
        return;
        }
        
        //  parse the string 
        var users_arr = JSON.parse(jsonString);

        // push the recieved data in array
        users_arr.push(request.body);

        // upload the latest array in the json file 
        fs.writeFile('./data/users.json',JSON.stringify(users_arr), err => {
            if (err) {
                response.send('Error writing file', err)
            } else {
                response.send('Successfully wrote file')
            }
        });
    })
});


module.exports = router;