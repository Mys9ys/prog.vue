<template>
  <div class="wrapper">
    <div class="title_block">
      <h2>Прогносяус</h2>
      <p>Сайт прогнозов на спортивные и не очень события</p>
    </div>
    <div class="btn_block">
      <FillBtn @click="$router.push('/auth')">Зарегистрироваться</FillBtn>
      <TransparentBtn @click="$router.push('/register')">Войти</TransparentBtn>
    </div>

    <div class="buttons">
      <a  title='Title 1'>
        &#x2606;
      </a>
      <a class='active' title='Title 2'>
        &#x262F;
      </a>
      <a  title='Title 3'>
        &#x2666;
      </a>
      <a  title='Title 4'>
        &#x267A;
      </a>
    </div>

    <div class="new_button">
      <a class="push_button red">Push the button</a>
      <a class="push_button blue">Push the button</a>
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
  background: #1c1c27;
  background: #001928;
  background: #253133;


  width: 400px;
  max-width: 100%;
  margin: 0 auto;
  height: 100vh;
  text-align: center;
  padding: 20px;

  .title_block {
    padding: 6px;
    //color: rgb(225,225,225);
    //color: #33333e;
    color: #e7e7e7;
    border-radius: 7px;
    margin-bottom: 45px;
    //background:#28293d;
    //background:#01213a;
    //background:#001928;
    background: #212529;
    //box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);
    //box-shadow: 0 2px 4px rgba(45, 45, 45, .2);
    //box-shadow: 0 2px 4px rgba(77,75,76, 0.3);

    box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), inset 0 0 0 60px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);

    //backdrop-filter: blur(20px);
    //-webkit-backdrop-filter: blur(20px);
  }

  .btn_block {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }


  .buttons a {
    -webkit-animation: bounceInDown 900ms 200ms ease-in-out both;
    -moz-animation: bounceInDown 900ms 200ms ease-in-out both;
    -ms-animation: bounceInDown 900ms 200ms ease-in-out both;
    -o-animation: bounceInDown 900ms 200ms ease-in-out both;
    animation: bounceInDown 900ms 200ms ease-in-out both;
    width: 50px;
    height: 33px;
    position: absolute;
    top: 0;
    text-decoration: none;
    padding-top: 9px;
    outline-width: 0px;
    z-index: 990;
    color: #a675b3;
    text-align: center;
    line-height: 26px;
    display: block;
  }

  .buttons a:not(.active) {
    -webkit-box-shadow: inset 0 1px 1px rgba(111, 55, 125, 0.8), inset 0 -1px 0px rgba(63, 59, 113, 0.2), 0 9px 16px 0 rgba(0, 0, 0, 0.3), 0 4px 3px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px #150a1e;
    -moz-box-shadow: inset 0 1px 1px rgba(111, 55, 125, 0.8), inset 0 -1px 0px rgba(63, 59, 113, 0.2), 0 9px 16px 0 rgba(0, 0, 0, 0.3), 0 4px 3px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px #150a1e;
    box-shadow: inset 0 1px 1px rgba(111, 55, 125, 0.8), inset 0 -1px 0px rgba(63, 59, 113, 0.2), 0 9px 16px 0 rgba(0, 0, 0, 0.3), 0 4px 3px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px #150a1e;
    background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #3b2751), color-stop(100%, #271739));
    background-image: -webkit-linear-gradient(#3b2751, #271739);
    background-image: -moz-linear-gradient(#3b2751, #271739);
    background-image: -o-linear-gradient(#3b2751, #271739);
    background-image: linear-gradient(#3b2751, #271739);
    text-shadow: 0 0 21px rgba(223, 206, 228, 0.5), 0 -1px 0 #311d47;
  }

  .buttons a:not(.active):hover, .buttons a:not(.active):focus {
    -webkit-transition: color 200ms linear;
    -moz-transition: color 200ms linear;
    -o-transition: color 200ms linear;
    transition: color 200ms linear;
    -webkit-transition: text-shadow 500ms linear;
    -moz-transition: text-shadow 500ms linear;
    -o-transition: text-shadow 500ms linear;
    transition: text-shadow 500ms linear;
    color: #caadd2;
    text-shadow: 0 0 21px rgba(223, 206, 228, 0.5), 0 0 10px rgba(223, 206, 228, 0.4), 0 0 2px #2a153c;
  }

  .buttons a:not(.active):active {
    color: #e4e3ce !important;
  }

  .buttons a.active, .buttons a:active {
    -webkit-box-shadow: 0 9px 16px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px #170c22, 0 2px 1px 0 rgba(121, 65, 135, 0.5), inset 0 0 4px 3px rgba(15, 8, 22, 0.2);
    -moz-box-shadow: 0 9px 16px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px #170c22, 0 2px 1px 0 rgba(121, 65, 135, 0.5), inset 0 0 4px 3px rgba(15, 8, 22, 0.2);
    box-shadow: 0 9px 16px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px #170c22, 0 2px 1px 0 rgba(121, 65, 135, 0.5), inset 0 0 4px 3px rgba(15, 8, 22, 0.2);
    background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #1f132e), color-stop(100%, #311d47));
    background-image: -webkit-linear-gradient(#1f132e, #311d47);
    background-image: -moz-linear-gradient(#1f132e, #311d47);
    background-image: -o-linear-gradient(#1f132e, #311d47);
    background-image: linear-gradient(#1f132e, #311d47);
    text-shadow: 0 0 21px rgba(223, 206, 228, 0.5), 0 0 10px rgba(223, 206, 228, 0.4), 0 0 2px #2a153c;
    color: #e4e3ce;
  }

  .buttons a.active:before, .buttons a:active:before {
    position: absolute;
    display: block;
    content: "";
    width: 1px;
    height: 36px;
    top: 1px;
    left: -2px;
    background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, rgba(91, 35, 105, 0)), color-stop(41%, #5b2369), color-stop(59%, #5b2369), color-stop(100%, rgba(91, 35, 105, 0)));
    background-image: -webkit-linear-gradient(rgba(91, 35, 105, 0), #5b2369 41%, #5b2369 59%, rgba(91, 35, 105, 0));
    background-image: -moz-linear-gradient(rgba(91, 35, 105, 0), #5b2369 41%, #5b2369 59%, rgba(91, 35, 105, 0));
    background-image: -o-linear-gradient(rgba(91, 35, 105, 0), #5b2369 41%, #5b2369 59%, rgba(91, 35, 105, 0));
    background-image: linear-gradient(rgba(91, 35, 105, 0), #5b2369 41%, #5b2369 59%, rgba(91, 35, 105, 0));
    -webkit-box-shadow: -2px 0 6px 0 #5b2369;
    -moz-box-shadow: -2px 0 6px 0 #5b2369;
    box-shadow: -2px 0 6px 0 #5b2369;
  }

  .buttons a.active:after, .buttons a:active:after {
    position: absolute;
    display: block;
    content: "";
    width: 1px;
    height: 36px;
    top: 1px;
    right: -2px;
    background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, rgba(91, 35, 105, 0)), color-stop(41%, #5b2369), color-stop(59%, #5b2369), color-stop(100%, rgba(91, 35, 105, 0)));
    background-image: -webkit-linear-gradient(rgba(91, 35, 105, 0), #5b2369 41%, #5b2369 59%, rgba(91, 35, 105, 0));
    background-image: -moz-linear-gradient(rgba(91, 35, 105, 0), #5b2369 41%, #5b2369 59%, rgba(91, 35, 105, 0));
    background-image: -o-linear-gradient(rgba(91, 35, 105, 0), #5b2369 41%, #5b2369 59%, rgba(91, 35, 105, 0));
    background-image: linear-gradient(rgba(91, 35, 105, 0), #5b2369 41%, #5b2369 59%, rgba(91, 35, 105, 0));
    -webkit-box-shadow: 2px 0 6px 0 #5b2369;
    -moz-box-shadow: 2px 0 6px 0 #5b2369;
    box-shadow: 2px 0 6px 0 #5b2369;
  }

  .buttons a.active {
    z-index: 1000;
  }

  .buttons a:active {
    z-index: 999;
  }

  .buttons a:last-of-type {
    -webkit-border-radius: 0 7px 7px 0;
    -moz-border-radius: 0 7px 7px 0;
    -ms-border-radius: 0 7px 7px 0;
    -o-border-radius: 0 7px 7px 0;
    border-radius: 0 7px 7px 0;
  }

  .buttons a:first-of-type {
    -webkit-border-radius: 7px 0 0 7px;
    -moz-border-radius: 7px 0 0 7px;
    -ms-border-radius: 7px 0 0 7px;
    -o-border-radius: 7px 0 0 7px;
    border-radius: 7px 0 0 7px;
    left: 0;
  }

  .buttons a:nth-of-type(2) {
    left: 51px;
  }

  .buttons a:nth-of-type(3) {
    left: 102px;
  }

  .buttons a:nth-of-type(4) {
    left: 153px;
  }

  .buttons a:nth-of-type(5) {
    left: 204px;
  }

  .buttons a:nth-of-type(6) {
    left: 255px;
  }

  .buttons a:nth-of-type(7) {
    left: 306px;
  }

  .buttons a:nth-of-type(8) {
    left: 357px;
  }

  .buttons a i:before {
    margin-left: 2px;
    font-size: 22px;
  }

  .buttons a i.icon-bar-chart:before {
    font-size: 20px;
    margin-top: 0px;
  }

  .buttons a i.icon-sync:before {
    font-size: 20px;
    margin-left: 3px;
    margin-top: 1px;
  }

  .buttons a i.icon-download:before {
    font-size: 19px;
    margin-top: 1px;
    margin-left: 4px;
  }

  .red {
    text-shadow:-1px -1px 0 #A84155;
    background: #D25068;
    border:1px solid #D25068;

    background-image:-webkit-linear-gradient(top, #F66C7B, #D25068);
    background-image:-moz-linear-gradient(top, #F66C7B, #D25068);
    background-image:-ms-linear-gradient(top, #F66C7B, #D25068);
    background-image:-o-linear-gradient(top, #F66C7B, #D25068);
    background-image:linear-gradient(to bottom, #F66C7B, #D25068);

    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;

    -webkit-box-shadow:0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset, 0 4px 0 #AD4257, 0 4px 2px rgba(0, 0, 0, .5);
    -moz-box-shadow:0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset, 0 4px 0 #AD4257, 0 4px 2px rgba(0, 0, 0, .5);
    box-shadow:0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset, 0 4px 0 #AD4257, 0 4px 2px rgba(0, 0, 0, .5);
  }

  .red:hover {
    background: #F66C7B;
    background-image:-webkit-linear-gradient(top, #D25068, #F66C7B);
    background-image:-moz-linear-gradient(top, #D25068, #F66C7B);
    background-image:-ms-linear-gradient(top, #D25068, #F66C7B);
    background-image:-o-linear-gradient(top, #D25068, #F66C7B);
    background-image:linear-gradient(top, #D25068, #F66C7B);
  }

  .blue {
    text-shadow:-1px -1px 0 #2C7982;
    background: #3EACBA;
    border:1px solid #379AA4;
    background-image:-webkit-linear-gradient(top, #48C6D4, #3EACBA);
    background-image:-moz-linear-gradient(top, #48C6D4, #3EACBA);
    background-image:-ms-linear-gradient(top, #48C6D4, #3EACBA);
    background-image:-o-linear-gradient(top, #48C6D4, #3EACBA);
    background-image:linear-gradient(top, #48C6D4, #3EACBA);

    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;

    -webkit-box-shadow:0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset, 0 4px 0 #338A94, 0 4px 2px rgba(0, 0, 0, .5);
    -moz-box-shadow:0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset, 0 4px 0 #338A94, 0 4px 2px rgba(0, 0, 0, .5);
    box-shadow:0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset, 0 4px 0 #338A94, 0 4px 2px rgba(0, 0, 0, .5);
  }

  .blue:hover {
    background: #48C6D4;
    background-image:-webkit-linear-gradient(top, #3EACBA, #48C6D4);
    background-image:-moz-linear-gradient(top, #3EACBA, #48C6D4);
    background-image:-ms-linear-gradient(top, #3EACBA, #48C6D4);
    background-image:-o-linear-gradient(top, #3EACBA, #48C6D4);
    background-image:linear-gradient(top, #3EACBA, #48C6D4);
  }
}
</style>