let fs = require('fs');
let template = require('./lib/template')
let path = require('path');
// npm install sanitize-html -S
let sanitizeHtml = require('sanitize-html');
let qs = require('querystring');

const express = require('express');
const app = express()
// 정적인 파일 서비스하기 위한 미들웨어
// public파일 안에서 정적 파일을 찾겠다
app.use(express.static('public'))
// npm install body-parser -S
let bodyParser = require('body-parser');

// bodyParser.urlencoded({extended:false}): 사용자가 요청할 때마다 실행되는 미들웨어
// 시용자가 전송한 post데이터를 내부적으로 분석해서 모든 데이터를 가져온 다음에 callback을 호출하도록 약속되어있음
// 호출하면서 request에 body라는 property를 붙여줌
app.use(bodyParser.urlencoded({extended:false}));

// npm install compression -S
let compression = require('compression');
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

// app.get(path, callback[, ...])
// route, routing
app.get('/', (req, res) => {
    let title = 'Welcome';
    let description = 'Hello, Node.js';
    let list = template.list(req.list);
    let html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <img src="/imgs/hello.jpg" style="width:300px; display:block; margin-top:10px;">`,
      `<a href="/create">create</a>`
    );
  res.send(html)
});

app.get('/page/:pageId',(req,res,next)=>{
  // res.send(req.params)
  fs.readdir('./data', (error, filelist)=>{
    let filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      if (err){
        next(err);
      } else{
        let title = req.params.pageId;
        let sanitizedTitle = sanitizeHtml(title);
        let sanitizedDescription = sanitizeHtml(description, {
          allowedTags:['h1']
          });
        let list = template.list(filelist);
        let html = template.HTML(sanitizedTitle, list,
          `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
          ` <a href="/create">create</a>
            <a href="/update/${sanitizedTitle}">update</a>
            <form action="/delete" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>`
          );
        res.send(html);
      };
    });
  });
});

app.get('/create',(req,res)=>{
  let title = 'WEB - create';
  let list = template.list(req.list);
  let html = template.HTML(title, list, `
    <form action="/create" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, '');
  res.send(html);
});

app.post('/create', (req,res)=>{
  /*
  let body = '';
  req.on('data', (data)=>{
      body = body + data;
  });
  req.on('end', ()=>{
    let post = qs.parse(body);
    let title = post.title;
    let description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', (err)=>{
      res.writeHead(302, {Location: `/?id=${title}`});
      res.end();
    });
  });
  */
    let post = req.body;
    let title = post.title;
    let description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', (err)=>{
      res.writeHead(302, {Location: encodeURI(`/?id=${title}`)});
      res.end();
  });
});

app.get('/update/:pageId',(req,res)=>{
  let filteredId = path.parse(req.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', (err, description)=>{
    let title = req.params.pageId;
    let list = template.list(req.list);
    let html = template.HTML(title, list,
      `
      <form action="/update" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `,
      `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
    );
    res.send(html);
  });
});

app.post('/update', (req,res)=>{
  // let body = '';
  // req.on('data', (data)=>{
  //     body += data;
  // });
  // req.on('end', ()=>{
  let post = req.body;
  let id = post.id;
  let title = post.title;
  let description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, (error)=>{
    fs.writeFile(`data/${title}`, description, 'utf8', (err)=>{
      res.writeHead(302, {Location: encodeURI(`/?id=${title}`)});
      res.end();
    });
  });
});


app.post('/delete',(req,res)=>{
  // let body = '';
  // req.on('data', (data)=>{
  //     body += data;
  // });
  // req.on('end', ()=>{
  let post = req.body;
  let id = post.id;
  let filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, (error)=>{
    res.redirect('/');
  });
});

app.use((req,res,next)=>{
  res.status(404).send('Sorry');
});
// 500error: 서버에서 문제가 발생했으나 구체적인 내용을 표시할 수 없음
app.use((err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('Somethong Broke!')
});

app.listen(3001)