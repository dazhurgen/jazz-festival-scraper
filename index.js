const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');
const app = express();
const port = 3000;
const scraper = require('./scraper');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb',extended: false}));
app.use(cors({origin: '*'}));
app.use(bodyParser.json())

app.get('/get/jazzfestival/list', function(req, res){
  console.log('arrived get request');
  scraper.scrapeJass('http://www.jazzinmarciac.co.uk/festival.html').then(data=>{
    res.json(data);
  }).catch(error=>{
    res.json(error);
  });
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/', express.static(path.join(__dirname, 'public')));
  app.listen(port, function() {
    console.log('Scraper server listening on port '+port);
  });
