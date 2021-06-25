var express = require('express');
var router = express.Router();
var axios = require('axios');
var CryptoJS = require("crypto-js");

const configs = require('../configs.json');

const instance = axios.create({
  baseURL: configs.backURL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'yolo'}
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Victim Website' });
});

router.get('/connected', function (req, res, next) {
  if (req.cookies.connection_status == 'true') {
    res.render('connected', { title: 'Victim Website', username: req.body.username});
  } else {
    res.redirect('/');
  }
})

router.post('/connection', function(req, res, next) {
  var hash = CryptoJS.SHA256(req.body.password);
  var hash = hash.toString(CryptoJS.enc.Base64);
  instance.post('/check', {
    username: req.body.username,
    hash: hash
  })
  .then(function (response) {
    if (response.data.connection == true) {
      res.cookie('connection_status', true, { maxAge: 900000, httpOnly: true });
      res.redirect('/connected');
    } else {
      res.redirect('/');
    }
  })
  .catch(function (error) {
    res.redirect('/');
  });
});

router.post('/logout', (req, res, next) => {
  res.clearCookie('connection_status');
  res.redirect('/');
});

module.exports = router;
