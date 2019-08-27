const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const passport = require('passport');
const app =express();
const User = require('../models/cms_user');


app.use(passport.initialize());
app.use(passport.session());




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('error', { title: 'sadasd' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Nanan' ,layout: false});
});

// router.post('/login',(req,res,next)=>{
//   const {username,password}=req.body;
//   let errors =[];
//   if(!username || !password){
//     errors.push({msg:'Please Fill All Fields'});
//   }
//
//   if(errors.length>0){
//     res.render('login',{
//       errors,
//       username,
//       password,
//       layout: false
//     })
//   }
//   else {
//
//   }
// });

router.post('/login',
    passport.authenticate('local', {
      successRedirect: "/admin",
      failureRedirect: '/users/login',
      failureFlash: true
    }));

module.exports = router;
