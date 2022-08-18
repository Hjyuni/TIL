let http = require('http');
let fs = require('fs');
// let url = require('url');

let app = http.createServer(function(request,response){
    let _url = request.url;
    // let queryData = url.parse(_url, true).query;
    console.log(queryData);
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
      // return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname + _url)
    console.log(_url)
    // readFileSync: 사용자가 요청할 때마다 경로에 대한 파일을 읽어들여서 그 값을 가져옴
    // 'readFile' VS 'readFileSync': https://balmostory.tistory.com/33
    response.end(fs.readFileSync(__dirname + _url));
 
});
// 기본값 80:webserver
app.listen(3000);