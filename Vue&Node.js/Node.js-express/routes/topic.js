let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
let sanitizeHtml = require('sanitize-html');
let template = require('../lib/template.js');
let auth = require('../lib/auth.js')

router.get('/create',(req,res)=>{
  if (!auth.isOwner(req, res)) {
    res.redirect('/');
    return false;
  }
  let title = 'WEB - create';
  let list = template.list(req.list);
  let html = template.HTML(title, list, `
    <form action="/topic/create" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, '',auth.statusUI(req,res));
  res.send(html);
});

router.post('/create', (req,res)=>{
  if (!auth.isOwner(req, res)) {
    res.redirect('/');
    return false;
  }
  let post = req.body;
  let title = post.title;
  let description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', (err)=>{
    res.redirect(`/topic/${title}`);
  });
});

router.get('/update/:pageId',(req,res)=>{
  if (!auth.isOwner(req, res)) {
    res.redirect('/');
    return false;
  }
  let filteredId = path.parse(req.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', (err, description)=>{
    let title = req.params.pageId;
    let list = template.list(req.list);
    let html = template.HTML(title, list,
      `
      <form action="/topic/update" method="post">
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
      `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`,
      auth.statusUI(req,res)
    );
    res.send(html);
  });
});

router.post('/update', (req,res)=>{
  if (!auth.isOwner(req, res)) {
    res.redirect('/');
    return false;
  }
  let post = req.body;
  let id = post.id;
  let title = post.title;
  let description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, (error)=>{
    fs.writeFile(`data/${title}`, description, 'utf8', (err)=>{
      res.redirect(`/topic/${title}`);
    });
  });
});

router.post('/delete',(req,res)=>{
  if (!auth.isOwner(req, res)) {
    res.redirect('/');
    return false;
  }
  let post = req.body;
  let id = post.id;
  let filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, (error)=>{
    res.redirect('/');
  });
});

router.get('/:pageId',(req,res,next)=>{
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
          ` <a href="/topic/create">create</a>
            <a href="/topic/update/${sanitizedTitle}">update</a>
            <form action="/topic/delete" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>`,
            auth.statusUI(req,res)
          );
        res.send(html);
      };
    });
  });
});
module.exports = router;