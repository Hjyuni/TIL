let express = require('express')
let parseurl = require('parseurl')
// npm install -S express-session
let session = require('express-session')
// npm install -S session-file-store
// 얘를 db로 바꾸면 db를 저장소로 쓸 수 있음
let FileStore = require('session-file-store')(session)
  
let app = express()
  
app.use(session({
  // secret: 실제론 비워놔야함
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));
  
app.get('/', function (req, res, next) {
  // express-session 미들웨어는 req에 session이라는 객체 추가해줌
  console.log(req.session);
  if (req.session.num === undefined){
    req.session.num = 1;
  } else{
    req.session.num += 1
  }
  res.send(`Views: ${req.session.num}`);
})
 
app.listen(3001);