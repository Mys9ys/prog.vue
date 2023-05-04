<template>
  <PreLoader v-if="profileLoader"></PreLoader>
  <PageHeader class="header">{{profileData.info.NAME}}</PageHeader>

<!--  <p>{{profileData}}</p>-->

  <div class="user_block">
    <div class="ava_block">
      <img src="" alt="" v-if="profileData.info.img">
      <img class="ava" src="@/assets/img/ava_no_img.jpg" alt="" v-else>
    </div>
    <div class="right_block">
      <div class="right_el"><div class="title">Ник:</div> <span> {{profileData.info.NAME}}</span></div>
      <div class="right_el"><div class="title">Рег. дата:</div> <span>{{profileData.info.reg}}</span></div>
      <div class="right_el"><div class="title">Звание:</div> <span>Новичок</span></div>
      <div class="right_el"><div class="title">Прогнозов:</div> <span>{{profileData.info.count}}</span></div>
    </div>
  </div>
  <div class="prognosis_block">
    <div class="football_block" v-if="profileData.football">

    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PreLoader from "@/components/main/PreLoader";
import PageHeader from "@/components/main/PageHeader";

export default {
  name: "ProfilePage",
  components: {
    PreLoader,
    PageHeader
  },
  data() {
    return {
      url:  'https://prognos9ys.ru/',
      profileLoader: false
    }
  },

  created() {
    this.profileLoader = true

    this.fillProfile()
  },

  watch: {

    profileData(){
      console.log('dfvdsds')
    }
  },
  methods: {
    ...mapActions({
      getProfileInfo: 'profile/getProfileData',
    }),

    async fillProfile() {
      if(this.$route.params.id){
        this.profileRequest['userId'] = this.$route.params.id
      }
      await this.getProfileInfo()
      this.profileLoader = false

    }
  },

  computed: {
    ...mapState({
      profileData: state => state.profile.profileData,
      profileRequest: state => state.profile.profileRequest,
    })
  },

}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
  .user_block{
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    gap: 4px;

    .ava_block{
      width: 45%;
      background: @DarkColorBG;
      padding: 4px;
      border-radius: 5px;
      .flex_center;
      img{
        border-radius: 50%;
        max-width: 135px;
        width: 100%;
        border: 2px solid @darkbg;
      }
    }

    .right_block{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      background: @DarkColorBG;
      padding: 4px;
      border-radius: 5px;

      .right_el{
        display: flex;
        flex-direction: row;
        .shadow_inset;
        color: @colorText;
        justify-content: space-between;
        text-align: left;

        .title{
          display: inline-block;
          color: @colorBlur;
        }
      }
    }
  }
</style>