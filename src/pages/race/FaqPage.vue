<template>
  <div class="faq_wrapper">
    <PageHeader class="header">Правила</PageHeader>
    <div class="title_wrapper">
      <div class="title">Правила и инструкции</div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/main/PageHeader";

export default {
  name: "FaqPage",
  components: {
    PageHeader
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.faq_wrapper{
  .title_wrapper{
    background: @DarkColorBG;
    padding: 4px;
    border-radius: 5px;
    color: @colorText;
    margin-top: 5px;
    .title{
      .shadow_inset;
    }
  }
}
</style>