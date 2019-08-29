const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const passport = require('passport');
const app =express();
const User = require('../models/cms_user');


app.use(passport.initialize());
app.use(passport.session());




/* GET users listing. */
router.get('/dashbord', function(req, res, next) {
  res.render('error', { title: 'sadasd' });
});

router.get('/login', (req, res, next) => {
  res.render('login', {
      title: 'Nanan' ,
      layout: false,
      errorMsg:req.flash('error_msg')});
});

router.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/users/login');
    });

router.post('/login',
    passport.authenticate('local', {
      successRedirect: "/",
      failureRedirect: '/users/login',
      failureFlash: true
    }));

module.exports = router;
