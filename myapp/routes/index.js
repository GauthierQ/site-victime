var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");

const dumb_data = require('../dumb_data.json')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Victim Website' });
});

router.post('/connected', function(req, res, next) {
  var hash = CryptoJS.SHA256(req.body.password);
  var hash = hash.toString(CryptoJS.enc.Base64);
    
  if ((dumb_data.username == req.body.username) && (dumb_data.password == hash)) {
    res.render('connected', { title: 'Victime Website',username: req.body.username});
  } else {
    res.render('index', { title: 'Victim Website', error: 'Invalid credentials' });
  }
});

module.exports = router;
