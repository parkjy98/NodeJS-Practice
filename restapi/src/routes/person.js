let express = require('express');
let router = express.Router();

//QueryString, which is a query property on the request object
//localhost:3000/person?name=thomas&age=20 Gets person by QueryString
router.get('/person', function(req, res) {
    if(req.query.name) {
        res.send(`You have requested a person ${req.params.name}`);
    }
    else {
        res.send('You have requested a person');
    }
});

//Params property on the request object
//localhost:3000/person/thomas Gets person by param
router.get('/person/:name', function(req, res) {
    res.send(`You have requested a person ${req.params.name}`); //You have requested a person + name
});

//This part forces an error(?)
router.get('/error', (req, res) => {
    throw new Error('This is a forced error');
})

module.exports = router;