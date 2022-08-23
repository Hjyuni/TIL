let db = require('./db')
let template = require('./template.js');
let qs = require('querystring');
let url = require('url');
let sanitizeHtml = require('sanitize-html');

exports.home = (req,res)=>{
  // db.query(query,응답결과에 대한 callback)
  db.query(`SELECT * FROM topic`, (err,topics)=>{
    let title = 'welcome';
    let description = 'Hello, Node.js'
    let list = template.list(topics);
    let html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`);
    res.writeHead(200);
    res.end(html)
  });
}

exports.page = (req,res)=>{
  let _url = req.url;
  let queryData = url.parse(_url,true).query
  db.query(`SELECT * FROM topic`, (err,topics)=>{
    if (err){
      throw err
    };
    // 공격에 의도가 있는 코드는 세탁해주는 처리
    db.query(`SELECT * FROM topic t LEFT JOIN author a ON t.author_id = a.id WHERE t.id=?`,[queryData.id],(err2,topic)=>{
      if (err2){
        throw err2
      };
      let title = topic[0].title;
      let description = topic[0].description;
      let list = template.list(topics);
      let html = template.HTML(title, list,
        `<h2>${sanitizeHtml(title)}</h2>${sanitizeHtml(description)}
        <p>by ${sanitizeHtml(topic[0].name)}</p>`,
        `<a href="/create">create</a>
        <a href="/update?id=${queryData.id}">update</a>
        <form action="delete_process" method="post">
          <input type="hidden" name="id" value="${queryData.id}">
          <input type="submit" value="delete">
        </form>`);
      res.writeHead(200);
      res.end(html);
    });
  });
};

exports.create = (req,res) => {
  db.query(`SELECT * FROM topic`, (err,topics)=>{
    db.query(`SELECT * FROM author`, (err2,authors)=>{
      let title = 'CREATE';
      let list = template.list(topics);
      let html = template.HTML(sanitizeHtml(title), list,
        `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            ${template.authorSelect(authors)}
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">create</a>`);
      res.writeHead(200);
      res.end(html);
    });
  });
}

exports.create_process = (req,res) => {
  let body = '';
  req.on('data', function(data){
      body = body + data;
  });
  req.on('end', function(){
    let post = qs.parse(body);
    db.query(`INSERT INTO topic (title, description, created, author_id) VALUES(?,?, NOW(), ?);`,
    [post.title, post.description, post.author],
    (err, result) => {
      if (err){
        throw err
      }
      res.writeHead(302, {Location: `/?id=${result.insertId}`});
      res.end();
    })
  });
}

exports.update = (req,res)=>{
  let _url = req.url;
  let queryData = url.parse(_url,true).query
  db.query(`SELECT * FROM topic`,(err,topics)=>{
    if (err) throw err;
    db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id],(err2,topic)=>{
      if (err2){
        throw err2
      };
      db.query('SELECT * FROM author', function(error2, authors){
        let list = template.list(topics);
        let html = template.HTML(sanitizeHtml(topic[0].title), list,
          `
          <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${topic[0].id}">
            <p><input type="text" name="title" placeholder="title" value="${sanitizeHtml(topic[0].title)}"></p>
            <p>
              <textarea name="description" placeholder="description">${sanitizeHtml(topic[0].description)}</textarea>
            </p>
            <p>
              ${template.authorSelect(authors, topic[0].author_id)}
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
        );
        res.writeHead(200);
        res.end(html);
      });
    });
  });
}

exports.update_process = (req,res) => {
  let body = '';
  req.on('data', function(data){
      body = body + data;
  });
  req.on('end', function(){
    let post = qs.parse(body);

    db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,[post.title, post.description, post.author, post.id],(err,result)=>{
      if(err) throw err;
      res.writeHead(302, {Location: `/?id=${post.id}`});
      res.end();
    });
  });
}

exports.delete = (req,res) => {
  let body = '';
  req.on('data', (data)=>{
      body = body + data;
  });
  req.on('end', ()=>{
    let post = qs.parse(body);
    let id = post.id;
    db.query(`DELETE FROM topic WHERE id=?`,[post.id],(err,result)=>{
      if (err) throw err;
      res.writeHead(302, {Location: `/`});
      res.end();
    });
  });
}