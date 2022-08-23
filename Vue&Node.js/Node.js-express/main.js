let fs = require('fs');
let template = require('./lib/template')
let path = require('path');
// npm install sanitize-html -S
let sanitizeHtml = require('sanitize-html');
let qs = require('querystring');
// npm install body-parser -S
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

const express = require('express');
const app = express()
// app.get(path, callback[, ...])
// route, routing
app.get('/', (req, res) => {
    fs.readdir('./data', (error, filelist)=>{
      let title = 'Welcome';
      let description = 'Hello, Node.js';
      let list = template.list(filelist);
      let html = template.HTML(title, list,
        `<h2>${title}</h2>${description}`,
        `<a href="/create">create</a>`
      );
    res.send(html)
  });
});

app.get('/page/:pageId',(req,res)=>{
  // res.send(req.params)
  fs.readdir('./data', (error, filelist)=>{
    let filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
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
    });
  });
});

app.get('/create',(req,res)=>{
  fs.readdir('./data', (error, filelist)=>{
    let title = 'WEB - create';
    let list = template.list(filelist);
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
});

app.post('/create', (req,res)=>{
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
});

app.get('/update/:pageId',(req,res)=>{
  fs.readdir('./data', (error, filelist)=>{
    let filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', (err, description)=>{
      let title = req.params.pageId;
      let list = template.list(filelist);
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
});

app.post('/update', (req,res)=>{
  let body = '';
  req.on('data', (data)=>{
      body += data;
  });
  req.on('end', ()=>{
    let post = qs.parse(body);
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
});

app.post('/delete',(req,res)=>{
  let body = '';
  req.on('data', (data)=>{
      body += data;
  });
  req.on('end', ()=>{
    let post = qs.parse(body);
    let id = post.id;
    let filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, (error)=>{
      res.redirect('/');
    });
  });
});

app.listen(3001)