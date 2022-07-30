<template lang="pug" >

div.q-ma-md( v-for="data in testData2" ) | {{data.name}}

</template>
<script>
import { app } from 'src/boot/fb'
import { defineComponent } from 'vue'
import { getDatabase, ref, set, onValue } from "firebase/database"


export default defineComponent(
  {
    props:{
      refAddr: {
        type: String,
        defalut: 'addrs'
      }
    },
    data() {
        return {
            testData2: [],
        }
    },
    mounted() {
      console.log(this.refAddr)
        // init data HTTP request 
        // axios.get('https://project-0727-lec-default-rtdb.firebaseio.com/addrs.json').then(res=>{
        //   console.log(res.data)
        // })
        let vm = this;
        const db = getDatabase(app);
        const starCountRef = ref(db, vm.refAddr);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            vm.testData2 = data;
        });
    },

  })


</script>