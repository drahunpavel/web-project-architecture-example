const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

const port = 4095;
const logFN = path.join(__dirname, '../_server.log'); //логирование

const { logLineAsync } = require('../utils/utils');

router.get('/', (req, res, next) => {
    
    // res.send('helwwwwlo')
    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf-8', (err, content) => {
        if (err) throw err;

        res.end(content);
    });

    logLineAsync(logFN, `[${port}] ` + `visited Home page`);
});

module.exports = router;