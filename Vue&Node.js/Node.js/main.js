let http = require('http');
let fs = require('fs');
let url = require('url');
let qs = require('querystring');

function templateHTML(title, list, body, control) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
    ${body}
  </body>
  </html>`
};

function templateList(filelist){
  let list = '<ul>';
  let i=0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i += 1;
  }
  list = list + '</ul>'
  return list
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
          let list = templateList(filelist);
          const template = templateHTML(title, list, `<h2>${title}</h2>${description}`,`<a href="/create">CREATE</a>`);
          response.writeHead(200);
          response.end(template);
        });
      } else{
          fs.readdir('./data/',(err,filelist)=>{
            fs.readFile(`data/${queryData.id}`, 'utf8', (err, description)=>{
              let title = queryData.id;
              let list = templateList(filelist);
              // delete는 링크로 만들면 그 링크를 다른사람에게 보낼 수 있으므로 링크형식으로 구현하면 안되고 form으로 해야함
              const template = templateHTML(title, list, `<h2>${title}</h2>${description}`,`<a href="/create">CREATE</a> 
                                                                                            <a href="/update?id=${title}">UPDATE</a>
                                                                                            <form action="/delete_process" method="post">
                                                                                              <input type="hidden" name="id" value="${title}">
                                                                                              <input type="submit" value="delete">
                                                                                            </form>
                                                                                            `);
              response.writeHead(200);
              response.end(template);
              });
            });
          }
    } else if(pathName === '/create'){
        fs.readdir('./data/',(err,filelist)=>{
          title = "create"
          description = "node.js"
          let list = templateList(filelist);
          const template = templateHTML(title, list, `<form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="제목"></p>
          <p>
            <textarea name="description" placeholder="내용"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`,'');
          response.writeHead(200);
          response.end(template);
        });
    } else if(pathName === '/create_process'){
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
        fs.readdir('./data/',(err,filelist)=>{
          fs.readFile(`data/${queryData.id}`, 'utf8', (err, description)=>{
            let title = queryData.id;
            let list = templateList(filelist);
            const template = templateHTML(title, list, 
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
          `<a href="/create">CREATE</a> <a href="/update?id=${title}">UPDATE</a>`);
            response.writeHead(200);
            response.end(template);
          });
        });
    } else if(pathName === "/update_process"){
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
          fs.rename(`./data/${id}`, `./data/${title}`, (err)=>{
            fs.writeFile(`./data/${title}`, description, 'utf8', (err)=>{
              // err일 때를 제외하고
              if (err) throw err;
              // 302:redirection = 사용자가 어떤 페이지로 왔을 떄, 다시 사용자를 다른 페이지로 튕겨버리는 것
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end('success');              
            });
          });
          console.log(post)
        });
    } else if(pathName === "/delete_process"){
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
            // 302:redirection = 사용자가 어떤 페이지로 왔을 떄, 다시 사용자를 다른 페이지로 튕겨버리는 것
            // HOME으로,,
            response.writeHead(302, {Location: `/`});
            response.end('success');              
          });
          console.log(post)
        });
      } else {
          // 404 에러 났을 때 처리하는 법
          response.writeHead(404);
          response.end('Not Found');
        }
  });
// 기본값 80:webserver
app.listen(3000);