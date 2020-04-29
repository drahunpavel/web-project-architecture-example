const express = require('express');
// const multer = require("multer");
const path = require('path');
const exphbs = require('express-handlebars');

const webserver = express();

//route
const homeRouter = require('./routes/home');
const showAll = require('./routes/showAll');
const processFile = require('./routes/fileProcessing');

webserver.use(express.static('public'));
webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON
// webserver.use(multer({dest:"uploads"}).single("filedata"));
// const upload = multer({ dest: "uploads" });

const { logLineAsync, getRandomFileName, port, logFN } = require('./utils/utils');
const allFilesArr = path.resolve(__dirname, './files/allFiles.json');

//конфигураиця exphbs
const hbs = exphbs.create({
    defaultLayout: 'main', //файл с папки layout
    extname: 'hbs'
});

//подключение hbs
webserver.engine('hbs', hbs.engine);//подключение движка к экспрессу
webserver.set('view engine', 'hbs') //начинаем использовать
webserver.set('views', 'views')//вторая views - это папка с html

//cors
webserver.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


webserver.use('/', homeRouter);
webserver.use('/showAll', showAll);
webserver.use('/file', processFile);

webserver.listen(port, () => {
    logLineAsync(logFN, `[${port}] ` + "web server is running");
});