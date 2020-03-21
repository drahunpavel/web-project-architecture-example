// router.get('/api/state', async (req, res) => {
//     // let response = await fn.getSettings();
//     res.send('hello');
// });

const express = require('express');
const path = require('path');
const router = express.Router();

const port = 4096;
const logFN = path.join(__dirname, '../_server.log'); //логирование

const { logLineAsync } = require('../utils/utils');

router.get('/', (req, res) => {

    logLineAsync(logFN, `[${port}] ` + `visited /api, redirect to Home page`);
    res.redirect('/');
});

router.get('/state', (req, res, next) => {
    
    res.status(200);
    res.send('<p>/api/state</p>')

    logLineAsync(logFN, `[${port}] ` + `visited /api/state`);
});

module.exports = router;