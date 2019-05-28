#!/usr/bin/env node
const CONFIG = require('./config.js');
const PORT = process.env.PORT || CONFIG.PORT[process.env.SERVICE];
const MONGO = process.env.MONGO || 'localhost';
const MONGO_CREDS = process.env.MONGO_CREDS || '';
const DB = process.env.DATABASE || 'pp3';
const app = require('express')();
const bodyParser = require('body-parser');
const printf = require('printf');
const mongoose = require('mongoose');

const web = require('./class/router.js');

/* Mongoose */
mongoose.connect(`mongodb://${MONGO_CREDS}${MONGO}/${DB}`,
                 {useNewUrlParser: true});


/* Express */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  let d = new Date();
  console.log(printf(
    '%02d:%02d:%02d %10s (%3d) %s',
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    `[${req.method}]`,
    req.headers['content-length'] || 0,
    req.path,
  ));
  next();
});

app.use(web(mongoose));

app.listen(PORT, _ => console.log(`http://localhost:${PORT}`));
