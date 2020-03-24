const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const fetch = require("isomorphic-fetch");

const port = 4095;
const logFN = path.join(__dirname, '../_server.log'); //логирование
const fileHistory = path.resolve(__dirname, '../files/historyList.json');

const { logLineAsync } = require('../utils/utils');

let __headers = {};
let __status = {};

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

    let params = {}; //параметры запроса
    let urlParams = '?';
    let headersParams = '';
    if (body.requestType === 'GET') {
        logLineAsync(logFN, `[${port}] ` + `requestType - GET`);
        params.method = body.requestType;

        var regex = /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi;
        //проверка на URL
        if (regex.test(body.url)) {

            body.requestURLParams.length && body.requestURLParams.map((item) => {
                if (item.key.length || item.value.length)
                    urlParams += `${item.key}=${item.value}&`
            });
            body.requestHeadersParams.length && body.requestHeadersParams.map((item) => {
                if (item.key.length || item.value.length)
                    headersParams += `${item.key}:${item.value}, `;
            });
            //обрезает последний символ строки
            if (body.requestHeadersParams.length) {
                let updHeadersParams = headersParams.slice(0, -1);
                params.headers = { updHeadersParams };
            };

            // const proxy_response = await fetch(`${body.url}${urlParams}`);
            // const proxy_text=await proxy_response.text();
            // console.log('--proxy_text', proxy_text)


            fetch(`${body.url}${urlParams}`)
                .then(response => {
                    const { status, headers: {_headers} }  = response;
                    __headers = _headers;
                    __status = status;
                    return response.json();
                })
                .then((data) => {
                    res.send({data, headers:__headers, status: __status});
                })
                .catch(err => {
                    res.send({data: err, headers:__headers, status: __status});
                });
        } else {
            const data = {data:'Проверьте введенный URL'};
            res.send(data);
        }
    };
    if (body.requestType === 'POST') {
        logLineAsync(logFN, `[${port}] ` + `requestType - POST`);
        params.method = body.requestType;

        var regex = /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi;
        if (regex.test(body.url) && body.body.length != 0) {

            body.requestHeadersParams.length && body.requestHeadersParams.map((item) => {
                if (item.key.length || item.value.length)
                    headersParams += `${item.key}:${item.value}, `;
            });
            //обрезает последний символ строки
            if (body.requestHeadersParams.length) {
                let updHeadersParams = headersParams.slice(0, -1);
                params.headers = { updHeadersParams };
            };

            const dataBody = JSON.stringify(body.body);

            fetch(body.url, { method: 'POST', headers: headersParams, body: dataBody })
                .then((response) => {
                    const { status, headers: {_headers} }  = response;
                    __headers = _headers;
                    __status = status;

                    return response.json();
                })
                .then((data) => {

                    res.send({data, headers:__headers, status: __status});
                })
                .catch(err => {
                    res.send({data: err, headers:__headers, status: __status});
                });
        } else {
            const data = {data:'Проверьте введенный URL или тело запроса'};
            res.send(data);
        }
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

router.post('/addNewRequest', async (req, res, next) => {
    const { body } = req;

    logLineAsync(logFN, `[${port}] ` + `service /api/addNewRequest called`);

    fs.readFile(path.join(__dirname, '../files', 'historyList.json'), 'utf8', (err, data) => {
        if (err) throw err;

        let parsData = JSON.parse(data);
        let newParams = body;
        newParams.id = parsData.length;
        let obj = [...parsData, newParams];
        let jsonContent = JSON.stringify(obj);
        logLineAsync(logFN, `[${port}] ` + `received obj: ${obj}`);

        fs.writeFile(fileHistory, jsonContent, 'utf8', (err) => {
            if (err) throw err;

            logLineAsync(logFN, `[${port}] ` + `fileHistory.json updated`);
            const answer = {
                errorCode: 0,
                errorDesription: 'Новые параметры добавлены'
            };
            res.setHeader("Content-Type", "application/json");
            res.send(answer);
        });
    });
});

router.post('/deleteRequest', async (req, res, next) => {
    const { body } = req;

    logLineAsync(logFN, `[${port}] ` + `service /api/deleteRequest called`);

    fs.readFile(path.join(__dirname, '../files', 'historyList.json'), 'utf8', (err, data) => {
        if (err) throw err;

        let parsData = JSON.parse(data);
        let deleteID = body.deleteID;
        logLineAsync(logFN, `[${port}] ` + `received deleteID: ${deleteID}`);

        const positiveArr = parsData.filter((item) => { return item.id != +deleteID });
        let jsonContent = JSON.stringify(positiveArr);

        fs.writeFile(fileHistory, jsonContent, 'utf8', (err) => {
            if (err) throw err;

            logLineAsync(logFN, `[${port}] ` + `fileHistory.json updated`);
            const answer = {
                errorCode: 0,
                errorDesription: 'Новые параметры добавлены'
            };
            res.setHeader("Content-Type", "application/json");
            res.send(answer);
        });
    });
});

module.exports = router;