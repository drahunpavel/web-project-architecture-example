const fs = require('fs');
const path = require('path');
const {Router} = require('express');

const router = Router();

const { logLineAsync, port, logFN } = require('../utils/utils');

router.get('/', (req, res, next) => {

    logLineAsync(logFN, `[${port}] ` + `visited Show All page`);

    fs.readFile(path.join(__dirname, '../files', 'allFiles.json'), 'utf8', (err, data) => {
        if (err) throw err;

        let parsData = JSON.parse(data);    

        res.render('showAll', {
            isShowAll: true,
            allFilesArr: parsData
        })
    });
});

module.exports = router;