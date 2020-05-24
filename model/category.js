const mongoose = require('mongoose');
const Directors = mongoose.Schema;

const directory = new Directors({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
    },
    bio: {
        type: String
    }
});

module.exports = mongoose.model('directors', directory);

