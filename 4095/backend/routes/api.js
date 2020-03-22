const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const fetch = require("isomorphic-fetch");

const port = 4096;
const logFN = path.join(__dirname, '../_server.log'); //логирование

const { logLineAsync } = require('../utils/utils');

router.get('/', (req, res) => {

    logLineAsync(logFN, `[${port}] ` + `visited /api, redirect to Home page`);
    res.redirect('/');
});


//тестовый запрос
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

router.post('/processRequest', async (req, res, next) => {
    const { body } = req;

    logLineAsync(logFN, `[${port}] ` + `service /api/processRequest called`);
    logLineAsync(logFN, `[${port}] ` + `params: ${JSON.stringify(body)}`);
    logLineAsync(logFN, `[${port}] ` + `proxied`);

    let params = { };
    let urlParams = '?';
    if(body.requestType === 'GET'){
        params.method = body.requestType;
        body.requestURLParams.length && body.requestURLParams.map((item) => {
            if(item.key.length || item.value.length)
            urlParams += `${item.key}=${item.value}&`
        });

        const proxy_response = await fetch(`${body.url}${urlParams}`, params);
        const proxy_text = await proxy_response.text();
        res.send(proxy_text);
    };
});

router.get('/getHistoryList', async (req, res, next) => {

    logLineAsync(logFN, `[${port}] ` + `service /api/getHistoryList called`);

    fs.readFile(path.join(__dirname, '../files', 'historyList.json'), 'utf8', (err, data) => {
        if (err) throw err;
 
        logLineAsync(logFN, `[${port}] ` + `historyList.json read`);

        let parsData = JSON.parse(data);

        res.setHeader("Content-Type", "application/json");
        res.send(parsData);

        logLineAsync(logFN, `[${port}] ` + `historyList send`);
      });
});



module.exports = router;