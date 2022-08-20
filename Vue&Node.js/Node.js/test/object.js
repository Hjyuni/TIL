// array, object
// 함수를 값으로 갖는 변수
let func = function f1(){
            console.log(1+1);
            console.log(1+2);
          }
// 함수를 값으로 갖는 변수를 실행하기
func();

// 배열의 원소로서 함수를 가질 수 있음
// 잘 사용하지는 않음
let arr = [f];
arr[0]();

// 객체의 원소로서 함수를 가질 수 있음
// property
let obj = {
  f:func 
}
obj.f();