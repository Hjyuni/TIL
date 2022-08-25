let http = require('http');
let fs = require('fs');
let url = require('url');
let qs = require('querystring');
// security
let path = require('path');
// 태그 삭제해버리는 모듈
let sanitizeHtml = require('sanitize-html');
let cookie = require('cookie')

// template object
let template = require('./module/template.js');

function authIsOwner(req,res){
  let isOwner = false;
  let cookies = {}
  if (req.headers.cookie) {
  cookies = cookie.parse(req.headers.cookie)
  }
  if (cookies.email === '1@gmail.com' && cookies.password === '111111'){
    isOwner = true;
  }
  return isOwner;
}

function authStatusUI(req,res) {
  let authStatusUI = `<a href="/login">login</a>`
  if (authIsOwner(req,res)){
    authStatusUI = `<a href="/logout_process">logout</a>`
  }
  return authStatusUI
}

let app = http.createServer((request,response)=>{
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathName = url.parse(_url, true).pathname;
    let title = queryData.id;

    if(pathName === '/'){
      if (queryData.id === undefined){
        fs.readdir('./data/',(err,filelist)=>{
          title = "hello"
          description = "node.js"
          let list = template.list(filelist);
          let html = template.html(title, list, `<h2>${title}</h2>${description}`,`<a href="/create">CREATE</a>`,authStatusUI(request,response));
          response.writeHead(200);
          response.end(html);
        });
      } else{
          fs.readdir('./data/',(err,filelist)=>{
            // 외부에서 들어오고 나오는 정보를 보호
            let filter = path.parse(queryData.id).base;
            fs.readFile(`data/${filter}`, 'utf8', (err, description)=>{
              let title = queryData.id;
              let list = template.list(filelist);
              let sanitizeTitle = sanitizeHtml(title);
              let sanitizeDes = sanitizeHtml(description, {allowedTags:['h1']});
              // delete는 링크로 만들면 그 링크를 다른사람에게 보낼 수 있으므로 링크형식으로 구현하면 안되고 form으로 해야함
              let html = template.html(sanitizeTitle, list, `<h2>${sanitizeTitle}</h2>${sanitizeDes}`,`<a href="/create">CREATE</a> 
                                                                                            <a href="/update?id=${sanitizeTitle}">UPDATE</a>
                                                                                            <form action="/delete_process" method="post">
                                                                                              <input type="hidden" name="id" value="${sanitizeTitle}">
                                                                                              <input type="submit" value="delete">
                                                                                            </form>
                                                                                            `,authStatusUI(request,response));
              response.writeHead(200);
              response.end(html);
              });
            });
          }
    } else if(pathName === '/create'){
        if(authIsOwner(request, response) === false){
          response.end('Login required!!');
          return false;
        }
        fs.readdir('./data/',(err,filelist)=>{
          title = "create"
          description = "node.js"
          let list = template.list(filelist);
          let html = template.html(title, list, `<form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="제목"></p>
          <p>
            <textarea name="description" placeholder="내용"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`,'',authStatusUI(request,response));
          response.writeHead(200);
          response.end(html);
        });
    } else if(pathName === '/create_process'){
        if(authIsOwner(request, response) === false){
          response.end('Login required!!');
          return false;
        }
        let body = '';
        // post로 전송한 데이터가 많은 경우 특정한 양만 데이터를 수신할 때 사용
        request.on('data', (data)=>{
          body += data;
        });
        // 데이터 수신이 끝났을 때 callback함수 호출 = 정보 수신이 끝남)
        request.on('end', (end)=>{
          let post = qs.parse(body);
          let title = post.title;
          let description = post.description;
          fs.writeFile(`./data/${title}`, description, 'utf8', (err)=>{
            // err일 때를 제외하고
            if (err) throw err;
            // 302:redirection = 사용자가 어떤 페이지로 왔을 떄, 다시 사용자를 다른 페이지로 튕겨버리는 것
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end('success');              
          })
        });
    } else if(pathName==='/update') {
        if(authIsOwner(request, response) === false){
          response.end('Login required!!');
          return false;
        } 
        fs.readdir('./data/',(err,filelist)=>{
          // 외부에서 들어오고 나오는 정보를 보호
          let filter = path.parse(queryData.id).base;
          fs.readFile(`data/${filter}`, 'utf8', (err, description)=>{
            let title = queryData.id;
            let list = template.list(filelist);
            let html = template.html(title, list, 
          `<form action="/update_process" method="post">
            // 수정하기 전 파일의 이름을 받을 수 있음
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="제목" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="내용">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>`,
          `<a href="/create">CREATE</a> <a href="/update?id=${title}">UPDATE</a>`,authStatusUI(request,response));
            response.writeHead(200);
            response.end(html);
          });
        });
    } else if(pathName === "/update_process"){
        if(authIsOwner(request, response) === false){
          response.end('Login required!!');
          return false;
        }
        let body = '';
        // post로 전송한 데이터가 많은 경우 특정한 양만 데이터를 수신할 때 사용
        request.on('data', (data)=>{
          body += data;
        });
        // 데이터 수신이 끝났을 때 callback함수 호출 = 정보 수신이 끝남)
        request.on('end', (end)=>{
          let post = qs.parse(body);
          let id = post.id;
          let title = post.title;
          let description = post.description;
          // 글 제목 바꾸기
          // fs.rename([old_path],[new_path],callback)
          // 외부에서 들어오고 나오는 정보를 보호
          let filter = path.parse(id).base;
          fs.rename(`./data/${filter}`, `./data/${title}`, (err)=>{
            fs.writeFile(`./data/${title}`, description, 'utf8', (err)=>{
              // err일 때를 제외하고
              if (err) throw err;
              // 302:redirection = 사용자가 어떤 페이지로 왔을 떄, 다시 사용자를 다른 페이지로 튕겨버리는 것
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end('success');              
            });
          });
        });
    } else if(pathName === "/delete_process"){
        if(authIsOwner(request, response) === false){
          response.end('Login required!!');
          return false;
        }
        let body = '';
        // post로 전송한 데이터가 많은 경우 특정한 양만 데이터를 수신할 때 사용
        request.on('data', (data)=>{
          body += data;
        });
        // 데이터 수신이 끝났을 때 callback함수 호출 = 정보 수신이 끝남)
        request.on('end', (end)=>{
          let post = qs.parse(body);
          let id = post.id;

          // 글 삭제하기
          // fs.unlink([path],callback)
          fs.unlink(`./data/${id}`, (err)=>{
              // err일 때를 제외하고
            if (err) throw err;
            // 302:redirection = 사용자가 어떤 페이지로 왔을 때, 다시 사용자를 다른 페이지로 튕겨버리는 것
            // HOME으로,,
            response.writeHead(302, {Location: `/`});
            response.end('success');              
          });
        });
      } else if (pathName === '/login') {
          fs.readdir('./data/',(err,filelist)=>{
            title = "login"
            description = "node.js"
            let list = template.list(filelist);
            let html = template.html(title, list, `<form action="/login_process" method="post">
                <p><input type="text" name="email" placeholder="email"></p>
                <p><input type="password" name="password" placeholder="password"></p>
                <p>
                  <input type="submit">
                </p>
            </form>`,`<a href="/create">create</a>`);
          response.writeHead(200);
          response.end(html);
        });
      } else if(pathName==='/login_process'){
        let body = '';
        request.on('data', (data)=>{
          body += data;
        });

        request.on('end', (end)=>{
          let post = qs.parse(body);
          if(post.email==='1@gmail.com' && post.password === '111111'){
            response.writeHead(302, {
              'Set-Cookie':[
                `email=${post.email}`,
                `password=${post.password}`,
                `nickname=egoing`
              ],
              Location: `/`});
          } else {
            response.end('Who?')
          }
            response.end('success');              
          });
      } else if (pathName === '/logout_process') {
        if(authIsOwner(request, response) === false){
          response.end('Login required!!');
          return false;
        }
        let body = '';
        request.on('data', (data) => {
          body = body + data;
        });
        request.on('end', () => {
          var post = qs.parse(body);
          response.writeHead(302, {
            'Set-Cookie': [
              `email=; Max-Age=0`,
              `password=; Max-Age=0`,
              `nickname=; Max-Age=0`
            ],
            Location: `/`
          });
          response.end();
        });
      }else {
          // 404 에러 났을 때 처리하는 법
          response.writeHead(404);
          response.end('Not Found');
        }
  });
// 기본값 80:webserver
app.listen(3000);