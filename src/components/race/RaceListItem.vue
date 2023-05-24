<template>
  <div class="item_block">
    <div class="foto img">
      <img :src="urlImg + item.img" alt="">
    </div>
    <div class="country img">
      <img :src="urlImg + item.country.flag" alt="">
    </div>
    <div class="name">
      {{Array.from(item.NAME)[0]}}. {{item.NAME.split(' ')[1]}}
    </div>
  </div>
</template>

<script>
export default {
  name: "RaceListItem",
  props: {
    item: {
      type: Object
    }
  },
  data(){
    return{
      urlImg: 'https://prognos9ys.ru/',
    }
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.item_block{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  border-radius: 5px;

  background: @hockei;

  .shadow_template;

  .img{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 24px;
    height: 24px;

    padding: 2px;

    img{
      width: 100%;
      border-radius: 5px;
    }
  }

  .name{
    font-size: 12px;
  }
}
</style>