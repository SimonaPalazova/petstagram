// TODO: Require Controllers...
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const photoController = require('../controllers/photoController');

module.exports = (app) => {
    app.use(homeController);
    app.use('/users', userController);
    app.use('/photos', photoController);
    
    app.get('*', (req, res) => {
        res.redirect('/404');
    })
}
