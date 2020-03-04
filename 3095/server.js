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
    
    logLineSync(logFN,"visited the page '/' on port " + port);
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

    // logLineSync(logFN,"visited the page '/' on port "+port);
    fs.readFile(path.join(__dirname, 'files', 'stat.json'), 'utf8', (err, data) => {
        if (err) throw err;
 
        let parsData = JSON.parse(data);

        parsData.forEach((item) => {
            if(item.id === id){
                item.count += 1;
            };
        });

        let jsonContent = JSON.stringify(parsData);

        fs.writeFile("./files/stat.json", jsonContent, 'utf8', (err) => {
            if (err) throw err;
         
            logLineSync(logFN, `JSON file: ${jsonContent} on port ` + port);
            logLineSync(logFN, `JSON file stat.json has been saved on port ` + port);
        });

        res.send(parsData);
      });
});

webserver.listen(port, () => {
    logLineSync(logFN,"web server running on port "+port);
});