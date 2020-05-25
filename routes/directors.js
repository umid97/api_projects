const mongoose = require('mongoose');
const express = require('express');
const Category = require('../model/category');

const router = express.Router();

router.post('/api/directors', (req, res, next) => {
    const category = new Category(req.body);

    const result = category.save();

    result
    .then((d)=>{
        res.send('Malumotlar saqlandi....');
    })
    .catch((err) => {
        res.send('Malumotlar saqlanmadi....');
    });
});

router.get('/api/directors', (req, res, next) => {
    const directory = Category.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'Kinolari:'
            }
        },
        {
            $unwind: {
                path: '$movies'
            }
        },
        {
            $group: {
                _id: {
                    name: '$name',
                    surname: '$surname'
                }
            }
        }
    ]);
       

    directory
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send(err);
    });
});


router.get('/api/directors/:id', (req, res, next) => {
    const id = req.params.id;
    const category = Category.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup:{
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'Kinolari: '
            }
        }
    ]);

    category
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send(err);
    });
})

router.put('/api/directors/:id', (req, res, next) => {
    const id = req.params.id;
    const directory = Category.findByIdAndUpdate(
        id,
        req.body
    );
    directory
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.delete('/api/directors/:id', (req, res, next) => {
    const id = req.params.id;
    const del = Category.findByIdAndDelete(id);

    del
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
});


module.exports = router;

