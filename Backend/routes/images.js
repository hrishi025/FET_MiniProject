const { json } = require("body-parser");
const { response } = require("express");
const express = require("express");

// importing file system class
const fs = require("fs");
const { request } = require("http");

// importing moment to get the date
const moment = require("moment");

// router will be used to add routes in the app server
const router = express.Router("");

// get all images
router.get("/", (request, response) => {
  fs.readFile("./data/images.json", (err, jsonString) => {
    if (err) {
      response.send(err);
      return;
    }

    response.send(jsonString);
  });
});

// post new images
router.post("/", (request, response) => {
  // first get the json file
  fs.readFile("./data/images.json", (err, jsonString) => {
    if (err) {
      response.send(err);
      return;
    }

    //  parse the string
    var images_arr = JSON.parse(jsonString);

    // push the recieved data in array
    images_arr.push(request.body);

    // upload the latest array in the json file
    fs.writeFile("./data/images.json", JSON.stringify(images_arr), (err) => {
      if (err) {
        response.send("Error writing file", err);
      } else {
        response.send("Successfully wrote file");
      }
    });
  });
});

module.exports = router;
