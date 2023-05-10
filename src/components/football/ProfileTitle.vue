<template>
    <div class="title_block">
      <img class="event_img" :src="url+info.img" alt="">
      <div class="title_mini">{{info.PREVIEW_TEXT}}</div>
    </div>
</template>

<script>
export default {
  name: "ProfileTitle",
  props:{
    info: {
      type: Object
    }
  },
  data() {
    return {
      url:  'https://prognos9ys.ru/',
      profileLoader: false
    }
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
  .title_block{
    background: @DarkColorBG;
    padding: 4px;
    border-radius: 5px;
    color: @colorText;
    margin-top: 5px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 4px;

    .event_img{
      .shadow_inset;
      width: 25px;
      background: @colorBlur;

    }
    .title_mini{
      .shadow_inset;
    }

  }
</style>