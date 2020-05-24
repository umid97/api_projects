const express = require('express');
const router = express.Router();

// Schema require
const Movie = require('./../model/movie');

// movies add insert
router.post('/api/movies', (req, res, next) => {
    const data = new Movie(req.body);
    data.save()
    .then((d)=>{
        res.send(d);
    })
    .catch(()=>{
        res.send('Saqlanmadi....');
    });
});

// movies get all data
router.get('/api/movies', (req, res, next) => {
    const data = Movie.find();
    data
    .then((all)=>{
        res.send(all);
    })
    .catch((err)=>{
        res.send(err);
    });
});

// data one update
router.put('/api/movies/:id', (req, res, next)=>{
    const id = req.params.id;
    Movie.findByIdAndUpdate(
        id,
        {
            year: 2020
        },
        (err, data)=>{
            if(err)
                res.send(err);
            res.json(data);
        }
    );
});

// data one delete
router.delete('/api/movies/:id', (req, res, next)=>{
    const id = req.params.id;
    const result = Movie.deleteOne(
        { _id: id }
    );
    result
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.send(err);
    });
});

module.exports = router;

