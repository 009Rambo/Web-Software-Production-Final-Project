const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Connect to db

mongoose.connect('mongodb+srv://Srijana:poudel1@cluster1.dhvt5yi.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {

        //listen for request
        app.listen(process.env.PORT,() => {
            console.log('Connected to db and listening on port', process.env.PORT)
        
        })
    })
    .catch((error) =>{
        console.log(error)
    })


app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
