let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
let sanitizeHtml = require('sanitize-html');
let template = require('../lib/template.js');

let authData = {
  email:'1@gmail.com',
  password:'1111',
  nickname:'haha'
}

router.get('/login',(req,res)=>{
  let title = 'WEB - login';
  let list = template.list(req.list);
  let html = template.HTML(title, list, `
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

router.post('/login_process', (req,res)=>{
  let post = req.body;
  let email = post.email;
  let pwd = post.pwd;
  if (email === authData.email && pwd === authData.password){
    //success
    //session 객체 구성
    req.session.is_logined = true;
    req.session.nickname = authData.nickname;
    // session save가 되고 redirect해라
    req.session.save(()=>{
      res.redirect(`/`);
    })

  } else {
    res.send('who?')
  }
});

router.get('/logout',(req,res)=>{
  // session delete
  req.session.destroy((err)=>{
    res.redirect('/')
  });
});
module.exports = router;