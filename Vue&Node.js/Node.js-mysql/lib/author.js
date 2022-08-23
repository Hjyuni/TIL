let db = require('./db')
let template = require('./template.js');
let qs = require('querystring');
let url = require('url');
let sanitizeHtml = require('sanitize-html');

exports.home = (req,res)=>{
  // db.query(query,응답결과에 대한 callback)
  db.query(`SELECT * FROM topic`, (err,topics)=>{
    db.query(`SELECT * FROM author`, (err2, authors)=>{
      let title = 'author';

      let list = template.list(topics);
      let html = template.HTML(title, list,
        `
        ${template.authorTable(authors)}
        <style>
          table{
            border-collapse: collapse;
          }
          td{
            border: 1px solid black;
          }
        </style>
        <form action="/author/create_process" method="post">
          <p>
            <input type="text" name="name" placeholder="name">
          </p>
          <p>
            <textarea name="profile"></textarea>
          </p>
          <p>
            <input type="submit" value="create">
          </p>
        </form>
        `,
        ``);
      res.writeHead(200);
      res.end(html)
    });
  });
}

exports.create_process = (req,res) => {
  let body = '';
  req.on('data', (data)=>{
      body = body + data;
  });
  req.on('end', ()=>{
    let post = qs.parse(body);
    db.query(`INSERT INTO author (name, profile) VALUES(?,?);`,
    [post.name, post.profile],
    (err, result) => {
      if (err){
        throw err
      }
      res.writeHead(302, {Location: `/author`});
      res.end();
    })
  });
}

exports.update = (req, res)=>{
  db.query(`SELECT * FROM topic`, (error,topics)=>{
    db.query(`SELECT * FROM author`, (error2,authors)=>{
      let _url = req.url;
      let queryData = url.parse(_url, true).query;
      db.query(`SELECT * FROM author WHERE id=?`,[queryData.id], (error3,author)=>{
          let title = 'author';
          let list = template.list(topics);
          let html = template.HTML(title, list,
          `
          ${template.authorTable(authors)}
          <style>
              table{
                  border-collapse: collapse;
              }
              td{
                  border:1px solid black;
              }
          </style>
          <form action="/author/update_process" method="post">
              <p>
                  <input type="hidden" name="id" value="${queryData.id}">
              </p>
              <p>
                  <input type="text" name="name" value="${sanitizeHtml(author[0].name)}" placeholder="name">
              </p>
              <p>
                  <textarea name="profile" placeholder="description">${sanitizeHtml(author[0].profile)}</textarea>
              </p>
              <p>
                  <input type="submit" value="update">
              </p>
          </form>
          `,
          ``
          );
          res.writeHead(200);
          res.end(html);
      });
    });
  });
} 

exports.update_process = (req,res) => {
  let body = '';
  req.on('data', (data)=>{
      body = body + data;
  });
  req.on('end', ()=>{
    let post = qs.parse(body);
    db.query(`UPDATE author SET name=?, profile=? WHERE id=?;`,
    [post.name, post.profile, post.id],
    (err, result) => {
      if (err){
        throw err
      }
      res.writeHead(302, {Location: `/author`});
      res.end();
    })
  });
}

exports.delete_process = (req,res) => {
  let body = '';
  req.on('data', (data)=>{
      body = body + data;
  });
  req.on('end', ()=>{
    let post = qs.parse(body);
    db.query(`DELETE FROM topic WHERE author_id=?`,
    [post.id],(err1,result1)=>{
      if (err1) throw err1;
    });
    db.query(`DELETE FROM author WHERE id=?;`,
    [post.id],
    (err2, result) => {
      if (err2){
        throw err2
      }
      res.writeHead(302, {Location: `/author`});
      res.end();
    })
  });
}