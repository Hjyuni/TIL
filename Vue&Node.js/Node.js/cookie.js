// session cookies: 브라우저 껐다 키면 쿠키가 사라짐
// permanent cookies: 브라우저를 껐다 켜도 쿠키 그대로임
let http = require('http');
// npm install -S cookie
// cookie 객체로 가져오기
let cookie = require('cookie');

http.createServer(function(req, res){
  // 쿠키 객체로 읽기
  console.log(req.headers.cookie);
  let cookies = {};
  if(req.headers.cookie !==undefined){
  cookies = cookie.parse(req.headers.cookie)
  }
  // 쿠키 만들기
  res.writeHead(200, {
    'Set-Cookie':
    ['yummy_cookie=choco', 
     'tasty_cookie=strawberry',
     // Max-Age: 현재 기점으로 쿠키가 얼마나 살아있을 거냐
     // expire: 절대적인 기간
     `Permanent=cookies; Max-Age=${60*60*24*30}`,
     // Secure: https를 쓰는 경우에만 쿠키 전송
     'a_cookie=blueberry; Secure',
     // httpOnly: javascript를 통해 접근하지 못하도록
     'b_cookie=milk; HttpOnly',
     // path: 특정 path에서만 쿠키 남도록
     'c_cookie=path; Path=/cookie',
     // domain: 특정 도메인에서만 쓸 수 있는 쿠키
     'Domain=Domain; Domain=o2.org'
    ]
  });

  res.end('Cookie!!');
}).listen(3000);