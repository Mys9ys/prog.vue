<template>
  <div class="humor_el" v-if="prank">
    <div class="header">
      <div class="author like_count"><b>Добавил: </b> Mys9ysilii</div>
      <div class="like_count">{{ prank.seen ?? 0}} 👁</div>
      <div class="like_count">{{ prank.likes ?? 0}} ❤</div>
    </div>
    <div class="text">
      {{prank.PREVIEW_TEXT}}
    </div>
    <div class="btn_block">
      <div class="send btn" @click="getNextPrank">Следующая ↝</div>
      <div class="add btn">Добавить +</div>

      <div class="like btn" @click="setLikes(prank.ID)" v-if="!like">Нравится ❤</div>
      <div class="like btn" @click="dropLikes(prank.ID)" v-else>Не нравится 💔</div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "HumorEl",
  data() {
    return {
     like: false
    }
  },

  mounted() {
    this.$nextTick(function () {

        console.log('mounted humor')
      this.getPrank()


    })
  },
  methods:{
    ...mapActions({
      getOnePrank: 'humor/getOnePrank',
    }),

    getNextPrank(){
      this.getPrank()
    },

    setLikes(id){
      this.prank.likes++
      this.like = !this.like
      console.log('id', id)
    },

    dropLikes(id){
      this.prank.likes--
      this.like = !this.like
      console.log('id', id)
    },

    async getPrank(){
      await this.getOnePrank()
    }
  },

  computed: {
    ...mapState({
      prank: state => state.humor.prank,
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.humor_el {
  position: relative;
  background: @cubersport;
  color: @colorText;
  display: flex;
  flex-direction: column;

  padding: 4px;
  border-radius: 5px;

  gap: 4px;

  margin-bottom: 4px;
  text-align: right;

  .text {
    .shadow_inset;
    text-align: left;
  }
}

.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4px;
  padding-right: 28px;

  .like_count {
    .shadow_inset;
    .flex_center;
    font-size: 12px;
    gap: 2px;
    padding: 3px 4px;
    min-width: 36px;
  }
}

.humor_el:after {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  top: 0%;
  right: 0%;
  border-top: 28px solid @YesWrite;
  border-left: 28px solid @backGrey;
}

.btn_block {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4px;
  padding: 2px 0;

  .btn {
    color: @colorText;
    display: inline;
    padding: 3px 8px;
    border-radius: 5px;
    .shadow_template;
    cursor: pointer;
    font-size: 12px;
    min-width: 105px;

    &:hover {
      opacity: 0.8;
    }
  }


}

</style>