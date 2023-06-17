const router = require('express').Router();

const photoManager = require('../managers/photoManager');

const { getErrorMessage } = require('../untils/errorHelpers');

const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth ,(req, res) => {
    res.render('photos/create')
})

router.post('/create', isAuth ,async(req, res) => {
    const photoData = {
        ...req.body,
        owner: req.user._id,
    };
    try{
        await photoManager.create(photoData);
        res.redirect('/photos/catalog');

    } catch(err){
        res.render('photos/create', {error: getErrorMessage(err)});
    }
    
});

router.get('/catalog', async(req, res) => {
    const photos = await photoManager.getAll();

    res.render('photos/catalog', { photos });
});

router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    try{
        const photo = await photoManager.getOne(photoId);
        const isOwner = req.user?._id == photo.owner._id;

        res.render('photos/details', { photo, isOwner})
    } catch (err){
        res.render('photos/catalog', {error: getErrorMessage(err)});
    }
    
})

router.get('/:photoId/delete', isAuth, async(req, res) => {
    const photoId = req.params.photoId;
    try{
        await photoManager.delete(photoId);

        res.redirect('/photos/catalog');

    } catch(err){
        res.render(`photos/details`, {error: 'Unsuccessful photo deletion'});
    }
    
})

router.get('/:photoId/edit', isAuth, async(req, res) => {
    const photo = await photoManager.getOne(req.params.photoId);

    res.render('photos/edit', { photo });
});

router.post('/:photoId/edit', isAuth, async(req, res) => {

    const photoId = req.params.photoId;
    const photoData = req.body;

    try{
        await photoManager.edit(photoId, photoData);
        res.redirect(`/photos/${photoId}/details`);

    }catch (err){
        res.render('photos/edit', {error:'Unable to update photo', ...photoData});
    }
   
});

router.post('/:photoId/comments', isAuth, async(req, res) => {
    const photoId = req.params.photoId;
    const { message } = req.body;
    const user = req.user._id;

    try{

        await photoManager.addComment(photoId, {user, message});
        console.log(message);
        res.redirect(`/photos/${photoId}/details`);

    } catch(err){
        res.render('photos/edit', {error:'Unable to upload comment'});
    }
})

module.exports = router;