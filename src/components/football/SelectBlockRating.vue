<template>
  <div class="select_wrapper">
    <select v-if="arRating" v-model="selected">
      <option v-for="(id) in matchNumbers" :value="id" :key="id">Матч №: {{id}}</option>
    </select>
    <div v-for="(data, index) in arRating" :key="index">
      <div v-if="selected==index">
        <table class="table table-dark table-hover rating_table_box">
          <thead>
          <tr>
            <th class="pr_table_col">#</th>
            <th class="pr_table_col">Δ</th>
            <th class="pr_table_col">Ник</th>
            <th class="pr_table_col">Баллы</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(el) in data" :key="el.id">
            <td class="pr_table_col">{{el.place}}</td>
            <td class="pr_table_col" v-if="el.diff === 0"><div class="zero_diff">–</div></td>
            <td class="pr_table_col" v-else-if="el.diff >0"><div class="plus_diff">{{el.diff}}</div></td>
            <td class="pr_table_col" v-else-if="el.diff <0"><div class="minus_diff">{{el.diff}}</div></td>
            <td class="pr_table_col">{{el.user.name}}</td>
            <td class="pr_table_col">{{el.score}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectBlockRating",
  props: {
    arRating: {
      type: Object
    },
  },
  data(){
    return{
      matchNumbers: [],
      selected: ''
    }
  },

  // mounted() {
  //   this.checkIds()
  // },

  watch:{
    arRating(){
      this.selectMatch(this.arRating)
    }
  },

  methods: {
    selectMatch(arRating){
      this.matchNumbers = Object.keys(arRating || {})

      this.selected = this.matchNumbers.length

      return this.matchNumbers.reverse()
    },
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.rating_table_box{
  th,td{
    padding: 2px;
    text-align: left;
  }
}
.zero_diff{
  min-width: 20px;
  color: @pearl;
  font-size: 16px;
  font-weight: 700;
}
.plus_diff{
  color: @YesWrite;
}
.minus_diff{
  color: @red;
}
</style>