const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const queryController = require('./controllers/queryController');

let app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://sakthiapandian:ONdupx1TS8FpGHco@clustercar.9zvyi.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
app.post('/api/query', queryController.postQuery);
app.get('/api/queries', queryController.getQueries);

// Serving Views
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/contactUs', (req, res) => {
    res.sendFile(__dirname + '/views/contactUs.html');
});

app.get('/query', (req, res) => {
    res.sendFile(__dirname + '/views/query.html');
});

app.get('/QuerySuccessPage', (req, res) => {
    res.sendFile(__dirname + '/views/QuerySuccessPage.html');
});

app.get('/rating', (req, res) => {
    res.sendFile(__dirname + '/views/rating.html');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

let port = process.env.port || 3000;
app.listen(port, () => {
    console.log('express server started');
});
