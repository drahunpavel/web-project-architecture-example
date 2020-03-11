const express = require('express');
const fs = require('fs');
const path = require('path');
// const os = require('os');

const webserver = express();

// webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON

const { logLineSync } = require('./utils/utils');

const port = 3595;
const logFN = path.join(__dirname, '_server.log'); //логирование


webserver.get('/', (req, res) => {

    logLineSync(logFN, `[${port}] ` + "visited the page '/'");

    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf-8', (err, content) => {
        if (err) throw err;

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(content);
    });
});

webserver.get('/variants', (req, res) => {

    fs.readFile(path.join(__dirname, 'files', 'variants.json'), 'utf8', (err, data) => {
        if (err) throw err;

        res.setHeader("Content-Type", "application/json");
        res.send(data);
    });

    logLineSync(logFN, "user get variants on port " + port);
});

webserver.get('/stat', (req, res) => {

    fs.readFile(path.join(__dirname, 'files', 'stat.json'), 'utf8', (err, data) => {
        if (err) throw err;

        res.setHeader("Content-Type", "application/json");
        res.send(data);
    });

    logLineSync(logFN, "user get stat on port " + port);
});

webserver.post('/vote', (req, res) => {
    const { id } = req.body;

    fs.readFile(path.join(__dirname, 'files', 'stat.json'), 'utf8', (err, data) => {
        if (err) throw err;

        let parsData = JSON.parse(data);

        parsData.forEach((item) => {
            if (item.id === id) {
                item.count += 1;
            };
        });

        let jsonContent = JSON.stringify(parsData);

        fs.writeFile("./files/stat.json", jsonContent, 'utf8', (err) => {
            if (err) throw err;

            logLineSync(logFN, `JSON file: ${jsonContent} on port ` + port);
            logLineSync(logFN, `JSON file stat.json has been saved on port ` + port);
        });

        res.setHeader("Content-Type", "application/json");
        res.send(parsData);
    });
});

webserver.post('/download', (req, res) => {

    logLineSync(logFN, `[${port}] ` + "service download called");

    const contentType = req.headers['content-type'];
    logLineSync(logFN, `[${port}] ` + `contentType: ${contentType}`);

    // res.setHeader("Content-Disposition", "attachment");
    // res.setHeader("Content-Type", "text/html");
    res.send("hello <b>goodbye</b>");
});

webserver.post('/serviceReturnDifferentTypes', (req, res) => {

    logLineSync(logFN, `[${port}] ` + "service ReturnDifferentTypes called");

    const contentType = req.headers['content-type'];
    logLineSync(logFN, `[${port}] ` + `contentType: ${contentType}`);


    fs.readFile(path.join(__dirname, 'files', 'stat.json'), 'utf8', (err, data) => {
        if (err) throw err;

        if (contentType === 'application/json') {
            res.setHeader("Content-Type", "application/json");
            res.send(data);
        }else if(contentType === 'text/html; charset=utf-8'){
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.send('<h1>fgfg</h1>')
        }
    });

    // else if(contentType === 'text/html; charset=utf-8'){
    //     res.setHeader("Content-Type", "text/html; charset=utf-8");
    // }
});

webserver.listen(port, () => {
    logLineSync(logFN, `[${port}] ` + "web server running");
});