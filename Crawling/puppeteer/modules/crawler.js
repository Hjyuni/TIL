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

let browser = null
let page = null
let pageLength = 0

const pageSelector = 'body > table:nth-child(2) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > table > tbody >   tr:nth-child(5) > td > table:nth-child(5) > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(3)'

// puppeteer 실행함수
const launch = async function() {
  // 브라우저 띄우기(빈화면)
  browser = await puppeteer.launch(launchConfig);
  // 브라우저에 페이지 넣기(Example Domain 화면 뜸)
  const pages = await browser.pages();
  // console.log(pages)
  page = pages[0]
}

const goto = async function(url) {
  // console.log(page)
  return await page.goto(url)
}

// 창이 여러개로 생성되는 팝업창 닫기
const checkPopup = async function () {
  const pages = await browser.pages();
  // 팝업 체크 후 마지막 페이지를 찾아서 닫아줘
  await pages.at(-1).close();
  // console.log(pages.length);
}

const evalCode = async function(name) {
    await page.evaluate(function(name) {
        document.querySelector(`#continents > li.${name} > a`).click()
    }, name)
}

const evalCity = async function(sigungu) {
    await page.waitForSelector(`#continents > li.${sigungu} > a`)
    await page.evaluate(function(sigungu){
        document.querySelector(`#continents > li.${sigungu} > a`).click()
    }, sigungu)
}

// alert로 된 팝업창 닫기
const alertClose = async function() {
  // 페이지에 dialog라는 것이 뜨면 뒤에 함수를 실행하게 하겠다
  // .on => 이벤트가 발생 하면
  await page.on('dialog', async function(dialog){await dialog.accept()
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

const getData = async function() {
  // 내가 가야할 페이지 수 만큼 반복
  // 들어가면 이미 페이지 1이어서 페이지-만큼만 선택해주면 되기 때문에 i=1부터
  for (let i=1; i < pageLength; i++) {
    console.log(i)
  
    await page.waitForSelector(pageSelector)
    
    // 페이지 클릭하기
    await page.evaluate(function(i, pageSelector) {

      document.querySelector("#printZone > table:nth-child(2) > tbody tr")

      document.querySelector(pageSelector).children[i].click()
    },i ,pageSelector)
  }
}



export {
    launch,
    goto,
    checkPopup,
    evalCode,
    evalCity,
    alertClose,
    getPageLength,
    getData
}