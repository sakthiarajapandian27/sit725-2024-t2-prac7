import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as queryController from './controllers/queryController.js';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(new URL('public', import.meta.url).pathname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://sakthiapandian:ONdupx1TS8FpGHco@clustercar.9zvyi.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.post('/api/query', queryController.postQuery);
app.get('/api/queries', queryController.getQueries);

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

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('Express server started');
});

export default app;  
