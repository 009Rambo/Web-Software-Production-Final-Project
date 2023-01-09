const mongoose = require('mongoose')
const app = require('./app');

const port = process.env.PORT || 5001;

mongoose
    .connect('mongodb+srv://Srijana:poudel1@cluster1.dhvt5yi.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(port, () => {
            console.log(`connected to db and Listening: http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
