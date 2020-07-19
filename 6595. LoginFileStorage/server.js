// import mongoose from "mongoose";
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const webserver = express();

//route
const homeRouter = require("./routes/home");
const showAll = require("./routes/showAll");
const processFile = require("./routes/fileProcessing");
const login = require("./routes/login");

webserver.use(express.static("public"));
webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON

const { logLineAsync, port, logFN } = require("./utils/utils");
const { mongoDBurl } = require("./local");

//конфигураиця exphbs
const hbs = exphbs.create({
  defaultLayout: "main", //файл с папки layout
  extname: "hbs",
});

//подключение hbs
webserver.engine("hbs", hbs.engine); //подключение движка к экспрессу
webserver.set("view engine", "hbs"); //начинаем использовать
webserver.set("views", "views"); //вторая views - это папка с html

webserver.use(express.static(path.resolve(__dirname, "./src")));
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

webserver.use("/", homeRouter);
webserver.use("/showAll", showAll);
webserver.use("/file", processFile);
webserver.use("/login", login);

async function startServer() {
  try {
    //подключение к БД
    const url = mongoDBurl;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    webserver.listen(port, () => {
      logLineAsync(logFN, `[${port}] ` + "web server is running");
    });
  } catch (err) {
    console.log("-error connect", err);
    logLineAsync(logFN, `[${port}] ` + "error connect", err);
  }
}

startServer();
