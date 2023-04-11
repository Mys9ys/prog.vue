<template>
  <div class="match_box">
    <div class="left_block">
      <div class="number"># 17</div>
      <div class="time">22:00</div>
    </div>
    <div class="team_block">
      <div class="team">
        <div class="flag">ff</div>
        <div class="name">Манчестер Сити</div>
        <div class="score">0</div>
      </div>
      <div class="team">
        <div class="flag">ff</div>
        <div class="name">Бавария</div>
        <div class="score">0</div>
      </div>
    </div>
    <div class="right_block">
      <!--      <div class="send_info">не заполнено</div>-->
      <div class="send_info">заполнено 10.04 12:00</div>
      <div class="btn_box">
        <div class="more_btn" @click="moreInfo = !moreInfo"><span :class="{'close' : !moreInfo, 'open' : moreInfo}"> > </span></div>
        <div class="match_btn" @click="$router.push('/football/1/1')">Заполнить</div>
      </div>
    </div>
  </div>
  <div class="more_info" v-if="moreInfo">
    <p>vczxvzxvc</p>
  </div>
</template>

<script>
export default {
  name: "EventMatch",
  data(){
    return {
      moreInfo: false
    }
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.shadow_inset{
  box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), inset 0 0 0 60px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);
  padding: 0 4px;
  border-radius: 3px;
}


.match_box{
  display: flex;
  flex-direction: row;
  gap: 4px;
  background: @DarkColorBG;
  color: @colorText;
  padding: 4px;
  border-radius: 5px;
  margin-bottom: 4px;

  .left_block{
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 13%;
    max-width: 51px;
    .number{
      .shadow_inset;
    }
    .time{
      .shadow_inset;
    }
  }

  .team_block{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 4px;
    width: 61%;
    max-width: 238px;
    .team{
      display: flex;
      flex-direction: row;
      gap: 4px;
      .flag{
        width: 13%;
        max-width: 24px;
        .shadow_inset;
      }
      .name{
        text-align: left;
        .shadow_inset;
        width: 80%;
        max-width: 194px;
      }
      .score{
        .shadow_inset;
        width: 13%;
        max-width: 24px;
      }
    }
  }

  .right_block{
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 25%;
    max-width: 99px;

    .send_info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 24px;
      line-height: 10px;
      .shadow_inset;
      font-size: 10px;
      color: @NoWrite;
    }

    .btn_box{
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 24px;
      gap: 4px;

      .more_btn{
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 24px;
        height: 24px;
        width: 24%;
        background: @dark;
        padding: 2px 2px;
        border-radius: 3px;
        cursor: pointer;
        box-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 -1px 0 rgba(0, 0, 0, .2);
        .close{
          transform: rotate(90deg);
        }
        .open{
          transform: rotate(-90deg);
        }
        &:hover{
          background: @colorText;
          color: @dark;
          border: 1px solid @dark;
        }
      }
      .match_btn{
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: @colorText2;
        color: @colorText;
        cursor: pointer;
        box-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 -1px 0 rgba(0, 0, 0, .2);
        padding: 2px 2px;
        font-size: 10px;
        border-radius: 3px;
        text-align: center;
        border: 1px solid transparent;
        text-decoration: none;
        width: 76%;
        max-width: 75px;

        &:hover{
          background: @colorText;
          color: @colorText2;
          border: 1px solid @colorText2;
        }
      }
    }
  }
}
.more_info{
  width: 100%;
  background: @DarkColorBG;
}
</style>