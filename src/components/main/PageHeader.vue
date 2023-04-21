<template>
  <div>
    <div class="header_block">
      <div class="block_title">
        <slot></slot>
      </div>
      <div v-if="path" class="btn_prev" @click="$router.push(path).then(() => { this.$router.go() })">Назад</div>
      <div v-else class="btn_prev" @click="$router.go(-1)">Назад</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    path: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/variables.less";
  .header_block{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .block_title{
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height, or 138% */

      letter-spacing: -0.408px;

      /* Черный */
      color: @darkbg;
    }
    .btn_prev{
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      /* identical to box height, or 157% */

      text-align: right;
      letter-spacing: -0.408px;

      /* Серый */
      color: @colorBack
    }
  }
</style>