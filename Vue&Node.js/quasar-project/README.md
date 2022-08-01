
# Vue

## 0. intro

* See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
* 초보들이 많이 틀리는 : https://joshua1988.github.io/web-development/vuejs/common-error-cases/
* codepen : https://codepen.io/atzedent/pen/JjLroZm
* firebase : https://firebase.google.com/?hl=ko&gclid=Cj0KCQjwof6WBhD4ARIsAOi65aidNI6t9Njh_ksKZ7KbqrgzFoWuN0NuvpgnpPtguz_wU3lxer_Pi60aAmcUEALw_wcB&gclsrc=aw.ds

1. node.js 깔려 있나 확인하기

```shell
node -v
```

2. yarn & quasar 깔기

* 다운로드 사이트: https://quasar.dev/start/quasar-cli

```shell
# install yarn
npm install -g yarn
yarn global add @quasar/cli
# install quasar
yarn create quasar
```

3. 선택하기

```shell
√ What would you like to build? » App with Quasar CLI, let's go!
√ Project folder: ... quasar-project
√ Pick Quasar version: » Quasar v2 (Vue 3 | latest and greatest)
√ Pick script type: » Javascript
√ Pick Quasar App CLI variant: » Quasar App CLI with Vite
√ Package name: ... quasar-project
√ Project product name: (must start with letter if building mobile apps) ... Quasar App   
√ Project description: ... A Quasar Project
√ Author: ... 
√ Pick your CSS preprocessor: » Sass with SCSS syntax
√ Check the features needed for your project: » State Management (Pinia), Axios  
```

4. pug 깔기

```shell
# vsc 오른쪽 마우스로 터미널 들어가기
# quasor-project/src
yarn add --dev pug pug-plain-loader
```

5. IndexPage.vue
   * `lang="pug"`로 바꾸고 <>를 ()로 바꾸기

```vue
<template lang="pug">⭐
q-page( class="flex flex-center" )
  img(
    alt="Quasar logo"
    src="~assets/quasar-logo-vertical.svg"
    style="width: 200px; height: 200px")
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
```

6. 실행해보기

```shell
# localhost:9000
yarn quasar dev
# 안되면
npx quasar dev
```

7. indexPage.vue (vue기초)

```vue
# ./quasar-project/indexPage.vue
<template lang="pug">

q-page.q-pa-md(class="")
  div(v-for="data in testData") {{data}} 
  
  q-input(v-model="targetStar")
  input(v-model="targetStar")
  q-list(v-for="data in testData" @click="select(data)")
    q-item.q-mb-sm.good.shadow-2.flex.flex-center(v-if="data.star >= targetStar")
      .name {{data.name}}  ({{data.star}})
      .tel {{data.tel}}
    q-item.q-mb-sm.shadow-2(v-else)
      .name {{data.name}}  ({{data.star}})
      .tel {{data.tel}}
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      testData : [
        {name: '약국1', tel: '123-123-123', star: 4},
        {name: '약국2', tel: '456-456-456', star: 3},
        {name: '약국3', tel: '123-456-123', star: 5}
        ],
      // defaults값 지정
      targetStar: 4
    }
  },
  methods:{
    select(data){
      alert(data.name + "입니다")
      // alert(JSON.stingify(data))
    }
  }
})
</script>

<style lang="scss">
.name {font-size: 1rem; font-weight: bold;}
.tel {font-size: 1rem; font-weight: lighter;}
.good {background-color: pink;}
</style>
```

8. 실행

```shell
yarn quasar dev
```



---

## 1. firebase

> firebase-document: https://firebase.google.com/docs?gclid=Cj0KCQjw54iXBhCXARIsADWpsG9rdGur5sx9Kw3IExWhn2Ndy7_S_FhtffOIC7MapCV2QtUZKug5IBAaApb9EALw_wcB&gclsrc=aw.ds

* 새  프로젝트 만든 후

```sheell
npm install -g firebase-tools
```

* 로그인하기

```shell
firebase login
```

* init

```shell
# vsc
# ./quasor-project
firebase init
```

* 옵션 선택

```shell
 ( ) Storage: Configure a security rules file for Cloud Storage
 ( ) Emulators: Set up local emulators for Firebase products
 ( ) Remote Config: Configure a template file for Remote Config
>(*) Realtime Database: Configure a security rules file for Realtime Database and (optionally) provision default instance
 ( ) Firestore: Configure security rules and indexes files for Firestore
 ( ) Functions: Configure a Cloud Functions directory and its files
 (*) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 
? Please select an option: Use an existing project
? Select a default Firebase project for this directory: project-vue-a3fe4 (project-vue)
i  Using project project-vue-a3fe4 (project-vue)

? It seems like you haven’t initialized Realtime Database in your project yet. Do you want to set it up? Yes
? Please choose the location for your default Realtime Database instance: asia-southeast1 

? What file should be used for Realtime Database Security Rules? databt to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
```

* quasar

```shell
# vsc cmd
# ./quasar-project
yarn quasar build -m spa
firebase deploy --only hosting
```

* firebase.json

```json
{
  "database": {
    "rules": "database.rules.json"
  },
  "hosting": {
    "public": "dist/spa",⭐
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

```

* firebase 들어가면 내가 만든 홈페이지 배포되어 있음
* realtime-database 들어가기
* firebase - 프로젝트 개요 옆 설정 모양 누르기 - 일반 - 맨 밑에 `</>`선택 - 앱등록
* `./boot/fb.js` 생성 후 firebase SDK 밑에 나오는 코드 복붙

* `yarn add firebase`

```shell
# vsc cmd
# ./quasar-project
yarn add firebase
```

---

## 2. Vue component

* https://kr.vuejs.org/v2/guide/components.html

---

## 3. CRUD

> * 구글독스: https://docs.google.com/document/d/1J5SJljqpMB0YlWaWEUFltDlpTxYIq9NyCoJ18C-WcK4/edit
> * firebase docs: https://firebase.google.com/docs/database/web/read-and-write

* Create: `push`
* Read: `onValue`
* Update: `update`
* Delete: `remove`
