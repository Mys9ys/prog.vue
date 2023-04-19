<template>
  <div class="body_wrapper">

    {{arRating}}
  </div>
</template>

<script>
export default {
  name: "FootballRatingBody",
  props: {
    arRating: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.body_wrapper{
  width: 100%;
  background: @DarkColorBG;
  color: @colorText;
}
</style>