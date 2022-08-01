<template lang="pug">
q-page.q-pa-sm
  .row.flex-center
    .col 
      div.q-px-md fbRef : {{ fbRef }} 
    q-input.col(filled v-model="fbRef")
    
  ListView(:refAddr="fbRef")  

</template>

<script>
import { app } from 'src/boot/fb'
import { defineComponent } from 'vue'

import ListView from "../components/ListView.vue"

export default defineComponent({
  name: "IndexPage",
  components: { ListView },
  data() {
    return {
      fbRef: 'addrs2',
    };
  },
  methods: {
    select(data) { alert(JSON.stringify(data)); }
  }

})
</script>

<style lang="scss">
.name {
  font-size: 1rem;
  font-weight: bold;
}

.tel {
  font-size: 0.8rem;
  font-weight: thin
}

.good {
  background: lightgreen;
}
</style>
