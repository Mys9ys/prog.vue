<template>
  <PageHeader class="header">Главная</PageHeader>
  <div class="nearest_events_wrapper block_wrapper">
    <div class="title_wrapper nearest" v-if="!nearest">
      <div class="title">Ближайшие события</div>
    </div>
    <div class="events_block" v-else>
      <SectionMatches
          :arMatches="footballNearest"
      ></SectionMatches>
      <div class="empty_wrapper nearest" v-if="!nearest">
        <div class="empty" >Сегодня/завтра скучно</div>
      </div>
    </div>
    <div class="btn_box">
      <div class="btn_all nearest" @click="$router.push('/catalog')">Все события <img src="@/assets/icon/pagination/right.svg" alt=""></div>
    </div>

  </div>
  <div class="humor_wrapper block_wrapper">
    <div class="title_wrapper humor">
      <div class="title">Минутка юмора</div>
    </div>
    <HumorEl></HumorEl>
   <div class="btn_box">
     <div class="btn_all humor" @click="$router.push('/humor')">Весь юмор <img src="@/assets/icon/pagination/right.svg" alt=""></div>
   </div>
  </div>
  <div class="news_wrapper block_wrapper">
    <div class="title_wrapper news">
      <div class="title">Последняя новость</div>
    </div>
    <NewsEl></NewsEl>
    <div class="btn_box">
      <div class="btn_all news" @click="$router.push('/news')">Все новости <img src="@/assets/icon/pagination/right.svg" alt=""></div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/main/PageHeader";
import NewsEl from "@/components/ui/NewsEl";
import HumorEl from "@/components/ui/HumorEl";
import {mapActions, mapState} from "vuex";
import SectionMatches from "@/components/football/SectionMatches";

export default {
  name: "MainPage",
  components: {
    PageHeader,
    SectionMatches,
    NewsEl,
    HumorEl
  },
  data() {
    return {
      nearest: false,
      smallNews: true
    }
  },

  mounted() {
    this.getNearestFootball()
  },

  methods: {
    ...mapActions({
      authRequest: 'mainPage/getFootballNearest',
    }),

    async getNearestFootball() {

      this.setToken['userToken'] = this.token

      await this.authRequest()

      if(this.footballNearest) this.nearest = true
    }

  },

  computed: {
    ...mapState({
      token: state => state.auth.authData.token,
      setToken: state => state.mainPage.setToken,
      footballNearest: state => state.mainPage.footballNearest
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.block_wrapper{

}
.title_wrapper{
  padding: 4px;
  border-radius: 5px;
  color: @colorText;
  margin-top: 25px;
  text-align: left;
  margin-bottom: 10px;
  .title{
    .shadow_inset;
  }
}
.empty_wrapper{
  padding: 4px;
  border-radius: 5px;
  color: @colorText;
  margin-top: 8px;
  text-align: left;
  margin-bottom: 10px;
}
.empty{
  .shadow_inset;
  font-size: 12px;
}
.btn_box{
  text-align: right;
}
.btn_all{

  display: inline-block;
  background: @colorText2;
  color: @colorText;
  cursor: pointer;
  .shadow_template;
  padding: 2px 6px;
  font-size: 14px;
  border-radius: 3px;
  text-align: center;
  border: 1px solid transparent;
  text-decoration: none;
  margin-top: 10px;
  img{
    margin-left: 12px;
  }
  &:hover{
    opacity: 0.8;
  }
}

.nearest{
  background: @billiard;
}
.humor{
  background: @cubersport;
}
.news{
  background: @kerling;
}

</style>