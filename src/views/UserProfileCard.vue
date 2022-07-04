<template>
  <div class="profile-cards">
     <v-row class="d-flex justify-space-between"
     no-gutters
     
     >
      <v-col
      v-for="card in cardList" :key="card.id"
      class=""
        cols="12"
        sm="5"
      >

      <v-card
          :elevation="3"
          class="my-5 pa-3"
        >
        <div class="d-flex justify-space-between align-center">
          <span>
            <h2 >
              {{card.name}}
            </h2>
            <p class="grey--text darken-2 ma-0">
              <v-avatar
              color="grey darken-2"
              size="8">
              </v-avatar> 
              {{card.budget_name}}
            </p>
          </span>
          <span>
            <v-icon
            v-if="card.card_type=='burner'"
            large
            color="pink lighten-3" > donut_large
            </v-icon>
            <v-icon
            v-if="card.card_type=='subscription'"
            large
            color="pink lighten-3" >donut_small</v-icon>
            
          </span>
        </div>
        <div class="d-flex justify-space-between align-center">
          <v-btn
          elevation="2"
          outlined
           x-small>
            {{card.card_type}}
          </v-btn>
          <span>
            Expires:{{card.expiry}}
          </span>
        </div>
        <div class="my-3">
          <v-progress-linear
      background-color="success"
      color="pink lighten-3"
      height="5"
      rounded
      :value="((card.spent.value/(card.spent.value + card.available_to_spend.value)*100))"
    ></v-progress-linear>
        </div>
        <div>
          <div class="d-flex justify-space-between align-center">
            <span>
              <p class="ma-0">
              <v-avatar
              color="pink lighten-3"
              size="10">
              </v-avatar> 
              Spent
            </p>
            </span>
            <span>
              {{card.spent.value}} {{card.spent.currency}}
            </span>
          </div>
          <div class="d-flex justify-space-between align-center">
            <span>
              <p class="ma-0">
              <v-avatar
              color="success"
              size="10">
              </v-avatar> 
              Available to spend
            </p>
            </span>
            <span>
              {{card.available_to_spend.value}} {{card.available_to_spend.currency}}
            </span>
          </div>
        </div>
        <span>
      
      </span>
    </v-card>
      </v-col>
      
     </v-row>
    <div v-if="cardList.length" v-observe-visibility="visibilityChangedScrolledToBottom">
    </div>
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
  },
  
  methods:{
    async fetchData(){
      try{
        let cardData= await await axios.get(baseAPI+`?owner_id=7&_page=${this.page}`)
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
