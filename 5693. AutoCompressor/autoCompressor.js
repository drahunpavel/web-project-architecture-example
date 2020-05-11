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
const BgRed = "\x1b[41m";


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

            let originalFilebirthtime;
            let compressedFilebirthtime;
            let brokenFile = fileName.split('.');

            //не сжатые файлы
            if (brokenFile[brokenFile.length - 1] != 'gz') {

                let сompressedFile = listDir.find(item => item === `${fileName}.gz`);//поиск сжатого файла
                originalFilebirthtime = stats.birthtimeMs; //дата создания файла оригинала

                if (сompressedFile) {

                    //получает данные по сжатому файлу
                    fs.stat(`${filePath}.gz`, сompressedFile, (err, stat) => {
                        compressedFilebirthtime = stat.birthtimeMs; //дата создания сжатого файла

                        //проверка даты создания файла оригинала и сжататого файла
                        //если дата создания файл оригинала свежее сжатого файла
                        //удаляется старый сжататый файл и созадется новый 
                        if (compressedFilebirthtime >= originalFilebirthtime) {
                            console.log(FgGreen, '--compressed file is fine: ', 'fileName: ', fileName, '     path: ', filePath);
                        } else {
                            fs.unlink(`${filePath}.gz`, (err) => {
                                if (err) throw err;

                                console.log(BgRed, '--old compressed file deleted: ', 'fileName: ', fileName, '     path: ', filePath);

                                do_gzip(filePath, `${filePath}.gz`, fileName)
                                    // .then((res) => {
                                    //     console.log(BgCyan, '--compressed file created: ', 'fileName: ', fileName, '     path: ', `${filePath}.gz`);
                                    // })
                                    .catch((err) => {
                                        console.error('An error occurred:', err);
                                        process.exitCode = 1;
                                    });
                            });
                        };
                    });
                } else {
                    console.log(FgBlue, '--file doesn`t have a compressed version: ', 'fileName: ', fileName, '     path: ', filePath);

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

//Compression function
async function do_gzip(input, output, fileName) {

    console.log(FgYellow, '--create new compressed file: ', 'fileName: ', fileName, '     path: ', `${input}.gz`);

    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);

    console.log(FgYellow, '--compressed file created: ', 'fileName: ', fileName, '     path: ', `${input}.gz`);
};
