const express = require('express');
const path = require('path');

var reservations = [];
var waitlist = [];

const app = express();

//serves public folder to client
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//middleware that adds request time to request
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

//Gets homepage
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname+'/views/index.html'));
})

app.get('/tables', async (req, res) => {
    res.sendFile(path.join(__dirname+'/views/tables.html'));
})

app.get('/reserve', async (req, res) => {
    res.sendFile(path.join(__dirname+'/views/reserve.html'));
})

app.get('/api/tables', async (req, res) => {
    
    res.status(200).json({
        status: 'success',
        data: {
            reservations
        }
    })
})

app.get('/api/waitlist', async (req,res) => {
    res.status(200).json({
        status: 'success',
        data: {
            waitlist
        }
    })
})

app.post('/api/tables', async (req, res) => {
    const data = req.body;
    if(reservations.length < 6) {
        reservations.push(req.body);
        res.status(200).json({
            status: 'success',
            list: 'reservation',
            data: {
                data
            }
        })
    } else {
        waitlist.push(req.body);
        res.status(200).json({
            status: 'success',
            list: 'waitlist',
            data: {
                data
            }
        })
    }
})

//START SERVER
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});