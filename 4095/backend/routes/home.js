const express = require('express');
const path = require('path');
const router = express.Router();

const port = 4096;
const logFN = path.join(__dirname, '../_server.log'); //логирование

const { logLineAsync } = require('../utils/utils');

router.get('/', (req, res, next) => {
    
    res.send('helwwwwlo')

    logLineAsync(logFN, `[${port}] ` + `visited Home page`);
});

module.exports = router;