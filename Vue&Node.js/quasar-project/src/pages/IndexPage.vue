<template lang="pug">

q-page( class="" )

  ListView(refAddr="addrs")

  //- div

  q-input(v-model="targetStar")
  input(v-model="targetStar")
  q-list(v-for="data in testData" @click="select(data)")
    
    q-item(v-if="data.star >= targetStar")
      .name {{data.name}} ({{data.star}})
      .tel {{data.tel}}

    q-item(v-else)
      .name {{data.name}} ({{data.star}})
      .tel {{data.tel}}

</template>

<script>
import { app } from 'src/boot/fb'
import { defineComponent } from 'vue'
// import component
import ListView from "../components/ListVue.vue"

export default defineComponent(
  {
    name: "IndexPage",
    components: { ListView },
    data() {
        return {
            targetStar: 5,
            testData2: [],
            testData: [
                { name: "약국1", tel: "123-123-123", star: 2 },
                { name: "약국2", tel: "123-123-123", star: 51 },
                { name: "약국3", tel: "123-123-123", star: 41 },
            ]
        };
    },
    methods: {
        select(data) { alert(JSON.stringify(data)); }
    }
    
})
</script>

<style lang="scss">
.name { font-size : 1rem; font-weight:bold;}
.tel { font-size: 0.8rem; font-weight:thin}
.good { background: lightgreen; }
</style>
