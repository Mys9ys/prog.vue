<template>
  <div class="select_wrapper">
    <select v-if="arRating">
      <option v-for="(id) in selectMatch(arRating)" :value="id" :key="id">Матч №: {{id}}</option>
    </select>


  </div>
</template>

<script>
export default {
  name: "SelectBlockRating",
  props: {
    arRating: {
      type: Object
    },
    matchNumber:{
      type: Array
    }
  },
  data(){
    return{
      matchNumbers: []
    }
  },

  // mounted() {
  //   this.checkIds()
  // },

  methods: {
    selectMatch(arRating){
      this.matchNumbers = Object.keys(arRating || {})

      return this.matchNumbers.reverse()
    },
  }
}
</script>

<style lang="less" scoped>

</style>