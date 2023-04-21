<template>
  <div class="select_wrapper">
    <select v-if="arRating" v-model="selected">
      <option v-for="(id) in matchNumbers" :value="id" :key="id">Матч №: {{id}}</option>
    </select>
    <div v-for="(data, index) in arRating" :key="index">
      <div v-if="selected==index">{{data}}</div>
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

</style>