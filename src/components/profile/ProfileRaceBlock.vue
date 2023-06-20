<template>
  <div class="title_box">
    <ProfileTitle v-for="(arr, index) in events"
                  @click="setActiveEvent(index)"
                  :info="arr.info"
                  :active="index === activeEvent"
                  :count="Object.keys(arr.items).length"
                  :class="{'active': index === activeEvent}"
                  :key="index"></ProfileTitle>
  </div>
  <div class="body_block"  v-for="(arr, index) in events"
       :key="index">

  </div>
</template>

<script>
import ProfileTitle from "@/components/football/ProfileTitle";

export default {
  name: "ProfileRaceBlock",
  components: {
    ProfileTitle
  },
  props: {
    events: {
      type: Object
    }
  },
  data(){
    return{
      activeEvent: ''
    }
  },

  methods: {

    setActiveEvent(id) {
      this.activeEvent = id
    },
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.title_wrapper{
  background: @DarkColorBG;
  padding: 4px;
  border-radius: 5px;
  color: @colorText;
  margin-top: 25px;
  .title{
    .shadow_inset;
  }
}

.title_box{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
}
</style>