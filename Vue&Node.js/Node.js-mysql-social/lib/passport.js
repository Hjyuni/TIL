import db from './db.js';
// import shortid from 'shortid';

import passport from 'passport'
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';
import {Strategy as NaverStrategy} from 'passport-naver';
import {Strategy as KakaoStrategy} from 'passport-kakao';

import googleCredentials from '../config/google.json' assert {type: "json"};
import naverCredentials from '../config/naver.json' assert {type: "json"};
import kakaoCredentials from '../config/kakao.json' assert {type: "json"};

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      done(null, id);
  });   
     
  // google social login
  passport.use(new GoogleStrategy(
    {
      clientID: googleCredentials.web.client_id,
      clientSecret: googleCredentials.web.client_secret,
      callbackURL: googleCredentials.web.redirect_uris[0]
    },
    function(accessToken, refreshToken, profile, done) {
      // console.log(profile.id);
      db.query(`SELECT id FROM users WHERE id = ?`,[profile.id],(err,res)=>{
        if (err) throw err;
        console.log(res[0]);
        if (res[0] === undefined){
          db.query(`INSERT INTO users(id, email, nickname, provider) VALUES (?,?,?,?)`,[profile.id, profile.emails[0].value, profile.displayName, profile.provider],(err,res)=>{
            console.log('Hello New Google Member!')
          })
        }
        else{
          console.log('google success')
        }
      });
      done(null, profile);
    }
  ));

  app.get('/login/google',
  passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login','email']
  }));

  app.get('/login/google/callback',
  passport.authenticate('google', {
      failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/')
  });

  // naver social login
  passport.use(new NaverStrategy(
    {
      clientID: naverCredentials.naver.client_id,
      clientSecret: naverCredentials.naver.client_secret,
      callbackURL: naverCredentials.naver.redirect_uris
    },
    function(accessToken, refreshToken, profile, done) {
      // console.log(profile.id);
      db.query(`SELECT id FROM users WHERE id = ?`,[profile.id],(err,res)=>{
        if (err) throw err;
        console.log(res[0]);
        if (res[0] === undefined){
          db.query(`INSERT INTO users(id, email, nickname, provider) VALUES (?,?,?,?)`,[profile.id, profile.emails[0].value, profile.displayName, profile.provider],(err,res)=>{
            console.log('Hello New Naver Member!')
          })
        }
        else{
          console.log('naver success')
        }
      });
      done(null, profile);
    }
  ));

  app.get('/login/naver',
  passport.authenticate('naver', {
      scope: ['https://nid.naver.com/oauth2.0/authorize','email']
  }));

  app.get('/login/naver/callback',
  passport.authenticate('naver', {
      failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/')
  });

  // kakao social login
  passport.use(new KakaoStrategy(
    {
      clientID: kakaoCredentials.kakao.client_id,
      clientSecret: kakaoCredentials.kakao.client_secret,
      callbackURL: kakaoCredentials.kakao.redirect_uris
    },
    function(accessToken, refreshToken, profile, done) {
      // console.log(profile.id);
      db.query(`SELECT id FROM users WHERE id = ?`,[profile.id],(err,res)=>{
        if (err) throw err;
        if (res[0] === undefined){
          db.query(`INSERT INTO users(id, email, nickname, provider) VALUES (?,?,?,?)`,[profile.id,profile._json.kakao_account.email, profile.displayName, profile.provider],(err,res)=>{
            console.log('Hello New Kakao Member!')
          })
        }
        else{
          console.log('Kakao success')
        }
      });
      done(null, profile);
    }
  ));

  app.get('/login/kakao',
  passport.authenticate('kakao', {
      scope: ['profile_nickname', 'account_email']
  }));

  app.get('/login/kakao/callback',
  passport.authenticate('kakao', {
      failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/')
  });

  app.get('/logout', (req,res)=>{
    req.session.destroy(function(err){
        if(err) throw err;
        res.redirect('/');
    })
})
  return passport;
}