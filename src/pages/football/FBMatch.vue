<template>
  <PreLoader v-if="this.matchLoading"></PreLoader>
   <div v-else class="match_wrapper">
    <PageHeader class="header">Матч № {{$route.params.number}}</PageHeader>
   <div class="match_title">
     <div class="number title_cell"># {{arMatch.number}}</div>
     <div class="date title_cell">&#128197; {{arMatch.date}}</div>
     <div class="time title_cell">&#128344; {{arMatch.time}}</div>
     <div class="stage title_cell">{{arMatch.step}}</div>
   </div>

    <div class="teams_block">
      <div class="team">
        <div class="flag">
          <img :src="urlImg + home.flag" alt="">
        </div>
        <div class="name name_home">{{home.name}}</div>
      </div>
      <div class="dash">–</div>
      <div class="team">
        <div class="name name_guest">{{guest.name}}</div>
        <div class="flag">
          <img :src="urlImg + guest.flag" alt="">
        </div>
      </div>
    </div>
    <div class="prognosis_block">
      <div class="goals_block">
        <div class="goals_block_title">
          <img src="@/assets/icon/football/scoreboard.svg" alt="">
        </div>
        <div class="goal_block">
          <div class="zero goal_btn" @click="setGoals('zero', 15)">0</div>
          <div class="minus goal_btn" @click="setGoals('minus', 15)">-</div>
          <div class="value">{{data[15]}}</div>
          <div class="plus goal_btn" @click="setGoals('plus', 15)">+</div>
          <div class="two goal_btn" @click="setGoals('two', 15)">2</div>
        </div>
        <div class="dash">–</div>
        <div class="goal_block">
          <div class="zero goal_btn" @click="setGoals('zero', 16)">0</div>
          <div class="minus goal_btn" @click="setGoals('minus', 16)">-</div>
          <div class="value">{{data[16]}}</div>
          <div class="plus goal_btn" @click="setGoals('plus', 16)">+</div>
          <div class="two goal_btn" @click="setGoals('two', 16)">2</div>
        </div>
      </div>
      <div class="prognosis_dash_line"></div>
      <div class="match_math_block">
        
        <div class="match_result_block">
          <div class="match_result_title">
            &#127942;
          </div>
          <div class="match_result_box">
            <div class="match_result_el" :class="{'active' : data[18] === 'п1'}" @click="setResult('п1')">п1</div>
            <div class="match_result_el" :class="{'active' : data[18] === 'н'}" @click="setResult('н')">н</div>
            <div class="match_result_el" :class="{'active' : data[18] === 'п2'}" @click="setResult('п2')">п2</div>
          </div>  
        </div>

        <div class="match_sum_block">
          <div class="match_sum_title">
            <span>Δ</span>
          </div>
          <div class="match_sum_box">
            <div class="minus math_btn" @click="setMath('minus', 28, 'sum')">-</div>
            <div class="value">{{data[28]}}</div>
            <div class="plus math_btn" @click="setMath('plus', 28, 'sum')">+</div>
          </div>
        </div>

        <div class="match_sum_block">
          <div class="match_sum_title">
            <span>Σ</span>
          </div>
          <div class="match_sum_box">
            <div class="minus math_btn" @click="setMath('minus', 19)">-</div>
            <div class="value">{{data[19]}}</div>
            <div class="plus math_btn" @click="setMath('plus', 19)">+</div>
          </div>
        </div>
      </div>

      <div class="prognosis_dash_line"></div>

      <div class="match_domination_block">
        <div class="title">&#129112;</div>
      </div>

      <div class="prognosis_dash_line"></div>
    </div>
    <div class="btn_block" @click="sendPrognosis">Отправить</div>
     <p style="color: #fff">&#128906; &#128960; &#128997; &#129177; &#129193;
       &#129000; &#129085; &#129077; &#129108; &#129081; &#129132; &#129173; &#129306;</p>
     <p>⚽</p>
     <p>&#129351; &#129352; &#129353; &#129112;</p>
  </div>

</template>

<script>
// пенальти &#128906;
// угловой &#128960;
// красная карта &#128997;
// желтая карта &#129000;
import PageHeader from "@/components/main/PageHeader";
import {mapActions, mapState} from "vuex";
import PreLoader from "@/components/main/PreLoader";

