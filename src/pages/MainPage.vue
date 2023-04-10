<template>
  <div class="wrapper">
    <div class="title_wrapper">
      <div class="title_block">
        <h2>Прогносяус</h2>
        <div>Сайт прогнозов на спортивные и не очень события</div>
      </div>
    </div>
    <div class="btn_block">
      <FillBtn @click="$router.push('/register')">Зарегистрироваться</FillBtn>
      <TransparentBtn @click="$router.push('/auth')">Войти</TransparentBtn>
    </div>

  </div>
</template>

<script>
import FillBtn from "@/components/ui/btn/FillBtn";
import TransparentBtn from "@/components/ui/btn/TransparentBtn";

export default {
  name: "MainPage",
  components: {
    FillBtn,
    TransparentBtn
  }

}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.wrapper {

  position: relative;
  width: 400px;
  max-width: 100%;
  margin: 0 auto;
  height: 100vh;
  text-align: center;
  padding: 20px;
  .title_wrapper{
    background: @DarkColorBG;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 35px;
    .title_block {
      color: @colorText;
      border-radius: 7px;
      background: @backGrey;
      box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), inset 0 0 0 60px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);
    }
  }


  .btn_block {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

}
</style>