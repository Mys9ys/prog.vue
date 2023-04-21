<template>
  <div class="select_wrapper">
    <select>
      <option v-for="(el,id) in arRating" :value="id" :key="id">{{id}}</option>

    </select>
    {{matchNumbers}}
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

  mounted() {
    this.checkIds()
  },

  methods: {
    checkIds(){
      this.matchNumbers = Object.keys(this.arRating || {})

      console.log(this.matchNumbers)
    }
  }
}
</script>

<style lang="less" scoped>

</style>