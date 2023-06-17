const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/authMiddleware');


module.exports = (app) => {
    
    //TODO: Setup the view engine
    app.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', 'src/views');
   
    //TODO: Setup the body parser
    app.use(express.urlencoded({ extended: false }));
    
    //TODO: Setup the static files
    //ne e 'src/static' zashtoto v html-a e zadadeno /static..
    app.use(express.static('src'));

    //Setup cookieParser
    app.use(cookieParser());

    //Middleware
    app.use(auth);



};