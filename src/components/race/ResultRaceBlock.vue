<template>
  <div class="exist" v-if="dataBlock.exist">
    <div class="title_wrapper">
      <div class="title">{{dataBlock.title}}. Результат.</div>
    </div>
    <table class="table table-dark table-hover race_table_box" v-if="result">
      <thead>
      <tr>
        <th class="pr_table_col">№</th>
        <th class="pr_table_col">Протокол</th>
        <th class="pr_table_col">Ставка</th>
        <th class="pr_table_col">Баллы</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(el, place) in result"  :key="place">
        <td class="pr_table_col"><div>{{place+1}}</div></td>
        <td class="pr_table_col">
          <RacerItem
              :place="place"
              :item="racers[el]"
          ></RacerItem>
        </td>
        <td class="pr_table_col">
          <RacerItem
              v-if="racers[prognosis[place]]"
              :place="place"
              :item="racers[prognosis[place]]"
              :score = "dataBlock.type + String(score[place]).replace('.', '-')"
          ></RacerItem>
          <div v-else>не заполнено</div>
        </td>
        <td class="pr_table_col"><div>{{score[place]}}</div></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import RacerItem from "@/components/race/RacerItem";

export default {
  name: "ResultRaceBlock",
  components: {
    RacerItem
  },
  props: {
    dataBlock: {
      type: Object
    },
    racers: {
      type: Object
    },
    prognosis: {
      type: Object
    },
    result: {
      type: Object
    },
    score: {
      type: Object
    },
    raceInfo: {
      type: Object
    },
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.title_wrapper{
  display: flex;
  flex-direction: row;
  gap: 4px;
  background: @DarkColorBG;
  color: @colorText;
  padding: 4px;
  border-radius: 5px;

  .title{
    .shadow_inset;
    .flex_center;
  }
}

.race_table_box {
  border-radius: 5px;

  th, td {
    padding: 2px;
    font-size: 12px;
    text-align: left;
  }
  .td{
    //.flex_center;
  }

}
</style>