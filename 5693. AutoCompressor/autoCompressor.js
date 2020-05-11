const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { createGzip } = require('zlib');
const { pipeline } = require('stream');
const {
    createReadStream,
    createWriteStream
} = require('fs');
const { promisify } = require('util');
const pipe = promisify(pipeline);

const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const FgBlue = "\x1b[34m";
const BgRed = "\x1b[41m";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Entry path: ', async path => {

    readDir(path);
});

// readDir(_path)
//     .then((res) => {
//         console.log('--readDir is running, path: ', path);
//     })
//     .catch(err => { console.error(err); });

//-----------------------------------------------------
async function readDir(_path) {

    return new Promise((resolve, reject) => {
        fs.readdir(_path, (error, result) => {
            if (error) {
                reject(error);
            } else {

                result.forEach((fileName) => {
                    let filePath = path.join(_path, fileName);

                    fs.stat(filePath, fileName, (err, stats) => {

                        let brokenFile = fileName.split('.');

                        if (stats.isFile()) {

                            let originalFilebirthtime;
                            let compressedFilebirthtime;

                            //не сжатые файлы
                            if (brokenFile[brokenFile.length - 1] != 'gz') {

                                let сompressedFile = result.find(item => item === `${fileName}.gz`);//нашли сжатый вариант этого файла
                                originalFilebirthtime = stats.birthtimeMs; //дата создания файла оригинала

                                if (сompressedFile) {

                                    //получает данные по сжатому файлу
                                    fs.stat(`${filePath}.gz`, сompressedFile, (err, stat) => {
                                        compressedFilebirthtime = stat.birthtimeMs; //дата создания сжатого файла

                                        //проверка даты создания файла оригинала и сжататого файла
                                        //если дата создания файл оригинала свежее сжатого файла
                                        //удаляется старый сжататый файл и созадется новый 
                                        if (compressedFilebirthtime >= originalFilebirthtime) {
                                            console.log(FgGreen, '--compressed file is fine: ', 'fileName: ', fileName, '     path: ', filePath)
                                            
                                        } else {
                                            fs.unlink(`${filePath}.gz`, (err) => {
                                                if (err) throw err;

                                                console.log(BgRed, '--old compressed file deleted: ', 'fileName: ', fileName, '     path: ', filePath);

                                                do_gzip(filePath, `${filePath}.gz`, fileName)
                                                    .catch((err) => {
                                                        console.error('An error occurred:', err);
                                                        process.exitCode = 1;
                                                    });
                                            });
                                        };
                                    });
                                } else {
                                    console.log(FgBlue, '--file doesn`t have a compressed version: ', 'fileName: ', fileName, '     path: ', filePath);

                                    do_gzip(filePath, `${filePath}.gz`, fileName)
                                        .catch((err) => {
                                            console.error('An error occurred:', err);
                                            process.exitCode = 1;
                                        });
                                }
                            };
                        };
                        if (stats.isDirectory()) {
                            readDir(filePath);
                        };
                    });
                });
                resolve(result);
            }
        });
    });
};

//Compression function
async function do_gzip(input, output, fileName) {

    console.log(FgYellow, '--create new compressed file: ', 'fileName: ', fileName, '     path: ', input);

    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
};