export default {
  name: "FBMatch",
  components: {
    PageHeader,
    PreLoader
  },

  data() {
    return {
      moreInfo: false,
      urlImg: 'https://prognos9ys.ru/',
      data: {
        30: '', //number
        15: 0, // goals_home
        16: 0, // goals_guest
        18: '', // Исход матча
        19: '', // Разница мячей
        28: '', // Сумма голов
      }
    }
  },

  created() {
      this.fillMatchElem()
  },
  methods: {
    ...mapActions({
      getMatchRequest: 'football/getMatchRequest',
    }),

    sendPrognosis(){
      console.log('ghdhd')
    },

    setGoals(type, id){

      if(type === 'zero') this.data[id] = 0

      if(type === 'minus'){
        if(this.data[id]>0) this.data[id]--
      }

      if(type === 'plus') this.data[id]++

      if(type === 'two') this.data[id] = 2

      this.data[28] = this.data[15] + this.data[16]

      this.data[19] = this.data[15] - this.data[16]

      if(this.data[19] > 0) this.data[18] = 'п1'
      if(this.data[19] === 0) this.data[18] = 'н'
      if(this.data[19] < 0) this.data[18] = 'п2'

    },

    setMath(operation, id, type = ''){
      if(operation === 'minus'){
        if(type==='sum'){
          if(this.data[id]>0) this.data[id]--
        } else{
          this.data[id]--
        }
      }

      if(operation === 'plus') this.data[id]++
    },

    setResult(res){
      this.data[18] = res
    },

    async fillMatchElem() {
      this.queryMatch.number = this.$route.params.number
      this.queryMatch.eventId = this.$route.params.event
      this.queryMatch.userToken = this.token

      console.log(this.queryMatch)
      await this.getMatchRequest()
    }
  },
  computed: {
    ...mapState({
      arMatch: state => state.football.match,
      home: state => state.football.match.home,
      guest: state => state.football.match.guest,
      queryMatch: state => state.football.queryMatch,
      matchLoading: state => state.football.matchLoading,
      token: state => state.auth.authData.token,
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.shadow_inset {
  box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), inset 0 0 0 60px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);
  padding: 0 4px;
  border-radius: 3px;
}

.flex_center{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.match_title{
  background: @DarkColorBG;
  color: @colorText;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  padding: 4px;
  border-radius: 5px;

  gap: 4px;

  margin-bottom: 4px;

  .title_cell{
    .shadow_inset;
  }

}

.teams_block{
  background: @DarkColorBG;
  color: @colorText;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 4px;
  border-radius: 5px;

  gap: 4px;

  margin-bottom: 4px;

  .team{
    max-width: 46%;
    display: flex;
    flex-direction: row;
    gap: 4px;

    .flag{
      max-width: 24px;
      .shadow_inset;
      padding: 3px;
      .flex_center;
      img{
        width: 98%;
        max-width: 20px;
        border-radius: 3px;
      }
    }

    .name{
      max-width: 85%;
      width: 180px;
      .shadow_inset;
      &.name_home{
        text-align: left;
      }
      &.name_guest{
        text-align: right;
      }
    }
  }

}

.dash{
  .shadow_inset;
}

.prognosis_block{
  background: @DarkColorBG;
  color: @colorText;
  padding: 4px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  gap: 4px;

  .prognosis_dash_line{
    width: 100%;
    border-bottom: 1px dotted @maxdarkgrey;
  }

  .goals_block{
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 4px;

    justify-content: space-between;

    .goals_block_title{
      .shadow_inset;
      color: @maxdarkgrey;
      font-size: 14px;
      img{
        width: 14px;
      }
    }

    .goal_block{
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 3px;

      .value{
        .flex_center;
        .shadow_inset;
        width: 26px;
        height: 26px;
        border: 2px solid @YesWrite;
        padding: 2px 2px;
        font-size: 14px;
        border-radius: 3px;
      }
      .goal_btn{
        width: 26px;
        height: 26px;
        background: @YesWrite;

        .flex_center;
        background: @colorText2;
        color: @colorText;
        cursor: pointer;
        box-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 -1px 0 rgba(0, 0, 0, .2);
        padding: 2px 2px;
        font-size: 14px;
        border-radius: 3px;
        text-align: center;
        border: 1px solid transparent;
        text-decoration: none;
      }
    }
  }

  .match_math_block{
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 3px;

    justify-content: space-between;
    .match_result_block{
      display: flex;
      flex-direction: row;

      gap: 4px;

      .match_result_title{
        .flex_center;
        width: 24px;
        height: 24px;
        .shadow_inset;
        img{
          width: 16px;
          height: 16px;
        }
      }
      .match_result_box{
        display: flex;
        flex-direction: row;
        gap:2px;

        .match_result_el{
          .flex_center;
          .shadow_inset;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          font-size: 12px;
          border: 2px solid @maxdarkgrey;
          &.active{
            border-color: @YesWrite;
          }
        }
      }
    }
    
    .match_sum_block{
      display: flex;
      flex-direction: row;
      gap: 3px;
      
      .match_sum_title{
        width: 24px;
        height: 24px;
        color: @colorText;
        .shadow_inset;
        .flex_center;
        span{
          display: flex;
          flex-direction: column;
          gap:0;
          font-size: 18px;
          font-weight: 700;
        }
      }
      .match_sum_box{
        display: flex;
        flex-direction: row;
        gap:3px;
        .math_btn{
          width: 24px;
          height: 24px;
          background: @YesWrite;

          .flex_center;
          background: @colorText2;
          color: @colorText;
          cursor: pointer;
          box-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 -1px 0 rgba(0, 0, 0, .2);
          padding: 2px 2px;
          font-size: 14px;
          border-radius: 3px;
          text-align: center;
          border: 1px solid transparent;
          text-decoration: none;
        }
        .value{
          .flex_center;
          .shadow_inset;
          width: 24px;
          height: 24px;
          border: 2px solid @YesWrite;
          padding: 2px 2px;
          font-size: 14px;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>