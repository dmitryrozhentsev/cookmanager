const express = require('express');
const router = express.Router();
const Cook = require('../models/cook');

router.get('/test', (req, res) => {
    console.log('post req');
});

router.post('/test', (req, res) => {
    console.log('post req', req.body);
    // const cook = new Cook({
    //     title: req.body.title,
    //     description: req.body.description
    // });
    //
    // cook.save()
    //     .then(data => {
    //         res.json(data);
    //     })
    //     .catch(err => {
    //         res.json({message: err})
    //     });
});

module.exports = router;