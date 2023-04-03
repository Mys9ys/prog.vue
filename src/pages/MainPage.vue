<template>
  <div class="wrapper">
    <div class="title_block">
      <h2>Прогносяус</h2>
      <p>Сайт прогнозов на спортивные и не очень события</p>
    </div>
    <div class="btn_block">
      <FillBtn >Зарегистрироваться</FillBtn>
      <TransparentBtn>Войти</TransparentBtn>
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
.wrapper {
  position: relative;
  background: #FFFFFF;
  background: #151521;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  text-align: center;
  padding: 20px;

  .title_block{
    padding: 6px;
    color: rgb(225,225,225);
    border-radius: 7px;
    margin-bottom: 45px;
    background:#2B2B40;

    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .btn_block{
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>