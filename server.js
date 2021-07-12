const express = require('express');


const app = express();

//serves public folder to client
app.use(express.static(__dirname + '/public'));
//middleware that adds request time to request
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

//Gets homepage
app.get('/', async (req, res) => {
    res.render('index');
})


//START SERVER
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});