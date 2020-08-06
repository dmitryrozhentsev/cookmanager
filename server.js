const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const host = '172.16.2.244';


app.use(express.static(__dirname + "/public"));

require('./routes/index')(app);

mongoose.connect('mongodb://localhost:27017/homeDB', { useUnifiedTopology: true, useNewUrlParser: true  },()=>{
    console.log('connected to DB');
});

app.listen(port, host, ()=>{
    console.log('server is running on: ', host);
});
