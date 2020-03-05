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



// пишет строку в файл лога и одновременно в консоль
function logLineSync(logFilePath,logLine) {
    const logDT=new Date();
    let time=logDT.toLocaleDateString()+" "+logDT.toLocaleTimeString();
    let fullLogLine=time+" "+logLine;

    const logFd = fs.openSync(logFilePath, 'a+'); // и это же сообщение добавляем в лог-файл
    fs.writeSync(logFd, fullLogLine + os.EOL); // os.EOL - это символ конца строки, он разный для разных ОС
    fs.closeSync(logFd);
};

function assembleForm(formData, validResult) {
    const { name, age } = formData;

    const formBody = [
        `<form method="POST" action="/processForm">`,
            `<div>`,
                `<label"><span>Ваше имя:</span> <input type="text" id="name" name="name" value="${name}"/></label>`,
            `</div>`,
            `<div>`,
                `<label">Ваше возраст:<input type="number" id="age" name="age" value="${age}"/></label>`,
            `</div>`,
            `<input type=submit value="Отправить"/> 
        </form>`
    ];

    validResult.errors.forEach((item) => {
        if(item.param === 'name'){
            formBody[2] = formBody[2] + `<span style='color:red; margin-left: 10px'>${item.msg}<span>`;
        };
        if(item.param === 'age'){
            formBody[5] = formBody[5] + `<span style='color:red; margin-left: 10px'>${item.msg}<span>`;
        };
    });

    return formBody;
};

webserver.get('/', (req, res) => { 

    logLineSync(logFN,"visited the page '/' on port "+port);
    
    const body = {
        name: '',
        age: ''
    };
    const result = {errors: []};

    const form = assembleForm(body, result);

    res.send(form.join(''));
});

webserver.get('/processForm', (req, res) => {

    res.send(`Возвращайся на главную страницу :)`);
});

webserver.post('/processForm', urlencodedParser, [

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

        logLineSync(logFN,`form successfully processed, get name: ${name}, age: ${age} on port `+port);

        res.send(
            `
                <span>Форма отправлена</span>
                <span>Имя: ${name}</span>
                <span>Возраст: ${age}</span>
            `
        );
    }else{
        const formBodyWithErrors = assembleForm(req.body, errors);

        logLineSync(logFN,`form processing errors, get name: ${name}, age: ${age} on port `+port);

        res.send(formBodyWithErrors.join(''));
    }
});

webserver.listen(port, () => {
    logLineSync(logFN,"web server running on port "+port);
});