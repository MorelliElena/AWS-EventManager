const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = 5000;

global.appRoot = path.resolve(__dirname);

mongoose.connect('mongodb://localhost/EventsDB', {useNewUrlParser: true, useUnifiedTopology: true}).then();

app.use(cors())

//Per gestire i parametri passati nel corpo della richiesta http.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('../src/routes/routes');
routes(app);

module.exports = app;
