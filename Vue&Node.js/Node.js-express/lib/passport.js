let db = require('../lib/db');
// npm install --save bcryptjs && npm uninstall --save bcryptjs
let bcryptjs = require('bcryptjs');
let naverInfo = require('../config/naver.json')
let shortid = require('shortid');

module.exports = (app) => {
  // npm install -S passport
  // npm install -S passport-local
  let passport = require('passport')
  let LocalStrategy = require('passport-local').Strategy
  let  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
      done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    let user = db.get('users').find({id:id}).value();
    done(null, user)
  });

  passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'pwd'
      },
      function (email, password, done) {
        let user = db.get('users').find({
          email: email
        }).value();
        if (user) {
          bcryptjs.compare(password, user.password, function(err,result){
            if(result){
                return done(null, user, {
                    message: 'Welcome.'
                });
            } else {
                return done(null, false, {
                    message: 'Password is not correct.'
                });
            }
          });
        } else {
          return done(null, false, {
            message: 'There is no email'
          })
        }
      }
  ));

  let googleCredentials = require('../config/google.json');
  passport.use(new GoogleStrategy(
    {
      clientID: googleCredentials.web.client_id,
      clientSecret: googleCredentials.web.client_secret,
      callbackURL: googleCredentials.web.redirect_uris[0]
    },
    function(accessToken, refreshToken, profile, done) {
      let email = profile.emails[0].value;
      let user = db.get('users').find({email:email}).value();
      // 기존 user가 존재한다면
        if(user){
          user.googleId = profile.id;
          db.get('users').find({id:user.id}).assign(user).write();
      } else {
          user = {
              id:shortid.generate(),
              email:email,
              displayName:profile.displayName,
              googleId:profile.id
          }
          db.get('users').push(user).write();
      }
      done(null, user);
      // User.findOrCreate({ googleId: profile.id }, (err, user) => {
      //   return done(err, user);
      // });
    }
  ));

  app.get('/auth/google',
  passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login','email']
  }));

  app.get('/auth/google/callback',
  passport.authenticate('google', {
      failureRedirect: '/auth/login'
  }),
  (req, res) => {
      res.redirect('/');
  });

  return passport;
} 