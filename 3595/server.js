const express = require('express');
const fs = require('fs');
const path = require('path');
// const os = require('os');

const webserver = express();
webserver.use(express.static('public'));
webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON


const { logLineSync } = require('./utils/utils');

const port = 3595;
const logFN = path.join(__dirname, '_server.log'); //логирование


webserver.get('/', (req, res) => {

    logLineSync(logFN, `[${port}] ` + "visited the page '/'");

    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf-8', (err, content) => {
        if (err) throw err;

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

// webserver.post('/download', (req, res) => {

//     logLineSync(logFN, `[${port}] ` + "service download called");

//     const contentType = req.headers['content-type'];
//     logLineSync(logFN, `[${port}] ` + `contentType: ${contentType}`);

//     // res.setHeader("Content-Disposition", "attachment");
//     // res.setHeader("Content-Type", "text/html");
//     res.send("hello <b>goodbye</b>");
// });

webserver.post('/serviceReturnDifferentTypes', (req, res) => {

    logLineSync(logFN, `[${port}] ` + "service ReturnDifferentTypes called");

    const accept = req.headers['accept'];
    logLineSync(logFN, `[${port}] ` + `accept: ${accept}`);


    fs.readFile(path.join(__dirname, 'files', 'stat.json'), 'utf8', (err, data) => {
        if (err) throw err;

        let parsData = JSON.parse(data);

        if (accept === 'application/json') {
            res.setHeader("Content-Type", "application/json");
            res.send(data);
        } else if (accept === 'text/html') {

            let dataHTML = '';

            parsData.forEach((item) => dataHTML += `<p>id: ${item.id}, conut: ${item.count}</p>`);

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.send(dataHTML);
        } else if (accept === 'text/xml') {

            let dataXML = '';

            parsData.forEach((item) => dataXML += `<id> ${item.id}<id><count>${item.count}</count>`);

            res.setHeader("Content-type", "text/xml");
            res.send(dataXML);
        };
    });
});

webserver.listen(port, () => {
    logLineSync(logFN, `[${port}] ` + "web server running");
});


// res.setHeader('Cache-Controls', 'no-cache');
// res.setHeader('Expires', '0');

// res.setHeader("Content-Disposition",  'inline; filename="results.xml"');
// res.setHeader('Cache-Controls', 'no-cache');
// res.setHeader('Expires', '0');