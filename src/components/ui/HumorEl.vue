<template>
  <div class="humor_el" v-if="id">
    <div class="text">
      {{humors[id].text}}
    </div>
    <div class="btn_block">
      <div class="like btn" @click="humors[id].likes++">Нравится ❤</div>
      <div class="like_count">{{ humors[id].likes }} ❤</div>
      <div class="send btn" @click="$router.go(0)">Следующая ↝</div>
      <div class="add btn">Добавить +</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HumorEl",
  data() {
    return {
      id: '',
      humors: [
        {text: 'Вместо подачи он сделал непонятно что.', likes: 6},
        {text: 'Всем активно это не нравится.', likes: 12},
        {text: 'Глядишь, сегодня и раскроется его звезда.', likes: 21},
        {text: '"Стенка" сборной Японии походила на Великую китайскую стену.', likes: 11},
        {text: 'Охрана на трибунах работает хорошо, судье ничего не угрожает, и он может показывать все, что ему захочется.', likes: 8},
        {text: '"Локомотив" выглядит задумчивой командой.', likes: 17},
      ]
    }
  },

  mounted() {
    this.$nextTick(function () {

        console.log('mounted humor')
      this.generateId()


    })
  },
  methods:{
    generateId(){
      this.id = Math.ceil(Math.random() * (this.humors.length-1));
    }
  }
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
  padding-right: 32px;
  border-radius: 5px;

  gap: 4px;

  margin-bottom: 4px;
  text-align: right;

  .text {
    .shadow_inset;
    text-align: left;
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

    &:hover {
      opacity: 0.8;
    }
  }

  .like_count {
    .shadow_inset;
    .flex_center;
    font-size: 12px;
  }
}

</style>