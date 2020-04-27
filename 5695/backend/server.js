const express = require('express');
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const busboy = require('connect-busboy');
const exphbs = require('express-handlebars');

const webserver = express();

//route
const homeRouter = require('./routes/home');
const showAll = require('./routes/showAll');
const processFile = require('./routes/fileProcessing');

webserver.use(express.static('public'));
webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON
// webserver.use(multer({dest:"uploads"}).single("filedata"));
const upload = multer({ dest: "uploads" });

const { logLineAsync, getRandomFileName, port, logFN } = require('./utils/utils');
const allFilesArr = path.resolve(__dirname, './files/allFiles.json');

//конфигураиця exphbs
const hbs = exphbs.create({
    defaultLayout: 'main', //файл с папки layout
    extname: 'hbs'
});

//подключение hbs
webserver.engine('hbs', hbs.engine);//подключение движка к экспрессу
webserver.set('view engine', 'hbs') //начинаем использовать
webserver.set('views', 'views')//вторая views - это папка с html

//cors
webserver.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


webserver.use('/', homeRouter);
webserver.use('/showAll', showAll);
webserver.use('/upload', processFile);

webserver.post("/upload66", upload.single("filedata"), (req, res, next) => {

    const { comment } = req.body;
    let filedata = req.file;
    console.log(filedata);
    if (!filedata)
        res.send("Ошибка при загрузке файла");
    else {
        const totalRequestLength = +req.headers["content-length"]; // общая длина запроса
        let totalDownloaded = 0; // сколько байт уже получено

        const storedPFN = getRandomFileName(path.join(__dirname,"uploads"));
        console.log(`Uploading of '${filedata.originalname}' started`);

        const fstream = fs.createWriteStream(filedata.filename);



        fstream.on('data', chunk => {
            console.log('chunk length='+chunk.length);
            // writeStream.write(chunk);
        });
        fstream.on('end',()=>{
            writeStream.end();
        });
        readStream.on('error', err =>{
            console.log("ERROR!",err);
        });
        fs.readFile(path.join(__dirname, './files', 'allFiles.json'), 'utf8', (err, data) => {
            if (err) throw err;

            let parsData = JSON.parse(data);
            let newParams = filedata;
            //обогащаю объект
            newParams.id = parsData.length + 1;
            newParams.comment = comment;

            let obj = [...parsData, newParams];
            let jsonContent = JSON.stringify(obj);

            fs.writeFile(allFilesArr, jsonContent, 'utf8', (err) => {
                if (err) throw err;

                logLineAsync(logFN, `[${port}] ` + `added new entry to file allFiles.json`);
                // const answer = {
                //     errorCode: 0,
                //     errorDesription: 'Новые параметры добавлены'
                // };
                // res.setHeader("Content-Type", "application/json");
                // res.send(answer);
            });
        });
        fs.readFile(path.join(__dirname, 'public', 'showAllFiles.html'), 'utf-8', (err, content) => {
            if (err) throw err;   

            res.setHeader("Access-Control-Allow-Origin","*");
            res.end(content);
        });
    };
});


webserver.listen(port, () => {
    logLineAsync(logFN, `[${port}] ` + "web server is running");
});