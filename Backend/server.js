const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// list of routers
const routerUser = require("./routes/user");
const routerComments = require("./routes/comments");
const routerLogs = require("./routes/logs");
const routerImages = require("./routes/images");

const app = express();

//to convert JSON data to string
app.use(bodyParser.json());

// enable frontend application to call the APIs
app.use(cors("*"));

//for enabling image access from frontend
app.use(express.static("images"));

app.use((request, response, next) => {
  next();
});

// add routers
app.use("/user", routerUser);
app.use("/comments", routerComments);
app.use("/logs", routerLogs);
app.use("/images", routerImages);

app.get("/", (request, response) => {
  response.send("welcome to photo gallery application");
});

app.listen(3000, "0.0.0.0", () => {
  console.log(`server started on port 3000`);
});
