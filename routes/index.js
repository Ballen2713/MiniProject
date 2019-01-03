/**Router file created for keeping the code organized and for good practice
 * this file has the routes that we defined and created originally in the app.js file 
 * we moved them into a route file for ease of use
 */
const express = require('express');
const router = express.Router();

//get route for our router that now gets the username of the user but 
//if there isn't a username entered it will redirect to the hello route page
router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) { 
      res.render('index',{name});  
    } else { 
        res.redirect('/hello');
    }   
}); 

//saves the username of the user within the cookies 
router.get('/hello', (req, res) => {
        const username = req.cookies.username; 
        if (username) { 
            res.redirect('/');
        } else { 
         res.render('hello');
        }
});
router.post('/hello', (req, res) => {
        res.cookie('username', req.body.username);
        res.redirect('/');
});
/**route will take the user to the username form 
 * where they will be able to enter in another username 
 * this is also anytime they click the back button
 */
router.post('/goodbye', (req, res) => {
    res.clearCookie('username');//gets the username that's in the placeholder of the cookie and resets it to nothing 
    res.redirect('/hello');
});
//First | Last Name 
/**
 * Directs the developer to the routerropiate webpage along with
 * the port that the page is listening to
 */

 module.exports = router; 