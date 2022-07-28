<template lang="pug">

q-page.q-pa-md(class="")
  div(v-for="data in testData2") {{data.name}} {{data.open}} 
  
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
import { app } from 'src/boot/fb'
import { axios } from 'src/boot/axios'
import { defineComponent } from 'vue'
import { getDatabase, ref, set, onValue } from 'firebase/database'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      testData2:[],
      testData : [
        {name: '약국1', tel: '123-123-123', star: 4},
        {name: '약국2', tel: '456-456-456', star: 3},
        {name: '약국3', tel: '123-456-123', star: 5}
        ],
      // defaults값 지정
      targetStar: 4
    }
  },
  mounted(){
    // init data
    // https request로 db가져오기
    // axios.get('https://~').then(res=>{
    //   console.log(res.data)
    // })
    let vm = this
    const db = getDatabase(app);
    const starCountRef = ref(db, 'addrs');
    // 실시간 데이터 베이스를 갖고 오기 위해 파이어베이스에서 만든 소켓
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      vm.testData2 = data
    });
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