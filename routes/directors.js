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
    const promise = Category.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'Kinolari: '
            }
        },
        // {
        //     $unwind: {
        //         path: '$movies'
        //     }
        // },
        {
            $group:{
                _id:{
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                    movies: '$movies'
                }
            }
        }
    ]);

    promise
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send(err);
    })
});


module.exports = router;

