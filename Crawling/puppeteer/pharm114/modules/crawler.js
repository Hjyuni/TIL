import puppeteer from 'puppeteer-core'
import os from 'os'
// fs는 js에 있는 파일을 쓰고 읽는 라이브러리
import fs from 'fs'
import { addressParser } from './parser.js'


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

// global
let browser = null
let page = null
let pageLength = 0
let finalData = []

let sido = null
let sigungu = null

const pageSelector = 'body > table:nth-child(2) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > table > tbody >   tr:nth-child(5) > td > table:nth-child(5) > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(3)'

// puppeteer 실행함수, init
const launch = async function(arg1, arg2) {
  sido = arg1
  sigungu = arg2
  // 브라우저 띄우기(빈화면)
  browser = await puppeteer.launch(launchConfig);
  // 브라우저에 페이지 넣기(Example Domain 화면 뜸)
  const pages = await browser.pages(); // 현재 브라우저 페이지들
  // console.log(pages)
  page = pages[0]
}

const goto = async function(url) {
  // console.log(page)
  return await page.goto(url)
}

// 예전 방식 팝업창 닫기
const checkPopup = async function () {
  const pages = await browser.pages();
  // 팝업 체크 후 마지막 페이지를 찾아서 닫아줘
  await pages.at(-1).close();
  // console.log(pages.length);
}

const evalCode = async function() {
  // evaluate : 코드를 해당 브라우저 내에 찍겠다는 의미
	// 백틱 쓰는거 주의
  // console.log(`#continents > li.${name} > a`)
	await page.evaluate(function(sido) {
    document.querySelector(`#continents > li.${sido} > a`).click()
  }, sido)
}

const evalCity = async function() {
  await page.waitForSelector(`#continents > li.${sigungu} > a`)
	await page.evaluate(function (sigungu) {
		document.querySelector(`#continents > li.${sigungu} > a`).click()
	},sigungu)
}

// 요즘 팝업창 닫기
const alertClose = async function() {
  // 페이지에 dialog라는 것이 뜨면 뒤에 함수를 실행하게 하겠다
  // .on => 이벤트가 발생 하면
  await page.on('dialog', async function(dialog){
  await dialog.accept()
  })
}

const getPageLength = async function() {
  await page.waitForSelector(pageSelector)

  pageLength = await page.evaluate(function (pageSelector){
    const result = document.querySelector(pageSelector).children.length
    return result
  },pageSelector)
  // 페이지 수 
  // console.log(pageLength)
}
// function evaluate(callback function, arg1, arg2, arg3,,,)
// evaluate는 콘솔에 들어가는 코드가 들어간다고 보면 됨

const getData = async function() {
  // 내가 가야할 페이지 수 만큼 반복
  // 들어가면 이미 페이지 1이어서 페이지-만큼만 선택해주면 되기 때문에 i=1부터
  for (let i=1; i <= pageLength; i++) {
    // // console.log(i)
  
    // await page.waitForSelector(pageSelector)
    
    // // 페이지 클릭하기
    // await page.evaluate(function(i, pageSelector) {

    //   document.querySelector("#printZone > table:nth-child(2) > tbody tr")

    //   document.querySelector(pageSelector).children[i].click()
    // },i ,pageSelector)
    await page.waitForSelector(pageSelector)
    // 병원 데이터 갖고오기
    const infoArr = await page.evaluate(function(i,sido,sigungu) {
      var trArr = document.querySelectorAll("#printZone > table:nth-child(2) > tbody tr")
      var returnData = []
      // '?' : optional cshaining, 있으면 나오고 없으면 undefined
      // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      // undefined : runtype error
      // || '' => 앞에 애가 undefined이거나 null이면 ''로 대체
      for (var i=0; i < trArr.length; i++) {
        var currentTr = trArr[i]
        var name = currentTr.querySelector('td')?.innerText.replaceAll('\n','').replaceAll('\t','')
        var address = currentTr.querySelectorAll('td')[2]?.innerText.replaceAll('\n','').replaceAll('\t','')
        var tel = currentTr.querySelectorAll('td')[3]?.innerText.replaceAll('\n','').replaceAll('\t','')
        var open = currentTr.querySelectorAll('td')[4]?.innerText.replaceAll('\n','').replaceAll('\t','')
        // 변수 이름이랑 키랑 같으면 그냥 변수명 하나만 적어줘도 키값으로 들어감
        var jsonData = {
          name,
          address,
          tel,
          open,
          sido,
          sigungu
        }
        // push : 배열 안에 집어넣기, append랑 같음
        if(jsonData.address != undefined) {
          returnData.push(jsonData)
        }
      } // end for
      return returnData
    },i,sido,sigungu) // end eval
    finalData = finalData.concat(infoArr)
    console.log(finalData.length)

    if (pageLength != i) {
      // 다음페이지 이동
      await page.evaluate(function(i,pageSelector){
        // eval
        document.querySelector(pageSelector).children[i].click()
      },i,pageSelector)
  
      await page.waitForSelector('#printZone')
    }
  } // end for
  // 브라우저 닫아주기
  browser.close()
} // end getData

// JSON파일로 변환하기
const writeFile = async function() {

  for(let i=0; i<finalData.length; i++) {
		finalData[i] = await addressParser(finalData[i]) // addressParser 함수 리턴값 : kakao api 이용 lng,lat 값을 추가한 Data
	} 

  const stringData = JSON.stringify(finalData) // 문자열로 변환

  const exist = fs.existsSync(`./json/${sido}`) // dir 존재 여부 확인 // exist : boolean
  
  // dir 만들기
  if (!exist) {
    // 정해진 문법 (참고 : https://secondmemory.kr/667)
    fs.mkdir(`./json/${sido}`, { recursive : true }, function(err) {
      console.log(err) // err 콜백 
    }) 
  }
  const filePath = `./json/${sido}/${sigungu}.json`
  await fs.writeFileSync(filePath, stringData)
}

export {
  launch,
  goto,
  checkPopup,
  evalCode,
	evalCity,
  alertClose,
  getPageLength,
  getData,
  writeFile,
}
