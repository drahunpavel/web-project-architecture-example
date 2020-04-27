const {Router} = require('express');

const router = Router();

const { logLineAsync, port, logFN } = require('../utils/utils');

router.get('/', (req, res, next) => {

    logLineAsync(logFN, `[${port}] ` + `visited Show All page`);

    res.render('showAll', {
        title: 'All pictures',
        isShowAll: true,
        test: 'тест'
    })
});

module.exports = router;