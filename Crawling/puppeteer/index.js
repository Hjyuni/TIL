import {launch, goto, checkPopup, evalCode, alertClose, evalCity, getPageLength, getData} from './modules/crawler.js'

async function main() {
    // 브라우저 화면 띄우기
    await launch()
    // url 이동하기
    await goto('https://www.pharm114.or.kr/main.asp')
    // 팝업창 닫기
    await checkPopup()
    // 지역 가져오기(서울 경기,,)
    await evalCode('seoul')
    // 시군구 가져오기
    await evalCity('kangnam_gu')
    // alert창 끄기
    await alertClose()
    // 페이지 수 세기
    await getPageLength()
    // 데이터 가져오기
    await getData()

}

main()