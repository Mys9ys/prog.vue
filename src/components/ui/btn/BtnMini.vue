<template>
  <div class="btn_mini">
    <img :src="img" alt="">
  </div>
</template>

<script>
export default {
  name: "BtnMini",
  props: {
    img:{
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
  .btn_mini{
    display: inline-block;
    background: @YesWrite;
    color: @colorText;
    cursor: pointer;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4), 0 -1px 0 rgba(0, 0, 0, 0.2);
    padding: 3px;
    border-radius: 3px;
    min-width: 22px;
    text-align: center;
    img{
      width: 16px;
      height: 16px;
    }
  }
</style>