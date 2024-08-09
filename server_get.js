const express = require('express');
const mongoose = require("mongoose");
let app = express();
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  };
 
app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://sakthiapandian:ONdupx1TS8FpGHco@clustercar.9zvyi.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true})
const userSchema = new mongoose.Schema({
    firstName : String,
   lastName : String,
    emailId : String,
    phoneNumber : String,
    query: String,
})
const User = mongoose.model('User', userSchema)

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/api/query', async(req,res)=>{
    const { firstName,lastName, emailId, phoneNumber, query } = req.body;
    const user = new User({firstName,lastName, emailId, phoneNumber, query});
    const savedUser = await user.save()
    res.json({message:'data inserted successfully', savedUser})
})

app.get('/', function (req,res) {
  res.render('indexMongo.html');
});

app.get('/api/queries', async(req,res) => {
    try {
        const users = await User.find()
        res.json(users)
 }catch(err){
  return res.status(500).json({message:'error retrived in getting users'})
    }

});

let port = process.env.port || 3000;
app.listen(port, ()=>{
    console.log('express server started');
});
