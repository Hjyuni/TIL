<template lang="pug">
.btn-container.row.q-ma-sm.q-gutter-md
  q-btn(@click="openDialog()") 만들기
  q-btn(@click="openUpdateDialog()") 수정하기
  q-btn(@click="deleteData()") 삭제
  q-btn(@click="animation()") Animation

q-btn(@click="search()") 검색하기
q-dialog( v-model="dialog" persistent  style="display:block")
  q-card( class="bg-teal text-white" style="width: 300px")
    q-card-section
      div( class="text-h6") 새로만들기
    q-card-section( class="q-pt-none") 
      q-input(v-for="template in fromDef" v-model="newData[template.field]" :label="template.name")

    q-card-actions( align="right" class="bg-white text-teal")
      q-btn(style="background:white; color:black" @click="createData(newData)" v-close-popup) 만들기
      q-btn(style="background:white; color:black" v-close-popup) 취소
      
q-dialog( v-model="updateDialog" persistent  style="display:block")
  q-card( class="bg-teal text-white" style="width: 300px")
    q-card-section
      div( class="text-h6") 수정하기
    q-card-section( class="q-pt-none") 
      q-input(v-for="template in fromDef" v-model="targetData[template.field]" :label="template.name")
      
    q-card-actions( align="right" class="bg-white text-teal")
      q-btn(style="background:white; color:black" @click="updateData()" v-close-popup) 저장하기

.grid
  q-card.card(v-if="dataList" v-for="(dataItem, idx) in dataList" 
  dark bordered 
  class="bg-grey-9 my-card" 
  @click="selectData(dataItem.key, dataItem)"
  v-bind:class="{selected: dataItem.key === targetIdx}"
  )

    q-card-section
      div( class="text-h6") {{ dataItem.name }}
      div( class="text-subtitle2") {{ dataItem.address }}

      q-separator( dark inset)

      q-card-section
        div {{ dataItem.open }}
        div {{ dataItem.sido }}
        div {{ dataItem.sigungu }}
        div {{ dataItem.tel }}
        div {{ dataItem.memo }}
   
</template>

<script>
// yarn add gsap
import { gsap } from "gsap";

// vue 
import { defineComponent } from 'vue'
// firebase app
import { app } from 'src/boot/fb'
// firebase lib
import { getDatabase, ref, set, onValue, update, remove, push, child , query, limitToLast } from "firebase/database"
const db = getDatabase(app);

export default defineComponent(
  {
    props: {
      refAddr: {
        type: String,
        defalut: 'addrs',
      }
    },

    data() {
      return {
        fromDef : [
          {field: 'name', name: '약국이름'},
          {field: 'address', name: '주소'},
          {field: 'open', name: '시간'},
          {field: 'sido', name: '시/도'},
          {field: 'sigungu', name: '시/군/구'}, 
          {field: 'tel', name: '전화번호'},
          {field: 'memo', name: '메모'},
        ],
        dialog: false,
        updateDialog: false,
        targetIdx: 0,
        targetData: {},
        newData: {
          address:"", name:"", open:"", sido:"", sigungu:"", tel:""
        },
        dataList: [],
      }
    },
    mounted() {
      this.search()
    },

    methods: {
      animation() {
        gsap.from(".card", {
          y: 100,
          stagger: 0.1 // 0.1 seconds between when each ".box" element starts animating
        });
      },
      openUpdateDialog() {
        this.updateDialog = true
      },
      openDialog() {
        this.dialog = true
        this.newData = {
          address:"", name:"", open:"", sido:"", sigungu:"", tel:""
        }
      },
      createData(data) {
        let vm = this
        const newPostKey = push(child(ref(db), 'addrs')).key;
        update(ref(db, `${vm.refAddr}/${newPostKey}`), data)
        this.newData = {
          address:"", name:"", open:"", sido:"", sigungu:"", tel:""
        }
        this.dialog = false
      },

      updateData() {
        let vm = this
        vm.targetData.name = vm.targetData.name
        update(ref(db, `${vm.refAddr}/${vm.targetIdx}`), vm.targetData);
      },

      deleteData() {
        let vm = this;
        console.log(`${vm.refAddr}/${vm.targetIdx}`)
        remove(ref(db, `${vm.refAddr}/${vm.targetIdx}`))
      },

      selectData(idx, data) {
        let vm = this
        vm.targetIdx = idx
        vm.targetData =data
      },

      search() {
        let vm = this;
        let refs = query(ref(db, vm.refAddr), limitToLast(10));
        console.log("!!!", refs)
        // const starCountRef = ref(db, vm.refAddr);
        onValue(refs, (snapshot) => {
          const data = []
          snapshot.forEach((sn=>{
            if(sn.val() !== null){
              let snData = sn.val()
              snData.key = sn.key
              data.push(snData)
            }
              
          }));
          // console.log(data);
          vm.dataList = data;
        });
      }
    }

  })


</script>
<style>
.grid {
  display: grid;
  grid-template-columns: auto auto auto;

} 
.listContainer {

  padding: 8px;
  background: lightgray;
  margin-bottom: 12px;
}
.title{ font-size:1.3rem; font-weight:bold;}
.selected{ background: pink !important;}
.btn-container{
  position:fixed; bottom: 10px; width:100%; height:60px; z-index:999; background: white;
}
</style>