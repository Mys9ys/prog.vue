<template>
  <HeaderMys></HeaderMys>
  <router-view></router-view>
</template>

<script>

import HeaderMys from "@/components/main/HeaderMys";

export default {
  name: 'App',
  components: {
    HeaderMys
  }
}
</script>

<style lang="less">
@blue: rgb(61,123,250);
@red: rgb(255,92,92);
@green: rgb(57,218,138);
@orange: rgb(253,172,65);
@yellow: rgb(254,221,73);

@pearl: rgb(116,224,230);
@purple: rgb(172,92,217);

@dark: rgb(85,88,112);
@ligth: rgb(242,242,244);

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
  background: #2E8B57;
  width: 400px;
  max-width: 100%;
  margin: 0 auto;
}
</style>
