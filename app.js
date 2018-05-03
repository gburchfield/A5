require('./api/data/dbconnection.js');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors({
    origin: true,
    credentials: true
}));
app.use((req, res, next)=>{
    console.log(req.method, req.url);
    next();
});

//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/api', routes);
app.use((err, req, res, next) => {
    res
    .status(422)
    .send({error: err.message});
});


module.exports = app;
