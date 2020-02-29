const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');
const bodyParser = require("body-parser");

const webserver = express();

const port = 3030;
const logFN = path.join(__dirname, '_server.log'); //логирование

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

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

function validateForm(formData) {
    const { name, age } = formData;

    let isValid = false;
    let formBodyError = [...formBody];

    formBodyError[2] = formBody[2].replace(/value=""/, `value ="${name}"`);
    formBodyError[5] = formBody[5].replace(/value=""/, `value ="${age}"`);

    //valid name
    if(name.length === 0){
        formBodyError[2] = formBodyError[2] + `<span style='color:red;'>Поле "Ваше имя" пустое<span>`;
        isValid = true;
    }else if(name.length > 15){

        formBodyError[2] = formBodyError[2] + `<span style='color:red;'>Ерунда, а не имя<span>`;
        isValid = true;
    };
    
    //valid age
    if(age.length === 0){
        formBodyError[5] = formBodyError[5] + `<span style='color:red;'>Поле "Ваш возраст" пустое<span>`;
        isValid = true;
    }else if(+age < 6 || +age > 100){
        formBodyError[5] = formBodyError[5] + `<span style='color:red;'>Лукавите, проверьте ваш возраст<span>`;
        isValid = true;
    }else if(!/[0-9]+$/.test(age)){
        formBodyError[5] = formBodyError[5] + `<span style='color:red;'>Ерунду отправили, проверьте введенные данные<span>`;
        isValid = true;
    };

    return {isValid, formBody: formBodyError};
};

webserver.get('/', (req, res) => { 
    res.send(formBody.join(''));
});

webserver.post('/processForm', urlencodedParser, (req, res) => { 
    if(!req.body) return req.sendStatus(400);

    const { name, age } = req.body
    const validForm = validateForm(req.body);

    if(validForm.isValid){
        res.send(validForm.formBody.join(''));
    }else{
        res.send(
            `
                <span>Форма отправлена</span>
                <span>Имя: ${name}</span>
                <span>Возраст: ${age}</span>
            `
        );
    };
});

webserver.listen(port, () => {
    logLineSync(logFN,"web server running on port "+port);
});