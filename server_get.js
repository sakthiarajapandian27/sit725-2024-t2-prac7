import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as queryController from './controllers/queryController.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io'; 

const app = express();
const httpServer = createServer(app); 
const io = new Server(httpServer); 

app.use(express.static('public'));
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(new URL('public', import.meta.url).pathname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect('mongodb+srv://sakthiapandian:ONdupx1TS8FpGHco@clustercar.9zvyi.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.post('/api/query', queryController.postQuery);
app.get('/api/queries', queryController.getQueries);

io.on('connection', (socket) => {
    console.log('A user connected'); 
    socket.emit('message', 'Welcome to DriveWithUs, we are excited to have you here.');
    socket.on('disconnect', () => {
        console.log('User disconnected'); 
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/contactUs', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/contactUs.html'));
});

app.get('/query', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/query.html'));
});

app.get('/QuerySuccessPage', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/QuerySuccessPage.html'));
});

app.get('/rating', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/rating.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

const port = process.env.port || 3000;
httpServer.listen(port, () => {
    console.log('Express server with Socket.IO started on port', port);
});

export default app;  
