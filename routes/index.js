const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const Cook = require('../models/cook');
const fs = require('fs');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './static/img')
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}${file.originalname}`);
        }
    });

    const upload = multer({storage: storage});

    app.post("/upload", upload.single('df'), async (req, res) => {
        let filedata = req.file;
        console.log(req.body.name);
        if(!filedata){
            res.send("Файл не загружен");
        }else{
            res.send(`Файл загружен: ${JSON.stringify(filedata)}`);
        }
    });


    app.get('/', async (req, res) => {
        await Cook.find()
            .then((cooks)=>{
                console.log('GET request from:', req.headers['user-agent']);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                res.send(cooks);
            })
            .catch((err)=>{
                res.send({message:err})
            });
    });

    app.post('/', async (req, res) => {
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

    app.delete('/', async (req, res) => {
        console.log(req.body);
        Cook.findByIdAndDelete({_id:req.body.id}).then((cook)=>{
            res.send(cook);
        })
            .catch(err => {
                res.send({message: err})
            })
    });
};