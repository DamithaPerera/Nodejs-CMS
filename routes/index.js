var express = require('express');
const app =express();
var router = express.Router();
const isAuthunticated = require('../app/config/ensureAuthunticated');

/* GET home page. */
router.get('/',isAuthunticated, function(req, res, next) {
  res.render('index', { PageHeader:'Service Providers' , title: 'testing'});
});



//passport.use(new Strategy({passReqToCallback:true}))

module.exports = router;
