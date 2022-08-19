// require: 외부의 기능을 사용하기 위해서 모듈을 가져옴
// fs(FileSystem): 파일 처리와 관련된 모듈
// let args = process.argv;console.log(args); : 시작시 실행 인자 받기
let http = require('http');
let fs = require('fs');
let url = require('url');

// template: 재사용 할 수 있게 만드는 껍데기
function templateHTML(title, list, body) {
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
    // console.log(url.parse(_url,true))
    // console.log(queryData.id);
    if(pathName === '/'){
      if (queryData.id === undefined){
        fs.readdir('./data/',(err,filelist)=>{
          title = "hello"
          description = "node.js"
          let list = templateList(filelist);
          // console.log(__dirname + _url)
          // console.log(_url)
          // readFileSync: 사용자가 요청할 때마다 경로에 대한 파일을 읽어들여서 그 값을 가져옴
          // 'readFile' VS 'readFileSync': https://balmostory.tistory.com/33
          // response.end(fs.readFileSync(__dirname + _url));
          const template = templaateHTML(title, list, `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        })
      } else{
        fs.readdir('./data/',(err,filelist)=>{
          title = "hello"
          description = "node.js"
          let list = templateList(filelist);

        fs.readFile(`data/${queryData.id}`, 'utf8', (err, description)=>{
          let title = queryData.id;
          const template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          // console.log(__dirname + _url)
          // console.log(_url)
          // readFileSync: 사용자가 요청할 때마다 경로에 대한 파일을 읽어들여서 그 값을 가져옴
          // 'readFile' VS 'readFileSync': https://balmostory.tistory.com/33
          // response.end(fs.readFileSync(__dirname + _url));
          // status:200(정상 응답)
          response.writeHead(200);
          response.end(template);
          });
        });
      }
    } else {
      // 404 에러 났을 때 처리하는 법
      response.writeHead(404);
      response.end('Not Found');
    }
  });
// 기본값 80:webserver
app.listen(3000);