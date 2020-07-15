const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const host = '192.168.0.107';
const bodyParser = require('body-parser');
const Cook = require('./models/cook');

app.use(bodyParser.json());
app.get('/', async (req, res)=>{
    await Cook.find()
        .then((cooks)=>{
            res.send(cooks);
        })
        .catch((err)=>{
            res.send({message:err})
        });
});

app.post('/', (req, res)=>{
    console.log(req.body);
    console.log('POST request from:', req.headers['user-agent']);
    const cook = new Cook({
        title: req.body.title,
        description: req.body.description
    });

    cook.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({message: err})
        });
});

app.delete('/', function (req, res) {
    console.log(req.body);
    Cook.findByIdAndDelete({_id:req.body.id}).then((cook)=>{
        res.send(cook);
    })
        .catch(err => {
            res.send({message: err})
        })
});


mongoose.connect('mongodb://localhost:27017/homeDB', { useUnifiedTopology: true, useNewUrlParser: true  },()=>{
    console.log('connected to DB');
});


app.listen(port, host, ()=>{
    console.log('server is running on: ', host);
});
