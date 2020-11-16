const express = require('express');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;
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
            const fileName = file.originalname.replace(/\s+/g, '');
            cb(null, `${Date.now()}${fileName}`);
        }
    });

    const upload = multer({storage: storage});

    app.post("/", upload.single('img'), async (req, res) => {
        //console.log('POST request from:', req.headers['user-agent']);
        let filedata = req.file ? req.file : null;

        if(!filedata){
            console.log('there is no file');
        }

        const cook = new Cook({
            title: req.body.title,
            description: req.body.description ? req.body.description : '',
            worktime: req.body.worktime ? req.body.worktime : '',
            ingredients: req.body.ingredients ? req.body.ingredients : '',
            img: req.file ? req.file.filename : ''
        });
        cook.save()
            .catch(err => {
                res.send({message: err})
            })
            .then(data => {
                res.send(data);
            });
    });

    app.get('/:uid', async (req, res, next) => {
        const test = await Cook.findById(req.params.uid)
            .then((cook)=>{
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                res.send(cook);
            })
            .catch((err)=>{
                res.send({
                    message: err
                })
            })
    });

    app.get('/', async (req, res) => {
        console.log('GET request from:', req.headers['user-agent']);
        await Cook.find()
            .then((cooks)=>{
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                res.send(cooks);
            })
            .catch((err)=>{
                res.send({message:err})
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
