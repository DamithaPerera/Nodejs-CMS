var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { PageHeader:'Service Providers' , title: 'testing'});
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Nanan' ,layout: false});
});

module.exports = router;
