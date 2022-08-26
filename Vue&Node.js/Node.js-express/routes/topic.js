let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
let sanitizeHtml = require('sanitize-html');
let template = require('../lib/template.js');
let auth = require('../lib/auth.js')
let db = require('../lib/db');
let shortid = require('shortid');

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
  let id = shortid.generate();
  db.get('topics').push({
    id: id,
    title: title,
    description: description,
    user_id: req.user.id
  }).write();
  res.redirect(`/topic/${id}`);
});

router.get('/update/:pageId',(req,res)=>{
  if (!auth.isOwner(req, res)) {
    res.redirect('/');
    return false;
  }
  let topic = db.get('topics').find({id:req.params.pageId}).value();
  req.flash('error', 'Not yours!');
  if(topic.user_id !== req.user.id){
    req.flash('error', 'Not yours!');
    return res.redirect('/');
  } 
  let title = topic.title;
  let description = topic.description;
  let list = template.list(req.list);
  let html = template.HTML(title, list,
    `
    <form action="/topic/update" method="post">
      <input type="hidden" name="id" value="${topic.id}">
      <p><input type="text" name="title" placeholder="title" value="${title}"></p>
      <p>
        <textarea name="description" placeholder="description">${description}</textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
    `,
    `<a href="/topic/create">create</a> <a href="/topic/update/${topic.id}">update</a>`,
    auth.statusUI(req,res)
  );
  res.send(html);
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
  let topic = db.get('topics').find({id:id}).value();
  if(topic.user_id !== req.user.id){
    req.flash('error', 'Not yours!');
    return res.redirect('/');
  } 
  db.get('topics').find({id:id}).assign({
    title:title, description:description
  }).write();
  res.redirect(`/topic/${topic.id}`);
});

router.post('/delete',(req,res)=>{
  if (!auth.isOwner(req, res)) {
    res.redirect('/');
    return false;
  }
  let post = req.body;
  let id = post.id;
  let topic = db.get('topics').find({id:id}).value();
  if(topic.user_id !== req.user.id){
    req.flash('error', 'Not yours!');
    return res.redirect('/');
  }
  db.get('topics').remove({id:id}).write();
  res.redirect('/');
});

router.get('/:pageId',(req,res,next)=>{
  // res.send(req.params)
  let topic = db.get('topics').find({
    id: req.params.pageId
  }).value();
  let user = db.get('users').find({
    id:topic.user_id
  }).value();
  let sanitizedTitle = sanitizeHtml(topic.title);
  let sanitizedDescription = sanitizeHtml(topic.description, {
    allowedTags: ['h1']
  });
  let list = template.list(req.list);
  let html = template.HTML(sanitizedTitle, list,
    `
    <h2>${sanitizedTitle}</h2>
    ${sanitizedDescription}
    <p>by ${user.displayName}</p>
    `,
    ` <a href="/topic/create">create</a>
      <a href="/topic/update/${topic.id}">update</a>
      <form action="/topic/delete" method="post">
        <input type="hidden" name="id" value="${sanitizedTitle}">
        <input type="submit" value="delete">
      </form>`,
      auth.statusUI(req,res)
    );
  res.send(html);
});
module.exports = router;