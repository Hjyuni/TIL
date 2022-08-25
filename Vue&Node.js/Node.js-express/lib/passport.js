module.exports = (app) => {

  let authData = {
      email: '1@gmail.com',
      password: '1111',
      nickname: 'haha'
    };
  // npm install -S passport
  // npm install -S passport-local
  let passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
      done(null, user.email);
  });

  passport.deserializeUser(function (id, done) {
      done(null, authData);
  });

  passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'pwd'
      },
      function (username, password, done) {
          if (username === authData.email) {
              if (password === authData.password) {
                  return done(null, authData, {
                      message: 'Welcome.'
                  });
              } else {
                  return done(null, false, {
                      message: 'Incorrect password.'
                  });
              }
          } else {
              return done(null, false, {
                  message: 'Incorrect username.'
              });
          }
      }
  ));
  return passport;
} 