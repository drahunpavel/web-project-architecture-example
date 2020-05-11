const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const readline = require('readline');
const { createGzip } = require('zlib');
const { pipeline } = require('stream');
const {
    createReadStream,
    createWriteStream
} = require('fs');
const { promisify } = require('util');
const pipe = promisify(pipeline);
const util = require('util');
const zlib = require('zlib');

const { logLineAsync, port, logFN } = require('./utils/utils');
const readdir = util.promisify(fs.readdir);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Folder path: '
});

// rl.prompt(); // выдать prompt и ждать ответа

// rl.on('line', path => {
//     if(!path) {
//         rl.close();
//     } else {
//         console.log(`path: ${path}`);
//         rl.close();
//     };
// });

// rl.on('close', () => {
//     console.log('sctipt comleted')
//     process.exit(0); // выход с признаком успешного завершения
// });


const link = `D:\\Web\\web project architecture\\web-project-architecture-example\\5693. AutoCompressor`;

// async function myF() {
//     let names;
//     try {
//       names = await readdir('./test');
//     } catch (err) {
//       console.log(err);
//     }
//     if (names === undefined) {
//       console.log('undefined');
//     } else {
//       console.log('All files', names);
//     }

//     return names;
// };

// let arr = myF();

const _path = './test';
//-----------------------------------------------------
async function readDir(_path) {
    return new Promise((resolve, reject) => {
        fs.readdir(_path, (error, result) => {
            if (error) {
                reject(error);
                console.log('--error', error)
                return 'error'
            } else {

                // let filePaths = [];

                // async.eachSeries(files, (fileName, eachCallback) => {
                //     // let filePath = path.join(dirPath, fileName);
                //     console.log('--fileName', fileName)
                // });

                //todo async.each?
                // var filePath = path.join(__path, fileName);

                // async.eachSeries(result, (fileName, eachCallback) => {
                //     console.log('--fileName', fileName)
                // });
                // console.log('----', result)
                //-------------------------------------------------------------------------------------------
                // result.forEach((fileName) => {
                //     let filePath = path.join(_path, fileName);

                //     fs.stat(filePath, fileName, (err, stats) => {

                //         let brokenFile = fileName.split('.');
                //         let _filename = brokenFile[0];


                //         if (stats.isFile()) {
                //             console.log('--brokenFile', brokenFile)
                //             console.log('--файл',_filename, stats.birthtimeMs)


                //             // do_gzip(filePath, `${filePath}.gz`)
                //             //     .catch((err) => {
                //             //         console.error('An error occurred:', err);
                //             //         process.exitCode = 1;
                //             //     });
                //         }
                //         if (stats.isDirectory()) {
                //             // console.log('--directory: ', filePath);
                //             readDir(filePath);
                //         }
                //     })
                // })


                resolve(result)
            }
        });
    });
};

readDir(_path)
    .then((res) => {
        // console.log('--результат функции', res);
        // for(let i=0; i<res.length; i++){
        //     console.log('--for', res[i], res[i].isFile())
        // }
        let filePaths = [];
        // fs.stat(_path, (err, stats) => {
        //     if (stats.isFile()) {
        //         console.log('    file');
        //     }
        //     if (stats.isDirectory()) {
        //         console.log('    directory');
        //     }
        // })
        // async.eachSeries(files, (fileName, eachCallback) => {
        //     let filePath = path.join(dirPath, fileName);
        // });
        res.forEach((fileName) => {
            let filePath = path.join(_path, fileName);

            fs.stat(filePath, fileName, (err, stats) => {

                let brokenFile = fileName.split('.');
                let _filename = brokenFile[0];


                if (stats.isFile()) {

                    // var сompressedFile;
                    let originalFilebirthtime;
                    let compressedFilebirthtime;

                    //не сжатые файлы
                    if (brokenFile[brokenFile.length - 1] != 'gz') {
                        //нашли сжатый файл
                        let сompressedFile = res.find(item => item === `${fileName}.gz`);
                        // let originalFilebirthtime = stats.birthtimeMs; //данные по фаул оригиналу
                        originalFilebirthtime = stats.birthtimeMs; //данные по фаул оригиналу

                        if (сompressedFile) {
                            // console.log('--есть зипы', сompressedFile)
                            // console.log('--сompressedFile', сompressedFile)
                            // console.log('--filePath', `${filePath}.gz`)


                            fs.stat(`${filePath}.gz`, сompressedFile, (err, stat) => {
                                compressedFilebirthtime = stat.birthtimeMs;


                                // console.log('--originalFilebirthtime', originalFilebirthtime, fileName)
                                // console.log('--compressedFilebirthtime', compressedFilebirthtime, сompressedFile)

                                if (compressedFilebirthtime >= originalFilebirthtime) {
                                    console.log('--с зипами все норм', fileName, сompressedFile)
                                } else {
                                    console.log('--зипы старые', fileName, сompressedFile)

                                    do_gzip(filePath, `${filePath}.gz`)
                                        .catch((err) => {
                                            console.error('An error occurred:', err);
                                            process.exitCode = 1;
                                        });
                                };
                            });


                            // originalFilebirthtime = stats.birthtimeMs; //данные по фаул оригиналу
                            // console.log('--originalFilebirthtime',fileName, stats.birthtimeMs, originalFilebirthtime, filePath)
                        };
                    };

                    // //условие, что этот файл сжатый
                    // if (brokenFile[brokenFile.length - 1] === 'gz') {
                    //     console.log('--сompressedFile1', сompressedFile)
                    //     console.log('--fileName', fileName)
                    //                         //получаем данные по сжатому файлу
                    // if(сompressedFile) {

                    //     compressedFilebirthtime = stats.birthtimeMs; //
                    //     console.log('--compressedFilebirthtime',fileName, stats.birthtimeMs, originalFilebirthtime)
                    // };
                    // };
                    // console.log('--сompressedFile2', сompressedFile)
                    // //получаем данные по сжатому файлу
                    // if(сompressedFile) {
                    //     console.log('--сompressedFile', сompressedFile)
                    //     compressedFilebirthtime = stats.birthtimeMs; //
                    //     console.log('--compressedFilebirthtime',fileName, stats.birthtimeMs, originalFilebirthtime)
                    //     // if(originalFilebirthtime > compressedFilebirthtime){
                    //     //     console.log('--файл устарел', сompressedFile, originalFilebirthtime, compressedFilebirthtime)
                    //     // }else{
                    //     //     console.log('--все файлы в порядке', сompressedFile, originalFilebirthtime, compressedFilebirthtime)
                    //     // };
                    // };



                    // do_gzip(filePath, `${filePath}.gz`)
                    //     .catch((err) => {  фыва
                    //         console.error('An error occurred:', err);
                    //         process.exitCode = 1;
                    //     });
                }
                if (stats.isDirectory()) {
                    readDir(filePath);
                };
            });
        });
    })
    .catch(err => { console.error(err); })
//-----------------------------------------------------


// var getFiles = function (dir, files_){

//     files_ = files_ || [];
//       var files = fs.readdirSync(dir);
//       for (var i in files){
//           var name = dir + '/' + files[i];
//           if (fs.statSync(name).isDirectory()){
//               getFiles(name, files_);
//           } else {
//               files_.push(name);
//           }
//       }
//       return files_;
//   };

//   console.log(getFiles('/home/Project/hello/www'));

async function checkVersionFile(original, compression) {
    console.log('--checkVersionFile', original, compression)
};

//Compression
async function do_gzip(input, output) {
    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
};