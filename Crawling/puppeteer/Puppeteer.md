# Puppeteer

> node.js download : https://nodejs.org/ko/download/
>
> puppeteer document : https://pptr.dev/
>
> 환경 : window11

* node.js 다운로드 후 확인

```shell
# node 확인
node -v
# npm 확인
npm -v
```

* cmd 관리자 모드로 실행 후

> yarn이란 : https://pakss328.medium.com/yarn%EC%9D%B4%EB%9E%80-b4e8edf1638b

```shell
> corepack enable
> yarn -v
```

---

* vsc `ctrl+j` 터미널에서

```shell
# 본인 컴퓨터에 맞게 크롤링 할 폴더 경로 들어가서⭐⭐
yarn
yarn init
# 다 엔터 누르기
# 다운로드 시작
# npm&yarn 둘 중 하나만 하면 됨 강사님은 yarn 사용권장
# npm
npm i puppeteer-core
# yarn
yarn add puppeteer-core
```

* package.json에  "type":"module" 추가

```shell
{
  "name": "class",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "type":"module",⭐
  "dependencies": {
    "puppeteer": "^15.4.0"
  }
}
```

⭐(window) powershell(관리자권한으로 실행)

```shell
> Set-ExecutionPolicy Unrestricted
> ExecutionPolicy
```

* vsc `ctrl+j`

```shell
# 각자 환경에 맞는 폴더 에서
# yarn 실행
yarn
```

* index.js파일 만들고 실행해보기

```shell
# vsc powershell
node .\index.js
```

* modules 폴더 만든 후 crawler.js 만들기

```js
import puppeteer from 'puppeteer-core'
import os from 'os'
import fs from 'fs'

const macUrl = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const whidowsUrl = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const currentOs = os.type()
const launchConfig = {
  headless: false,
  defaultViewport: null,
  ignoreDefaultArgs: ['--disable-extensions'],
  args: [ '--no-sandbox', '--disable-setuid-sandbox', '--disable-notifications', '--disable-extensions'],
  executablePath: currentOs == 'Darwin' ? macUrl : whidowsUrl
}

const launch = async function() {
  // 브라우저 띄우기(빈화면 뜸)
  const browser = await puppeteer.launch(launchConfig);
}

export {
  launch
}
```

* index.js

```js
import {launch} from './modules/crawler.js'
```

* crawler.js ⭐체크한 코드 추가 후 실행 (이후로 실행코드 생략)

```js
const launch = async function() {
  // 브라우저 띄우기
  const browser = await puppeteer.launch(launchConfig);
  // 브라우저에 페이지 넣기
  const page = await browser.newPage();⭐
  await page.goto('https://example.com');⭐
}

export {
  launch
}
```

* goto 주소 바꾸고 실행해보기

```js
const launch = async function() {
  // 브라우저 띄우기
  const browser = await puppeteer.launch(launchConfig);
  // 브라우저에 페이지 넣기
  const page = await browser.newPage();
  await page.goto('https://www.pharm114.or.kr/main.asp');⭐
}

export {
  launch
}
```



