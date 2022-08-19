# Node.js

> 생활코딩: https://opentutorials.org/course/3332

## 0. install (nvm으로..)

> nvm으로 node깔기: https://scv-life.tistory.com/191
>
> 참고사이트: https://heynode.com/tutorial/install-nodejs-locally-nvm/

* nvm 깔기(**window ver**)
  * https://github.com/coreybutler/nvm-windows/releases 들어가서 nvm-setup.zip 다운
  * zip파일 안에 exe 실행해서 nvm깔기
* 확인(powershell 관리자권한)

```powershell
# nvm 버전 확인
nvm version
# 최신 버전으로 node 깔기
# nvm은 다양한 노드 버전 깔기 가능(nvm install [version])
nvm install latest
nvm use latest
node --version
# nvm list로 node 버전 뭐가 깔려있나 확인 가능
nvm list
```

---

## 1. module

> exports & require: https://digiconfactory.tistory.com/entry/Nodejs-%EB%AA%A8%EB%93%88%EC%82%AC%EC%9A%A9%EB%B2%95
>
> url모듈 사용하기
>
> * https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=pjok1122&logNo=221522864528
> * https://opentutorials.org/module/938/7369
>
> fs모듈: https://opentutorials.org/module/938/7373

* require: 파이썬의 import와 같음
* `url`: url 정보를 객체로 가져와 분석하거나(parse) utl 객체를 문자열로 바꿔주는(format, resolve)를 수행
  * `url.parse([url var], true)`: query속성을 **객체** 형식으로 가져옴

* `fs (FileSystem)` : 파일 관련 모듈

---

## 2. CRUD

* CREATE: https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback

```js
writeFile('message.txt', data, (err) => {
  // err일 때를 제외하고
  if (err) throw err;
  console.log('The file has been saved!');
});
```



* READ :https://nodejs.dev/en/learn/reading-files-with-nodejs

```js
const fs = require('fs');

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

---

## 3. NPM(Package Manager)

* Node.js에서 가장 많이 쓰는 패키지 매니저

* PM2: 프로그램이 꺼지거나, 수정 후에 다시 시작해야 하는데 이걸 자동으로 시켜주는 패키지

> document: https://pm2.keymetrics.io/docs/usage/quick-start/

```shell
# install
npm install pm2 -g
# start
pm2 start [app.js]
# monitoring
pm2 monit
# list
pm2 list
# stop
# pm2 stop [prcess list name]
pm2 stop main
# watch
# 수정할 때마다 껐다키지 않아도 됨
# pm2 start [app.js] --watch
pm2 start main.js --watch
# check error
pm2 log
```

