const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { logLineAsync, port, logFN } = require("./utils/utils");
//route
const routeDB = require("./routes/routeDB");

const webserver = express();
webserver.use(bodyParser.json()); // данные запросов будут в JSON-формате

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

webserver.use("/db", routeDB);

webserver.listen(port, () => {
  logLineAsync(logFN, `[${port}] ` + "web server is running");
});
