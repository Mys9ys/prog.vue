<template>
  <PreLoader v-if="loader"></PreLoader>
  <PageHeader class="header" :path="'/race/' + $route.params.event">Гонка № {{ $route.params.number }}</PageHeader>

  <div class="item_wrapper" v-if="item">
    <div class="item_title">
      <div class="number title_cell"># {{ item.number }}</div>
      <div class="date title_cell">&#128197; {{ item.qual.date }}</div>
      <div class="time title_cell">&#128344; {{ item.qual.time }}</div>
    </div>

    <div class="item_name">
      <div class="box">
        <div class="name_cell">Гран-при</div>
        <div class="name_cell">{{ item.name }}</div>
      </div>
      <div class="box">
        <div class="name_cell">{{ item.country.NAME }}</div>
        <div class="name_cell flag_cell">
          <img :src="urlImg + item.country.flag" alt="">
        </div>
      </div>
    </div>
      <RacerSelectBlock
          v-for="(el, index) in progBlocks"
          :key="index"
          :dataBlock="el"
          :racers="item.racers"
          :raceInfo="raceInfo">
      </RacerSelectBlock>
  </div>

</template>

<script>
import PageHeader from "@/components/main/PageHeader";
import {mapActions, mapState} from "vuex";
import PreLoader from "@/components/main/PreLoader";
import RacerSelectBlock from "@/components/race/RacerSelectBlock";

export default {
  name: "RacePage",
  components: {
    RacerSelectBlock,
    PageHeader,
    PreLoader,
  },
  data() {
    return {
      urlImg: 'https://prognos9ys.ru/',
      loader: false,

      progBlocks: [
        {title: 'квалификацию', type: 'qual', count: 10, active: true},
        {title: 'гонку', type: 'race', count: 10, active: false},
      ],
      raceInfo: {}
    }
  },

  created() {
    this.fillElem()
  },
  watch: {
    item() {
      this.loader = false

      this.raceInfo['race_id'] = this.item.id
      this.raceInfo['number'] = this.item.number
      this.raceInfo['events'] = this.item.event
      if(this.item.send_date) this.raceInfo['fill'] = this.item.send_date
      this.raceInfo['userToken'] = this.token
    }
  },

  methods: {
    ...mapActions({
      getOneElement: 'race/getOneElement',
    }),

    async fillElem() {

      this.loader = true

      this.queryEvent.number = this.$route.params.number
      this.queryEvent.events = this.$route.params.event
      this.queryEvent.userToken = this.token

      await this.getOneElement()

    },
  },

  computed: {
    ...mapState({
      token: state => state.auth.authData.token,
      queryEvent: state => state.race.queryEvent,
      item: state => state.race.oneRace,
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.item_wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item_title {
  display: flex;
  flex-direction: row;
  gap: 4px;
  background: @DarkColorBG;
  color: @colorText;
  padding: 4px;
  border-radius: 5px;

  .title_cell {
    .shadow_inset;
    .flex_center;
  }
}

.item_name {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4px;
  background: @DarkColorBG;
  color: @colorText;
  padding: 4px;
  border-radius: 5px;

  .box {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }

  .name_cell {
    .shadow_inset;
    .flex_center;
  }
}

.flag_cell {
  width: 24px;
  height: 24px;

  img {
    width: 100%;
  }
}
</style>