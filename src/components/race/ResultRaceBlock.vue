<template>
  <div class="exist" v-if="dataBlock.exist">
    <h1>{{ dataBlock.type }}</h1>
  </div>
</template>

<script>
export default {
  name: "ResultRaceBlock",

  props: {
    racers: {
      type: Object
    },
    dataBlock: {
      type: Object
    },
    raceInfo: {
      type: Object
    },
  },
}
</script>

<style lang="less" scoped>

</style>