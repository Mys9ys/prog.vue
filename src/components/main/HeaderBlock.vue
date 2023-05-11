<template>
  <div class="header_wrapper">
    <div class="h_main_block">
      <div class="hm_left_block">
        <div class="hm_achieve_block">
          <div class="hm_achieve_box hm_box">
            Новичок
          </div>
        </div>
        <div class="hm_btn_block">
          <BtnMini v-for="(btn, index) in l_btns"
                   :key="index"
                   @click="$router.push('/' + btn.link)"
                   :img="btn.img"></BtnMini>
        </div>
      </div>
      <AvaComponent v-if="$router.currentRoute.value.path === '/register'" class="hm_ava_block"
                    :pageType="'reg'"
                    :img="$store.state.reg.avaLink"
      ></AvaComponent>

      <AvaComponent v-else class="hm_ava_block"
                    :img="$store.state.auth.userInfo.ava"
      ></AvaComponent>

      <div class="hm_right_block">
        <div class="hm_nick_box hm_box">
          <span v-if="$store.state.auth.userInfo.NAME">{{ $store.state.auth.userInfo.NAME }}</span>
          <span v-else>Гость</span>
        </div>

        <div class="hm_btn_block hm_right">
          <BtnMini v-for="(btn, index) in r_btns"
                   :key="index"
                   @click="$router.push('/' + btn.link)"
                   :img="btn.img"></BtnMini>
          <BtnMini @click="logoutProfile"
                   :img="require('@/assets/icon/header/exit.svg')"></BtnMini>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import BtnMini from "@/components/ui/btn/BtnMini";
import {mapActions, mapState} from "vuex";
import AvaComponent from "@/components/main/AvaComponent";

export default {
  name: "HeaderBlock",
  components: {BtnMini, AvaComponent},
  data() {
    return {
      l_btns: [
        {link:'main', img: require('@/assets/icon/header/home.svg'), name: 'Главная'},
        {link:'catalog', img: require('@/assets/icon/header/list.svg'), name: 'Каталог'},
        {link:'humor', img: require('@/assets/icon/header/fio.svg'), name: 'Шутки'},
      ],

      r_btns: [
        {link:'ratings', img: require('@/assets/icon/header/bonus.svg'), name: 'Рейтинги'},
        {link:'profile', img: require('@/assets/icon/header/profile.svg'), name: 'Профиль'},
        // {link:'logout', img: require('@/assets/icon/header/exit.svg'), name: 'Выход'},
      ],
      menu: false
    }
  },

  watch: {
    token(){
      console.log('watch token yes')
      this.checkAuth()
    }
  },


  mounted() {
    this.$nextTick(function () {
      if (this.token) {
        // проверка токена на актуальность
        console.log('mounted token yes')
        this.checkAuth()
      } else {
        console.log('token no')
        this.$router.push('/')
      }
    })
  },
  computed: {
    ...mapState({
      token: state => state.auth.authData.token,
    })
  },


  methods: {
    ...mapActions({
      loginRequest: 'auth/loginRequest',
      logoutVue: 'auth/logoutVue'
    }),

    logoutProfile() {
      this.logoutVue()
      this.$router.push('/').then(() => { this.$router.go() })
    },

    async checkAuth() {
      await this.loginRequest()
      if (location.pathname === '/mob_app/') this.$router.push('/main')
    }
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.header_wrapper {
  position: relative;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: @DarkColorBG;
  color: @colorText2;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 80px;

  margin-bottom: 40px;

  border-radius: 0 0 5px 5px;

  z-index: 15;

  .h_header_block {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    .hh_box {
      margin-bottom: 10px;
      display: inline;
      padding: 2px 10px;
      box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), inset 0 0 0 60px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);
      //background: linear-gradient(rgb(70,70,70), rgb(120,120,120));
    }
  }

  .h_main_block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    //height: 60px;
    .hm_left_block {
      display: flex;
      flex-direction: column;

      .hm_achieve_block {
        width: 130px;
        display: flex;
        flex-direction: column;
      }
    }

    .hm_right_block {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;

      .hm_nick_box {
        width: 130px;
        display: flex;
        flex-direction: column;
        text-align: right;
      }
    }

    .hm_btn_block {
      position: relative;
      display: flex;
      flex-direction: row;
      gap: 4px;
      width: 128px;
      z-index: 15;

      &.hm_right{
        justify-content: flex-end;
      }

      .header_button {
        display: inline-block;
        background: @colorText2;
        color: @colorText;
        cursor: pointer;
        box-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 -1px 0 rgba(0, 0, 0, .2);
        padding: 3px;
        border-radius: 3px;
        min-width: 22px;
        text-align: center;
      }
    }

    .hm_ava_block {
      width: 120px;
      position: absolute;
      left: 50%;
      bottom: -55px;
      transform: translateX(-50%);
      z-index: 5;
    }

    .hm_box {
      margin-bottom: 5px;
      padding: 2px 10px;
      box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), inset 0 0 0 60px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);
      //background: linear-gradient(rgb(70,70,70), rgb(120,120,120));
    }
    .hm_achieve_box{
      text-align: left;
    }
  }
}

.hm_right {
  text-align: right;
}

.header_menu_icon {
  width: 16px;
  height: 16px;
}

.menu_events_btn {
  cursor: pointer;
  position: relative;

  .bi-caret {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
  }
}

.menu_events_box {
  display: none;

  ul {
    margin-left: 0;
    padding-left: 0;

    li {
      list-style-type: none;
    }
  }
}
</style>