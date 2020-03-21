const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const port = 4096;
const logFN = path.join(__dirname, '../_server.log'); //логирование

const { logLineAsync } = require('../utils/utils');

router.get('/', (req, res) => {

    logLineAsync(logFN, `[${port}] ` + `visited /api, redirect to Home page`);
    res.redirect('/');
});

router.get('/state', (req, res, next) => {
    
    logLineAsync(logFN, `[${port}] ` + `service /api/state called`);

    fs.readFile(path.join(__dirname, '../files', 'variants.json'), 'utf8', (err, data) => {
        if (err) throw err;
 
        logLineAsync(logFN, `[${port}] ` + `variants.json read`);

        let parsData = JSON.parse(data);

        res.setHeader("Content-Type", "application/json");
        res.send(parsData);
      });
});

module.exports = router;