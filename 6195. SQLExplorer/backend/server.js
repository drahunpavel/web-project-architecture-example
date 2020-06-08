const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { logLineAsync, port, logFN } = require("./utils/utils");

const webserver = express();

//route
const routeDB = require("./routes/routeDB");
const home = require("./routes/home");

// var options = {
//   inflate: true,
//   limit: "100kb",
//   type: "application/octet-stream",
// };

webserver.use(express.static("public"));
webserver.use(bodyParser.json()); // данные запросов будут в JSON-формате
// webserver.use(bodyParser.raw(options));

//cors
webserver.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

webserver.use("/", home);
webserver.use("/db", routeDB);

webserver.listen(port, () => {
  logLineAsync(logFN, `[${port}] ` + "web server is running");
});
