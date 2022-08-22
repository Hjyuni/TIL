let http = require('http');
let fs = require('fs');
let url = require('url');
let qs = require('querystring');
let template = require('./lib/template.js');
let path = require('path');
let sanitizeHtml = require('sanitize-html');
// mysql connection
let mysql = require('mysql');
let db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'Gjwjddbs1234',
  database:'opentutorials'
});
db.connect();

let app = http.createServer(function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;
    // 최상위 경로
    if(pathname === '/'){
      if(queryData.id === undefined){
        // db.query(query,응답결과에 대한 callback)
        db.query(`SELECT * FROM topic`, (err,topics)=>{
          let title = 'welcome';
          let description = 'Hello, Node.js'
          let list = template.list(topics);
          let html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`);
          response.writeHead(200);
          response.end(html);
        });
      } else {
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
              `<h2>${title}</h2>${description}
              <p>by ${topic[0].name}</p>`,
              `<a href="/create">create</a>
              <a href="/update?id=${queryData.id}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${queryData.id}">
                <input type="submit" value="delete">
              </form>`);
            response.writeHead(200);
            response.end(html);
          });
        });
      };
    } else if(pathname === '/create'){
      db.query(`SELECT * FROM topic`, (err,topics)=>{
        db.query(`SELECT * FROM author`, (err2,authors)=>{
          console.log(authors);
          let title = 'CREATE';
          let list = template.list(topics);
          let html = template.HTML(title, list,
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
          response.writeHead(200);
          response.end(html);
        });
      });

    } else if(pathname === '/create_process'){
      let body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          let post = qs.parse(body);
          db.query(`INSERT INTO topic (title, description, created, author_id) VALUES(?,?, NOW(), ?);`,
          [post.title, post.description, post.author],
          (err, res) => {
            if (err){
              throw err
            }
            response.writeHead(302, {Location: `/?id=${res.insertId}`});
            response.end();
          })
      });
    } else if(pathname === '/update'){
        db.query(`SELECT * FROM topic`,(err,topics)=>{
          if (err) throw err;
          db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id],(err2,topic)=>{
            if (err2){
              throw err2
            };
            db.query('SELECT * FROM author', function(error2, authors){
              var list = template.list(topics);
              var html = template.HTML(topic[0].title, list,
                `
                <form action="/update_process" method="post">
                  <input type="hidden" name="id" value="${topic[0].id}">
                  <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                  <p>
                    <textarea name="description" placeholder="description">${topic[0].description}</textarea>
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
              response.writeHead(200);
              response.end(html);
            });
          });
        });
    } else if(pathname === '/update_process'){
      let body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          let post = qs.parse(body);

          db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,[post.title, post.description, post.author, post.id],(err,res)=>{
            if(err) throw err;
            response.writeHead(302, {Location: `/?id=${post.id}`});
            response.end();
          })
      });
    } else if(pathname === '/delete_process'){
      let body = '';
      request.on('data', (data)=>{
          body = body + data;
      });
      request.on('end', ()=>{
          let post = qs.parse(body);
          let id = post.id;
          let filteredId = path.parse(id).base;
          db.query(`DELETE FROM topic WHERE id=?`,[post.id],(err,res)=>{
            if (err) throw err;
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(5000);
