const {Router} = require('express');

const router = Router();

router.get('/', (req, res, next) => {
    res.render('showAll', {
        title: 'All pictures',
        isShowAll: true
    })
});

module.exports = router;