#!/usr/bin/env node
const PORT = process.env.PORT || 8080;
const app = require('express')();
const bodyParser = require('body-parser');
const printf = require('printf');
const mongoose = require('mongoose');

const web = require('./class/router.js');

/* Mongoose */

mongoose.connect('mongodb://localhost/pp3', {useNewUrlParser: true});


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
