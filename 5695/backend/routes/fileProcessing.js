const fs = require('fs');
const path = require('path');
const busboy = require('connect-busboy');
const {Router} = require('express');

const router = Router();

const { logLineAsync, port, getRandomFileName, logFN } = require('../utils/utils');

router.post('/', busboy(), (req, res) => { 
// router.post('/', (req, res) => { 

    console.log('--body', req.busboy)
    // var busboy = new Busboy({ headers: req.headers });

    const totalRequestLength = +req.headers["content-length"]; // общая длина запроса
    let totalDownloaded = 0; // сколько байт уже получено

    let fileUploaded = false; // состояние загрузки файла
    let reqFields = {}; // информация обо всех полях запроса, кроме файлов
    let reqFiles = {}; // информация обо всех файлах

    req.pipe(req.busboy); // перенаправляем поток приёма ответа в busboy

    req.busboy.on('field', function(fieldname, val) { // это событие возникает, когда в запросе обнаруживается "простое" поле, не файл
        reqFields[fieldname] = val;
        console.log('--поле', fieldname, val)
    });

    req.busboy.on('file', (fieldname, file, filename, mimetype) => {  // это событие возникает, когда в запросе обнаруживается файл

        console.log('--filename', filename)
        if(filename.length) fileUploaded = true; //примитивная проверка на наличие файла

        const storedPFN = getRandomFileName(path.join(__dirname, "../uploads"));

        reqFiles[fieldname]={originalFN:filename,storedPFN:storedPFN};

        console.log(`Uploading of '${filename}' started`);

        if(fileUploaded){
            const fstream = fs.createWriteStream(storedPFN);
            file.pipe(fstream);
        };

        file.on('data', function(data) {
            totalDownloaded += data.length;
            console.log('loaded '+totalDownloaded+' bytes of '+totalRequestLength);
        });

        file.on('end', () => {
            console.log('file '+fieldname+' received');
        });
    });
    
    req.busboy.on('finish', async () => {

        res.render('addFile', {
            isFileUploaded: fileUploaded
        });
    });
});

module.exports = router;