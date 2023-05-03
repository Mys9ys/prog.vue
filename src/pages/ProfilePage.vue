<template>
  <PreLoader v-if="profileLoader"></PreLoader>

  <p>{{profileData}}</p>

  <div class="user_block">
    <div class="ava_block">
      <img src="" alt="" v-if="profileData.info.img">
      <img class="ava" src="@/assets/img/ava_no_img.jpg" alt="" v-else>
    </div>
    <div class="right_block">
      <div class="right_el">{{profileData.info.NAME}}</div>
      <div class="right_el">{{profileData.info.reg}}</div>
      <div class="right_el">Новичок</div>
    </div>
  </div>
  <div class="prognosis_block">

  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PreLoader from "@/components/main/PreLoader";

export default {
  name: "ProfilePage",
  components: {
    PreLoader
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
      width: 40%;
      background: @DarkColorBG;
      padding: 4px;
      border-radius: 5px;
      .flex_center;
      img{
        max-width: 100px;
        width: 100%;
        border-radius: 5px;
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
        .shadow_inset;
        color: @colorText;
        justify-content: left;
        text-align: left;
      }
    }
  }
</style>