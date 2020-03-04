const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const webserver = express();
webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON

const port = 3095;

const logFN = path.join(__dirname, '_server.log'); //логирование

// пишет строку в файл лога и одновременно в консоль
function logLineSync(logFilePath,logLine) {
    const logDT=new Date();
    let time=logDT.toLocaleDateString()+" "+logDT.toLocaleTimeString();
    let fullLogLine=time+" "+logLine;

    const logFd = fs.openSync(logFilePath, 'a+'); // и это же сообщение добавляем в лог-файл
    fs.writeSync(logFd, fullLogLine + os.EOL); // os.EOL - это символ конца строки, он разный для разных ОС
    fs.closeSync(logFd);
};


webserver.get('/', (req, res) => { 

    res.setHeader("Access-Control-Allow-Origin","*"); 

    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf-8', (err, content) => {
            if(err){
                throw err;
            }else{
                res.end(content)
            };
        }
    );
    logLineSync(logFN,"visited the page '/' on port "+port);
});

webserver.get('/variants', (req, res) => { 
    console.log('--я тут')
    // logLineSync(logFN,"visited the page '/' on port "+port);

    fs.readFile(path.join(__dirname, 'files', 'variants.json'), 'utf8', (err, data) => {
      if (err) throw err;

      res.setHeader("Content-Type", "application/json");
      res.send(data);
    });
});

webserver.post('/stat', (req, res) => { 

    logLineSync(logFN,"visited the page '/' on port "+port);
    
    res.send("service2c ok!");
});

webserver.post('/vote', (req, res) => { 

    logLineSync(logFN,"visited the page '/' on port "+port);
    
    res.send("service2c ok!");
});

webserver.listen(port, () => {
    logLineSync(logFN,"web server running on port "+port);
});