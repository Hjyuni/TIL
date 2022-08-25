let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
let sanitizeHtml = require('sanitize-html');
let template = require('../lib/template.js');

module.exports = function(passport){
    router.get('/login',(req,res)=>{
      let fmsg = req.flash();
      let feedback = '';
      if(fmsg.error){
        feedback = fmsg.error[0];
      }
      let title = 'WEB - login';
      let list = template.list(req.list);
      let html = template.HTML(title, list, `
        <div style="color:red;">${feedback}</div>
        <form action="/auth/login_process" method="post">
          <p><input type="text" name="email" placeholder="email"></p>
          <p><input type="password" name="pwd" placeholder="pwd"></p>
          <p>
            <input type="submit" value="login">
          </p>
        </form>
      `, '');
      res.send(html);
    });

    router.post('/login_process',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true,
      successFlash: true
    }));

    router.get('/logout',(req,res)=>{
      req.logout((err)=>{
        if(err) {return nextTick(err);}
      });
      // session delete
      //req.session.destroy((err)=>{
      req.session.save(()=>{  
      res.redirect('/')
      });
    });
  return router;
};