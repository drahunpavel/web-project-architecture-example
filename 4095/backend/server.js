const express = require('express');
const fs = require('fs');
const path = require('path');

const webserver = express();

//route
const home = require('./routes/home');
const API = require('./routes/api');

webserver.use(express.static('public'));
webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON

const { logLineSync } = require('./utils/utils');

const port = 4095;
const logFN = path.join(__dirname, '_server.log'); //логирование

//cors
webserver.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

webserver.use('/', home);
webserver.use('/api', API);

webserver.listen(port, () => {
    logLineSync(logFN, `[${port}] ` + "web server is running");
});