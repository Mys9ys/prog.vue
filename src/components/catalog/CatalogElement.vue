<template>
  <div class="el_event">
    <div class="img_box">
      <div class="lamp" :class=[element.status]></div>
      <img :src="url+element.img" alt="">
    </div>
    <div class="name">{{element.NAME}}</div>
    <div class="btn" @click="$router.push('/'+code+ '/' +element.ID)">
      <img src="@/assets/icon/btn/arrow.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "CatalogElement",
  data() {
    return {
      url: 'https://prognos9ys.ru/',
    }
  },
  props: {
    element: {
      type: Object
    },
    code: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.el_event {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 4px;
  color: @darkbg;
  border-radius: 5px;
  text-align: left;
  gap: 2px;

  .img_box{
    position: relative;
    .shadow_inset;
    .flex_center;
    max-width: 55px;
    height: 55px;
    background: @colorText;
    img{
      width: 100%;
    }
    padding: 5px;
  }
  .name{
    background: @colorText;
    .shadow_inset;
    .flex_center;
    width: 88%;
    justify-content: left;
  }

  .btn{
    background: @DarkColorBG;
    .shadow_inset;
    .flex_center;
    width: 7%;
    padding: 4px;
    img{
      width: 100%;
    }
  }
}
.lamp{
  position: absolute;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 5px;
  box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);
  background: @green;
  border-radius: 50%;

  &.old{
    background: @red;
  }
}
</style>