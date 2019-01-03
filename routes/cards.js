const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data; 

router.get('/', (req, res) => { 
    const numOfCards = cards.length; 
    const flashcardId = Math.floor(Math.random() * numOfCards); 
    res.redirect(`/cards/${flashcardId}`);
});

router.get('/:id',(req, res)=> {
    const { side } = req.query; 
    const { id } = req.params; 

    if (!side) { 
        return res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username; 
    const text = cards[id][side]; 
    const { hint } = cards[id]; 

    const templateData = { id,text,name,side }; 
    

//Conditional for checking to see what side of the card we are on
 if(side == 'question') {
     templateData.hint = hint; 
     templateData.sideToShow = "answer";//links to the answer side of the card 
     templateData.sideToShowDisplay = "Answer";
 } 
 else { 
     templateData.sideToShow = "question";
     templateData.sideToShowDisplay = "Question";
 }
   res.render('card', templateData);
});

module.exports = router; 