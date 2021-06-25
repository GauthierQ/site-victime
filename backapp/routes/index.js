var express = require('express');
var router = express.Router();

const dumb_data = require('../dumb_data.json')

router.post('/check', function(req, res, next) {
  const username = req.body.username;
  const hash = req.body.hash;
  console.log(hash);
  dumb_data.forEach(account => {
    if ((account.username == username) && (account.password == hash)) {
      res.status(200).send({connection: true});
    }
  });
  res.status(401).send({connection: false});
});

module.exports = router;
