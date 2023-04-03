<template>
  <div class="btns">
    <div class="kgb_status no_write">не заполнено</div>
    <a class="kgb_write_btn" @click="$router.push('/kvn/'+number+'/')"> Заполнить <i class="bi bi-pencil"></i></a>
  </div>
</template>

<script>
export default {
  name: "GameBtns",
  props: {
    number: {
      type: String,
    }
  }
}
</script>

<style lang="less" scoped>
@blockBG: #253133;
@colorText: #fff;
@colorText2: #228B22;
@qatar: #8a1538;
@nowrite: rgb(13, 202, 240);
@yeswrite: #146c43;
@color: rgb(240, 240, 240);
@colorBlur: #A6B2AA;

@darkbg: rgb(25, 25, 25);
.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .kgb_status {
    background: @darkbg;
    padding: 4px 6px;
    color: @colorBlur;
    border-radius: 5px;
    box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), inset 0 0 0 2px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);
    font-size: 11px;

    &.no_write {
      color: @nowrite;
    }

    &.yes_write {
      color: @yeswrite;
    }
  }

  .kgb_write_btn {
    background: @colorText2;
    color: @colorText;
    cursor: pointer;
    box-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 -1px 0 rgba(0, 0, 0, .2);
    padding: 2px 5px;
    font-size: 13px;
    margin-top: 1px;
    border-radius: 3px;
    //min-width: 22px;
    text-align: center;
    text-decoration: none;

    &:hover {
      background: @colorText;
      color: @colorText2;
    }
  }

  .kgb_watch {
    background: @nowrite;

    &:hover {
      background: @colorText;
      color: @nowrite;
    }
  }
}
</style>