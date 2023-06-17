const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/' , (req, res) => {
    res.render('home');
});
router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/profile', isAuth ,async(req, res) => {
    const userId = req.user._id
    const photos = await photoManager.getByOwner(userId);

    res.render('profile', { photos, photosCount: photos.length});
});

module.exports = router;