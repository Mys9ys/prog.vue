<template>
    <HeaderBlock v-if="token"></HeaderBlock>
    <router-view></router-view>
</template>

<script>

import HeaderBlock from "@/components/main/HeaderBlock";
import {mapState} from "vuex";
// import PreLoader from "@/components/main/PreLoader";


export default {
  name: 'App',
  components: {
    HeaderBlock,
    // PreLoader
  },
  metaInfo: {
    title: 'Прогносяус - сайт прогнозов на интерес',
    titleTemplate: '%s | vue-meta Example App'
  },
  computed: {
    ...mapState({
      token: state => state.auth.authData.token,
    })
  },



}
</script>

<style lang="less">
@import "src/assets/css/variables.less";
body{
  background: @BackGreenColor;
}


@font-face {
  font-family: 'Roboto';
  src: url('@/font/Roboto-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('@/font/Roboto-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('@/font/Roboto-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('@/font/Roboto-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 400px;
  max-width: 100%;
  margin: 0 auto;
  height: 100vh;
  padding: 0 5px;
  background: @BackGreenColor;
  overflow-y: scroll;
}
</style>
