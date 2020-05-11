const express = require('express');
const fs = require('fs');
const path = require('path');

const webserver = express();



webserver.use(express.static('public'));

const port = 3080;

//cors
webserver.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

webserver.get('/', (req, res, next) => {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf-8', (err, content) => {
        if (err) throw err;

        res.end(content);
    });
});

webserver.listen(port, () => {
    console.log('--I run')
});