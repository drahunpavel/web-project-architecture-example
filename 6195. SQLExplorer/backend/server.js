const express = require("express");
const path = require("path");

const webserver = express();

// //route
// const homeRouter = require('./routes/home');
// const showAll = require('./routes/showAll');
// const processFile = require('./routes/fileProcessing');

webserver.use(express.static("public"));
webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON

const { logLineAsync, port, logFN } = require("./utils/utils");

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

// webserver.use('/', homeRouter);
// webserver.use('/showAll', showAll);
// webserver.use('/file', processFile);

webserver.listen(port, () => {
  logLineAsync(logFN, `[${port}] ` + "web server is running");
});
