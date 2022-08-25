const express = require('express');
const app = express()
let fs = require('fs');
// npm install sanitize-html -S
// let sanitizeHtml = require('sanitize-html');
// npm install body-parser -S
let bodyParser = require('body-parser');
// npm install compression -S
let compression = require('compression');
// npm install helmet -S
let helmet = require('helmet')
let session = require('express-session')
let FileStore = require('session-file-store')(session)
// npm install -S connect-flash
let flash = require('connect-flash');

let authData = {
  email:'1@gmail.com',
  password:'1111',
  nickname:'haha'
}

app.use(helmet());

// bodyParser.urlencoded({extended:false}): 사용자가 요청할 때마다 실행되는 미들웨어
// 시용자가 전송한 post데이터를 내부적으로 분석해서 모든 데이터를 가져온 다음에 callback을 호출하도록 약속되어있음
// 호출하면서 request에 body라는 property를 붙여줌
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
  // secret: 실제론 비워놔야함
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // store: new FileStore()
}));
app.use(flash());
// npm install -S passport
// npm install -S passport-local
// passport는 session을 바탕으로 하기 때문에 session밑에다가 넣어줘야함
let passport = require('./lib/passport')(app);

let indexRouter = require('./routes/index');
let topicRouter = require('./routes/topic');
let authRouter = require('./routes/auth')(passport);


// 정적인 파일 서비스하기 위한 미들웨어
// public파일 안에서 정적 파일을 찾겠다
app.use(express.static('public'));

// 사용자가 많은 내용의 글을 작성하여 요청했을 때 압축해주는 미들웨어
app.use(compression());

// middleware 만들기
// get방식으로 들어오는 요청에 대해서만 파일 목록만 가져오는 미들웨어
app.get('*',(req,res,next)=>{
  fs.readdir('./data',(err,filelist)=>{
    req.list = filelist;
    next();
  });
});

app.use('/',indexRouter);
app.use('/topic',topicRouter);
app.use('/auth',authRouter);


app.use((req,res,next)=>{
  res.status(404).send('Sorry');
});
// 500error: 서버에서 문제가 발생했으나 구체적인 내용을 표시할 수 없음
app.use((err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('Somethong Broke!')
});

app.listen(3001)