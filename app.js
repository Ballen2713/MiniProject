const express = require('express');//Gain access to all of the express js tools 
const bodyParser = require('body-parser'); //another way of organizing the requested data 
const cookieParser = require('cookie-parser');
const app = express();

//Setups up the put view engine to render the pug template 
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/static',express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use(express.static(__dirname + '/views'));
app.use((req, res, next) => { 
    const err = new Error('Not Found');
    err.status = 404; 
    next(err);
});

app.use((err, req, res, next) => { 
    res.locals.error = err; 
    if (err.status >= 100 && err.status < 600)
        res.status(err.status); 
    else
        res.status(500);
    res.render('error');
});

/**
 * Directs the developer to the appropiate webpage along with
 * the port that the page is listening to
 */
app.listen(3000, () => {
    console.log('Application running on localhost:3000!, \n link: http://localhost:3000/')
});
