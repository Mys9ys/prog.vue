<template>
  <div class="header_wrapper">
    <div class="h_main_block">
      <div class="hm_left_block">
        <div class="hm_achieve_block">
          <div class="hm_achieve_box hm_box">1
            <i class="bi bi-award"></i>
            <i class="bi bi-award-fill"></i>
          </div>
        </div>
        <div class="hm_btn_block">
          <div class="header_button header_btn_menu" title="Меню">1<i class="fa fa-bars" aria-hidden="true"></i></div>
          <a class="header_button" href="/" title="Главная">2<i class="fa fa-home" aria-hidden="true"></i></a>
          <BtnMini @click="$router.push('/catalog')" :img="btns.get('catalog')"></BtnMini>
          <a class="header_button" href="/p/ratings/" title="Рейтинги">4<i class="fa fa-list-ol" aria-hidden="true"></i></a>

        </div>
      </div>
      <AvaComponent v-if="$router.currentRoute.value.path === '/register'" class="hm_ava_block"
                    :pageType="'reg'"
                    :img="$store.state.reg.avaLink"
      ></AvaComponent>

      <AvaComponent v-else class="hm_ava_block"
                    :img="$store.state.auth.userInfo.ava"
      ></AvaComponent>
      <!--      <div class="hm_ava_block">-->
      <!--        <img class="hm_ava_img" src="@/assets/img/ava_no_img.jpg" alt="">-->
      <!--      </div>-->
      <div class="hm_right_block">
        <div class="hm_nick_box hm_box">
          <span v-if="$store.state.auth.userInfo.NAME">{{ $store.state.auth.userInfo.NAME }}</span>
          <span v-else>Гость</span>
        </div>

        <div class="hm_btn_block hm_right">
          <a class="header_button" href="/p/faq/" title="Инструкции">1<i class="bi bi-patch-question"></i></a>
          <!--                <a class="header_button" href="/p/match/-->
          <!--" title="Ваши прогнозы"><i class="bi bi-pencil-square"></i></a>-->
          <a class="header_button" href="/p/events/" title="События">2<i class="bi bi-menu-up"></i></a>
          <a class="header_button" href="/p/profile/" title="Ваш профиль">3<i class="bi bi-person-square"></i></a>
          <BtnMini @click="logoutProfile" :img="btns.get('logout')"></BtnMini>
        </div>

      </div>
    </div>
    <div class="header_menu_block">
      <!--        <ul class="dropdown-menu">-->
      <!--            <li><a class="dropdown-item" href="/p/faq/"><i class="bi bi-patch-question"></i> Инструкции</a></li>-->
      <!--            <li><a class="dropdown-item" href="/p/matches/"><i class="bi bi-menu-up"></i> Матчи</a></li>-->
      <!--            -->
      <!--                <li><a class="dropdown-item" href="/p/admin/"><i class="fa fa-address-book" aria-hidden="true"></i> Админка</a></li>-->
      <!--            --><!--            -->
      <!--            <li><a class="dropdown-item" href="/p/match/"><i class="bi bi-pencil-square"></i> Мои прогнозы</a></li>-->
      <!--            <li><a class="dropdown-item" href="/p/profile/"><i class="bi bi-person-square"></i> Мой профиль</a></li>-->
      <!--            -->
      <!--                <li><a class="dropdown-item" href="/auth/"><i class="fa fa-sign-in" aria-hidden="true"></i> Регистрация</a></li>-->
      <!--            -->
      <!--            <li><a class="dropdown-item" href="/p/ratings/"><i class="fa fa-list-ol" aria-hidden="true"></i> Рейтинги</a></li>-->
      <!--            -->
      <!--                <li><a class="dropdown-item" href="/p/logout/"><i class="bi bi-door-open"></i> Выйти</a></li>-->
      <!--            --><!--        </ul>-->
      <ul class="dropdown-menu">
        <!--                <li><a class="dropdown-item" href="/p/match/"><i class="bi bi-pencil-square"></i> Мои прогнозы</a></li>-->
        <li>
          <div class="dropdown-item menu_events_btn" data-submenu="sub_prognos">
            <i class="bi bi-pencil-square"></i> Прогнозы <i class="bi bi-caret bi-caret-right-fill"></i>
          </div>
        </li>
        <div class="menu_events_box sub_prognos">
          <li>
            <hr class="dropdown-divider">
          </li>
          <ul class="">
            <li><a class="dropdown-item" href="/p/matches/">Футбол</a></li>
            <li><a class="dropdown-item" href="/p/f1race/">Формула 1</a></li>
            <li><a class="dropdown-item" href="/p/kvngame/">КВН</a></li>
          </ul>
          <li>
            <hr class="dropdown-divider">
          </li>
        </div>
        <li><a class="dropdown-item" href="/p/profile/"><i class="bi bi-person-square"></i> Профиль</a></li>
        <li><a class="dropdown-item" href="/p/events/"><i class="bi bi-menu-up"></i> События</a></li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <!--            <li>-->
        <!--                <div class="dropdown-item menu_events_btn" data-submenu="sub_events">-->
        <!--                    <i class="bi bi-menu-up"></i> События <i class="bi bi-caret bi-caret-right-fill"></i>-->
        <!--                </div>-->
        <!--            </li>-->
        <!--            <div class="menu_events_box sub_events">-->
        <!--            <li><hr class="dropdown-divider"></li>-->
        <!--                <ul class="">-->
        <!--                    <li><a class="dropdown-item" href="/p/match/">Футбол</a></li>-->
        <!--                    <li><a class="dropdown-item" href="/p/kvngame/">КВН</a></li>-->
        <!--                    <li><a class="dropdown-item"  href="/p/f1race/">Ф1</a></li>-->
        <!--                </ul>-->
        <!--            <li><hr class="dropdown-divider"></li>-->
        <!--            </div>-->
        <li><a class="dropdown-item" href="/p/admin/"><i class="fa fa-address-book" aria-hidden="true"></i> Админка</a>
        </li>
        <li><a class="dropdown-item" href="/p/ratings/"><i class="fa fa-list-ol" aria-hidden="true"></i> Рейтинги</a>
        </li>
        <li><a class="dropdown-item" href="/p/faq/"><i class="bi bi-patch-question"></i> Инструкции</a></li>

      </ul>
    </div>
  </div>
  <div class="nick">
    {{ $store.state.auth.userInfo.NAME }}
  </div>
  <div class="alter_btns">
    <BtnMini @click="$router.push('/ratings').then(() => { this.$router.go() })" :img="btns.get('ratings')"></BtnMini>
    <BtnMini @click="$router.push('/catalog').then(() => { this.$router.go() })" :img="btns.get('catalog')"></BtnMini>
    <BtnMini @click="logoutProfile" :img="btns.get('logout')"></BtnMini>
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
      btns: new Map([
        ['logout', require('@/assets/icon/profile/exit.svg')],
        ['catalog', require('@/assets/icon/profile/list.svg')],
        ['ratings', require('@/assets/icon/profile/shield.svg')],
      ]),
    }
  },

  computed: {
    ...mapState({
      token: state => state.auth.authData.token,
    })
  },
  mounted() {
    //
    this.$nextTick(function () {
      if (this.token) {
        // проверка токена на актуальность
        console.log('token yes')
        this.checkAuth()
      } else {
        console.log('token no')
        this.$router.push('/')
      }
    })
  },

  methods: {
    ...mapActions({
      loginRequest: 'auth/loginRequest',
      logoutVue: 'auth/logoutVue'
    }),

    logoutProfile() {
      this.logoutVue()
      this.$router.push('/')
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
  position: absolute;
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

  border-radius: 0 0 5px 5px;

  display: none;

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
      width: 128px;

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
      position: absolute;
      left: 50%;
      bottom: -55px;
      transform: translateX(-50%);
    }

    .hm_box {
      margin-bottom: 5px;
      padding: 2px 10px;
      box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), inset 0 0 0 60px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);
      //background: linear-gradient(rgb(70,70,70), rgb(120,120,120));
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