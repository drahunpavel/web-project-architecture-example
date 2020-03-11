let host = window.location.href;
let blockInput = document.getElementById("blockInput");
let blockAnswers = document.getElementById("blockAnswers");
let uploadButton = document.getElementById("uploadButton");
let sendButton = document.getElementById("sendButton");
let showButton = document.getElementById("showStatistics");
let preview = document.getElementById("preview");
let variants = [];
let answers = [];
let selectedVariants = null;

uploadButton.disabled = false;
sendButton.disabled = true;

async function uploadAnswerOptions() {

    let url = `${host}variants`;
    let response = await fetch(url);
    let data = await response.json(); // читаем ответ в формате JSON

    variants = data;
    uploadButton.disabled = true;

    let inputList = variants.map((item) => {
        blockInput.innerHTML += `
            <input type="radio" id=${item.id} name="contact" value=${item.title} onclick="checkType(this)">
            <label for=${item.id}>${item.title}</label>
        `
    });
};

async function sendAsnwers() {

    blockAnswers.innerHTML = '';

    let answer = { id: selectedVariants }

    let url = `${host}vote`;
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answer)
    });

    let result = await response.json();
    answers = result;

    let optionList = answers.map((item) => {
        blockAnswers.innerHTML += `
            <p>Option: ${item.id}, amount: ${item.count}</p>
        `
    });
};

async function showStatistics() {

    blockAnswers.innerHTML = '';

    let url = `${host}stat`;
    let response = await fetch(url);
    let data = await response.json(); // читаем ответ в формате JSON
    answers = data;

    let optionList = answers.map((item) => {
        blockAnswers.innerHTML += `
            <p>Option: ${item.id}, amount: ${item.count}</p>
        `
    });
};

function checkType(node) {

    selectedVariants = node.value;
    sendButton.disabled = false;
};

async function serviceReturnDifferentTypes(type) {

    let acceptType = checkTypeAcceptType(type);

    const url = `${host}serviceReturnDifferentTypes`;
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: acceptType
        },
    });
    let result;

    if(type === 'JSON'){
        result = await response.json();
        preview.innerHTML = JSON.stringify(result);
    }else if(type === 'HTML' || 'XML'){
        result = await response.text();
        preview.innerHTML = result;
    };
};

async function serviceDownload(type) {

    let url = `${host}download`;
    let response = await fetch(url);
    let data = await response.json();
};

function checkTypeAcceptType(type) {

    let acceptType;

    switch (type) {
        case 'JSON':
            acceptType = 'application/json';
            break;

        case 'XML':
            acceptType = 'text/xml';
            break;

        case 'HTML':
            acceptType = 'text/html';
            break;

        default:
            acceptType = 'text/html';
            break;
    };

    return acceptType;
};