<template>
  <div class="user mx-10 px-5">
    <h1 color="grey--text darken-2" >Virtual Cards</h1>
    <v-tabs
    color="pink lighten-2 "
    >
      <v-tab to='/user/profile'>Your</v-tab>
      <v-tab to='/user/all'>All</v-tab>
      <v-tab to='/user/blocked'>Blocked</v-tab>
    </v-tabs>
    <hr>
    <router-view></router-view>
    
    
    

  </div>
</template>
<script>
import axios from "axios"
const baseAPI='http://localhost:3000/cards'
export default {
  data() {
    return {
      cardList:[],
      page:1,
      iscardListLast:false,
    }
  },
  async created(){
    // try{
    //   const res = await axios.get(baseAPI)
    //   this.cardList=res.data.data
    // }
    // catch(e) {
    //   console.error(e)
    // }
  },
  
  methods:{
    async fetchData(){
      try{
        let cardData= await await axios.get(baseAPI+`?_page=${this.page}`)
      this.cardList.push(...cardData.data)
      if((cardData.data.length<10)||(cardData.data.length ==0)){
        this.iscardListLast=true
      }
      }
      catch(e) {
      console.error(e)
    }
    },
    async visibilityChangedScrolledToBottom(isVisiable){
      if(!isVisiable){
        return
      }
      if(this.iscardListLast===true){
        return
      }
      this.page++
      this.fetchData()
      
    }
  },
  mounted(){
    this.fetchData()
  },
}
</script>
<style lang="scss" scoped>
.user{

}
</style>
