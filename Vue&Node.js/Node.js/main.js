// require: 외부의 기능을 사용하기 위해서 모듈을 가져옴
// fs(FileSystem): 파일 처리와 관련된 모듈
// let args = process.argv;console.log(args); : 시작시 실행 인자 받기
let http = require('http');
let fs = require('fs');
let url = require('url');

let app = http.createServer(function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let title = queryData.id;
    // console.log(url.parse(_url,true))
    // console.log(queryData.id);
    if(_url == '/'){
      // _url = '/index.html';
      title = 'welcome'
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
      // return response.writeHead(404);
    }
    // status:200(정상 응답)
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
      const template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
`
  // console.log(__dirname + _url)
  // console.log(_url)
  // readFileSync: 사용자가 요청할 때마다 경로에 대한 파일을 읽어들여서 그 값을 가져옴
  // 'readFile' VS 'readFileSync': https://balmostory.tistory.com/33
  // response.end(fs.readFileSync(__dirname + _url));
  response.end(template);
    })
});
// 기본값 80:webserver
app.listen(3000);