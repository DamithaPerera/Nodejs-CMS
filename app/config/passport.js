const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const models = require('../../models/index');
const bcrypt = require('bcrypt');


module.exports =(passport)=> {
    passport.use(new Strategy({passReqToCallback: true}, (req, username, password, done) => {
        models.cms_user.findAll({
            where:{
                email: username
            }
        }).then(cms_user => {
                if (!cms_user) {
                    return done(null, false, req.flash('message', 'User Not Exist'));
                }
                if (!cms_user.status) {
                    return done(null, false, req.flash('message', 'User Not Exist'));
                }
                bcrypt.compare(password, cms_user.password, (err, isMatch) => {
                    if (err) {
                        return done(null, false, req.flash('message', err));

                    }

                    if (isMatch) {
                        return done(null, cms_user);
                    } else {
                        return done(null, false, req.flash('message', "Password is incorrect"));
                    }
                });
            }).catch(err => {
            console.log(err);
        });
    })
    )
}




passport.serializeUser( (user, done)=> {
    done(null, user.id);
});

passport.deserializeUser( (req, id, done) =>{
    models.cms_user.findAll({ id: id})
    .then((user)=> {
        done(null, user);
    }).catch((err)=> {
        if (err) {
            return done(err);
        }
    });
});