var express = require('express');
const app =express();
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { PageHeader:'Service Providers' , title: 'testing'});
});



//passport.use(new Strategy({passReqToCallback:true}))

module.exports = router;
