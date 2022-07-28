// yarn add axios
import axios from "axios"


// parsing : 데이터를 원하는 모양으로 만드는 것
// parser : parsing을 하는 프로세서
async function addressParser(data) {
	// https://developers.kakao.com/docs/latest/ko/local/dev-guide
	const res = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
		params: {
			query: data.address, // crawler.js writeFile 함수 finalData[i]의 address : i번째 약국 주소
		},
		headers: {
			Authorization: 'KakaoAK apikey' // 본인 키 입력 'KakaoAK (RESTapi key)'
		}
	})

    //console.log(res.data.documents)

    let lng, lat = 0

    if(res.data.documents.length > 0) {
      lng = res.data.documents[0].address.x
      lat = res.data.documents[0].address.y
    }

    // finalData json 에 lng, lat  key value 추가 
	data.lng = lng
	data.lat = lat

    return data
}

export { addressParser }