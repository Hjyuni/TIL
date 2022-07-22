import { launch, goto, checkPopup, evalCode, evalCity, alertClose, getPageLength, getData, writeFile } from './modules/crawler.js'

async function main() {
  // 브라우저 실행
  await launch('seoul','songpa_gu')
  // 페이지 이동
  await goto('https://www.pharm114.or.kr/main.asp')
  // 팝업창 체크 후 닫기
  await checkPopup()
  // 지역 선택
  await evalCode()
  // 시군구 선택
  await evalCity()
  // 팝업창 닫기
  await alertClose()
  // 페이지 수 세기
  await getPageLength()
  // 데이터 페이지 수만큼 가져오기
  await getData()
  // 데이터 적어주기
  await writeFile()

  // 프로세스 종료
  process.exit(1)
}

main()