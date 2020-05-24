const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://umidjon:umidjon1997@cluster0-q96hg.mongodb.net/test',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
    )
    .then(()=>{
        console.log('Connected.....');
    })
    .catch(()=>{
        console.log('No Connected.....');
    });
}