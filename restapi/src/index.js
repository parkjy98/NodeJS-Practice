let express = require('express');
let app = express();
let personRoute = require('./routes/person'); //"import" the person route in
let path = require('path');
let bodyParser = require('body-parser');
let customerRoute = require('./routes/customer');

app.use(bodyParser.json());
//Middleware that prints out time and URL whenever a request is sent in
app.use((req, res, next) => {
    console.log(`${new Date().toString()} and URL requested is: ${req.originalUrl}`, req.body) //prints out the date as a string and the URL requested
    next(); //Need this to go to the next request in the "array" of requests
});
app.use(personRoute); //let the app start using the person route
app.use(customerRoute);
app.use(express.static('public')) //last thing in our "array" of requests

//Handler for 404 - Resource not found error
//localhost:3000/thisDoesNotExist
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!')
});
//Handler for 505 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html')); //When it gets the 500 error, it'll look up the file name and open it
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
