const {Router} = require('express');

const router = Router();

const { logLineAsync, port, logFN } = require('../utils/utils');

router.get('/', (req, res, next) => {

    logLineAsync(logFN, `[${port}] ` + `visited Home page`);

    res.render('index', {
        title: 'Home page',
        isHome: true
    })
});

module.exports = router;