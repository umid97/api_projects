const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movies = new Schema({
    director_id: Schema.Types.ObjectId,


    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
    year:{
        type: Number,
    },
    imdb_score:{
        type: Number
    }
});

const MovieModel = mongoose.model('movies', Movies);

module.exports = MovieModel;