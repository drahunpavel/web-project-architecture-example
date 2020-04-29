const fs = require('fs');
const path = require('path');
const mime = require('mime');
const busboy = require('connect-busboy');
const filter = require('lodash');

const {Router} = require('express');

const router = Router();

const { logLineAsync, port, getRandomFileName, logFN } = require('../utils/utils');

const allFilesArr = path.resolve(__dirname, '../files/allFiles.json');

router.post('/upload', busboy(), (req, res) => { 

    const totalRequestLength = +req.headers["content-length"]; // общая длина запроса
    let totalDownloaded = 0; // сколько байт уже получено

    let fileUploaded = false; // состояние загрузки файла
    let reqFields = {}; // информация обо всех полях запроса, кроме файлов
    let reqFiles = {}; // информация обо всех файлах

    req.pipe(req.busboy); // перенаправляем поток приёма ответа в busboy

    req.busboy.on('field', function(fieldname, val) { // это событие возникает, когда в запросе обнаруживается "простое" поле, не файл
        reqFields[fieldname] = val;
    });

    req.busboy.on('file', (fieldname, file, filename, mimetype) => {  // это событие возникает, когда в запросе обнаруживается файл

        if(filename.length) fileUploaded = true; //примитивная проверка на наличие файла

        const storedPFN = getRandomFileName(path.join(__dirname, "../uploads"));//todo удалить
        reqFiles[fieldname]={originalFN:filename,storedPFN:storedPFN};

        console.log(`Uploading of '${filename}' started`);

        let randNameArr = reqFiles.filedata.storedPFN.path.split('\\');
        let randName = randNameArr[randNameArr.length - 1];

        if(fileUploaded){
            const fstream = fs.createWriteStream(storedPFN.path);
            file.pipe(fstream);
        };

        file.on('data', function(data) {
            totalDownloaded += data.length;
            console.log('loaded '+totalDownloaded+' bytes of '+totalRequestLength);
        });

        file.on('end', () => {
            fs.readFile(path.join(__dirname, '../files', 'allFiles.json'), 'utf8', (err, data) => {
                if (err) throw err;

                let parsData = JSON.parse(data);
                let newParams = {};
                //обогащаю объект
                newParams.id = parsData.length + 1;
                newParams.comment = reqFields.comment;
                newParams.filename = filename;
                newParams.tmp_filename = randName;

                let sliced = filename.slice(0,20);
                if (sliced.length < filename.length) sliced += '...';
                newParams.short_filename = sliced;

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

            console.log('file '+fieldname+' received');
        });
    });
    
    req.busboy.on('finish', async () => {

        res.render('addFile', {
            isFileUploaded: fileUploaded
        });
    });
});

router.get('/:id/download', (req, res) => {
    const { id } = req.params;

    let file = path.resolve(__dirname, `../uploads/${id}`);

    fs.readFile(path.join(__dirname, '../files', 'allFiles.json'), 'utf8', (err, data) => {
        if (err) throw err;

        let parsData = JSON.parse(data);
        let actualFile = parsData.filter((item) => { return item.tmp_filename ===  id });
        let mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + actualFile[0].filename);
        res.setHeader('Content-type', mimetype);

        let filestream = fs.createReadStream(file);
        filestream.pipe(res);
    });
}); 

module.exports = router;