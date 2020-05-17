const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
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
const FgRed = "\x1b[31m";
const FgMagenta = "\x1b[35m";
const FgCyan = "\x1b[36m"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Entry path: ', async path => {
    await readDir(path);
});


async function readDir(_path) {

    //список файлов в папке
    let listDir = await readdirAsync(_path);

    for (const fileName of listDir) {

        let filePath = path.join(_path, fileName); //путь к каждому файлу
        const stats = await fsp.stat(filePath); //данные по файлу

        if (stats.isFile()) {
            let brokenFile = fileName.split('.');

            //не сжатые файлы
            if (brokenFile[brokenFile.length - 1] != 'gz') {
                let compressedFile = listDir.find(item => item === `${fileName}.gz`);//поиск сжатого файла

                //если сжатый файл найден
                //нужно его проверить
                if (compressedFile) {
                    let statsСompressed = await fsp.stat(`${filePath}.gz`); //данные по сжатому файлу

                    let compressedFilebirthtime = statsСompressed.birthtimeMs; //дата создания сжатого файла
                    // let originalFilebirthtime = stats.birthtimeMs; //дата создания файла оригинала
                    let originalmtimeMs = stats.mtimeMs; //дата последнего изменений файла оригинала
                    // let originalmtimeMs = stats.ctimeMs; //дата последнего обращения

                    if(originalmtimeMs > compressedFilebirthtime){

                        console.log(FgBlue, '--the compressed file is out of date, you need to replace: ', 'fileName: ', fileName, '     path: ', filePath);

                        let deleteStatus = await asyncDeleteFile(filePath, fileName);

                        if(deleteStatus) {
                            await do_gzip(filePath, `${filePath}.gz`, fileName)
                            // .then((res) => {
                            //     console.log(BgCyan, '--compressed file created: ', 'fileName: ', fileName, '     path: ', `${filePath}.gz`);
                            // })
                            .catch((err) => {
                                console.error('An error occurred:', err);
                                process.exitCode = 1;
                            });
                        }

                    }else{
                        console.log(FgGreen, '--compressed file is fine: ', 'fileName: ', fileName, '     path: ', filePath);
                    };
                } else {//иначе этот сжатый файл нужно создать
                    console.log(FgMagenta, '--file doesn`t have a compressed version: ', 'fileName: ', fileName, '     path: ', filePath);

                    await do_gzip(filePath, `${filePath}.gz`, fileName)
                        // .then((res) => {
                        //     console.log(BgCyan, '--compressed file created: ', 'fileName: ', fileName, '     path: ', `${filePath}.gz`);
                        // })
                        .catch((err) => {
                            console.error('An error occurred:', err);
                            process.exitCode = 1;
                        });
                };
            };
        };
        if (stats.isDirectory()) {
            await readDir(filePath);
        };
    };
};

//get list of files function
function readdirAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

function asyncDeleteFile(filePath, fileName){

    return new Promise(function (resolve, reject) {
        fs.unlink(`${filePath}.gz`, (err, res) => {
            if (err) {
                reject(err)
            }else{
                console.log(FgRed, '--old compressed file deleted: ', `${filePath}.gz`);
                resolve(true);
            }
        });
    });
};

//Compression function
async function do_gzip(input, output, fileName) {

    console.log(FgYellow, '--create new compressed file: ', 'fileName: ', `${fileName}.gz`, '     path: ', `${input}.gz`);

    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);

    console.log(FgYellow, '--compressed file created: ', 'fileName: ', `${fileName}.gz`, '     path: ', `${input}.gz`);
};

