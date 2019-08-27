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
            // console.log('cms user===>',cms_user);
                if (!cms_user || cms_user.length == 0) {
                    return done(null, false, req.flash('message', 'User Not Exist'));
                }
                if (!cms_user[0].status) {
                    
                    return done(null, false, req.flash('message', 'User Not Exist'));
                }
                bcrypt.compare(password, cms_user[0].password, (err, isMatch) => {
                    if (err) {
                        return done(null, false, req.flash('message', err));

                    }

                    if (isMatch) {
                        return done(null, cms_user[0]);
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
    models.cms_user.findAll({where:{ id: id}})
    .then((cmsuser)=> {
        done(null, cmsuser);
    }).catch((err)=> {
        if (err) {
            return done(err);
        }
    });
});