<template>
  <div class="select_wrapper">
    <select>
      <option v-for="(el,id) in arRating" :value="id" :key="id">{{id}}</option>

    </select>
    {{this.matchNumbers}}
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
      type: Object
    }
  },
  data(){
    return{
      // matchNumbers: Object.keys(this.arRating || {})
    }
  }
}
</script>

<style lang="less" scoped>

</style>