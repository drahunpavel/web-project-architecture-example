const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');
const bodyParser = require("body-parser");

const webserver = express();

const port = 3097;

const logFN = path.join(__dirname, '_server.log'); //логирование
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});
const { check, validationResult } = require('express-validator');

const formBody = [
    `<form method="POST" action="/processForm">`,
        `<div>`,
            `<label"><span>Ваше имя:</span> <input type="text" id="name" name="name" value=""/></label>`,
        `</div>`,
        `<div>`,
            `<label">Ваше возраст:<input type="number" id="age" name="age" value=""/></label>`,
        `</div>`,
        `<input type=submit value="Отправить"/> 
    </form>`
];

// пишет строку в файл лога и одновременно в консоль
function logLineSync(logFilePath,logLine) {
    const logDT=new Date();
    let time=logDT.toLocaleDateString()+" "+logDT.toLocaleTimeString();
    let fullLogLine=time+" "+logLine;

    const logFd = fs.openSync(logFilePath, 'a+'); // и это же сообщение добавляем в лог-файл
    fs.writeSync(logFd, fullLogLine + os.EOL); // os.EOL - это символ конца строки, он разный для разных ОС
    fs.closeSync(logFd);
};

//собирает форму с ошибками
function assembleFormWithErrors(formData, validResult) {
    const { name, age } = formData;

    let formBodyError = [...formBody];

    formBodyError[2] = formBody[2].replace(/value=""/, `value ="${name}"`);
    formBodyError[5] = formBody[5].replace(/value=""/, `value ="${age}"`);

    validResult.errors.forEach((item) => {
        if(item.param === 'name'){
            formBodyError[2] = formBodyError[2] + `<span style='color:red; margin-left: 10px'>${item.msg}<span>`;
        };
        if(item.param === 'age'){
            formBodyError[5] = formBodyError[5] + `<span style='color:red; margin-left: 10px'>${item.msg}<span>`;
        };
    });

    return {formBody: formBodyError}
};

webserver.get('/', (req, res) => { 

    logLineSync(logFN,"visited the page '/' on port "+port);
    
    res.send(formBody.join(''));
});

webserver.post('/processForm', urlencodedParser, [

    logLineSync(logFN,"visited the page '/processForm' on port "+port),

    check('name')
        .not().isEmpty()
        .withMessage("Полу пустое")
        .isLength({ min: 3, max: 15 })
        .withMessage('Количество символов от 3х до 15ти')
        .escape(),
        
    check('age')
        .isNumeric()
        .withMessage("Введены не цифры")
        .not().isEmpty()
        .withMessage("Полу пустое")
        .isInt({min: 6, max: 90})
        .withMessage('Возраст должен быть от 6 до 90')
        .escape(),
  ], (req, res) => {
    const errors = validationResult(req);

    const name = req.body.name;
    const age = req.body.age;

    if (errors.isEmpty()) {

        logLineSync(logFN,"form successfully processed on port "+port);

        res.send(
            `
                <span>Форма отправлена</span>
                <span>Имя: ${name}</span>
                <span>Возраст: ${age}</span>
            `
        );
    }else{
        const formBodyWithErrors = assembleFormWithErrors(req.body, errors);

        logLineSync(logFN,`form processing errors, get name: ${name}, age: ${age} on port `+port);

        res.send(formBodyWithErrors.formBody.join(''));
    }
});

webserver.listen(port, () => {
    logLineSync(logFN,"web server running on port "+port);
});