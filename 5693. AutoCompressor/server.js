const express = require('express');
const path = require('path');

const webserver = express();


webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON

const { logLineAsync, getRandomFileName, port, logFN } = require('./utils/utils');

webserver.listen(port, () => {
    logLineAsync(logFN, `[${port}] ` + "web server is running");
});