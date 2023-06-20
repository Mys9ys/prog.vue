<template>
    <div class="title_wrapper">
      <div class="title">{{title}}</div>
    </div>


</template>

<script>
export default {
  name: "ProfileRaceBody",
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.title_wrapper{
  background: @DarkColorBG;
  padding: 4px;
  border-radius: 5px;
  color: @colorText;
  margin-top: 8px;
  .title{
    .shadow_inset;
  }
}
</style>