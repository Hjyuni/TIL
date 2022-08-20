// 코드가 길어질 경우 v1의 값이 변한걸 모를 수 있음
let v1 = 'v1';
v1 = 'abc';
let v2 = 'v2';

// 객체는 데이터와 처리 방법을 담는 그릇으로서의 역할을 함
// this: 객체의 이름이 변해도 그 객체를 참고
let o = {
  v1:'v1',
  v2:'v2',
  f1: ()=>{
    console.log(this.v1);
  },
  f2: ()=>{
    console.log(this.v2);
  },
}

o.f1();
o.f2();