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

    <div class="btn_admin_block" v-if="role === 'admin'">
      <div class="title">Выбран {{ admin ? 'Админский' : 'Простой' }} режим</div>
      <div class="btn_block">
        <div class="btn" v-if="admin" @click="admin = false">Простой</div>
        <div class="btn" v-else @click="admin = true">Админ</div>
      </div>
    </div>

    <div v-if="admin">
      <div class="block_gap">
        <RacerSelectBlock
            v-for="(el, index) in adminResult"
            :key="index"
            :dataBlock="el"
            :role="role"
            :racers="item.racers"
            :raceInfo="raceInfo">
        </RacerSelectBlock>
      </div>

      <div class="btn_set_result" @click="calcResult">Рассчитать результаты</div>

    </div>


    <div v-else>
      <div class="block_gap" v-if="!item.result_race">
        <RacerSelectBlock
            v-for="(el, index) in progBlocks"
            :key="index"
            :dataBlock="el"
            :racers="item.racers"
            :raceInfo="raceInfo">
        </RacerSelectBlock>
      </div>
      <div class="result_race" v-else>
        <ResultRaceBlock
            v-for="(el, index) in progBlocks"
            :key="index"
            :dataBlock="el"
            :prognosis="item.prognosis[index]"
            :score="item.result_score[index]"
            :result="item.result_race[index]"
            :racers="item.racers">
        </ResultRaceBlock>
      </div>
    </div>

  </div>

</template>

<script>
import PageHeader from "@/components/main/PageHeader";
import {mapActions, mapState} from "vuex";
import PreLoader from "@/components/main/PreLoader";
import RacerSelectBlock from "@/components/race/RacerSelectBlock";
import ResultRaceBlock from "@/components/race/ResultRaceBlock";

export default {
  name: "RacePage",
  components: {
    RacerSelectBlock,
    PageHeader,
    PreLoader,
    ResultRaceBlock
  },
  data() {
    return {
      urlImg: 'https://prognos9ys.ru/',
      loader: true,

      admin: false,

      progBlocks: {
        qual_res: {title: 'Квалификация', type: 'qual', count: 10, active: true, exist: true},
        sprint_res: {title: 'Спринт', type: 'sprint', count: 8, active: true, exist: false},
        race_res: {title: 'Гонка', type: 'race', count: 10, active: true, exist: true},
        best_lap: {title: 'Лучший круг', type: 'best_lap', count: 1, active: true, exist: true},
      },

      adminResult: { // костыль - так как похоже по ссылке ставится если присвоить админке progBlock
        qual_res: {title: 'Квалификация', type: 'qual', count: 10, active: true, exist: true},
        sprint_res: {title: 'Спринт', type: 'sprint', count: 8, active: true, exist: false},
        race_res: {title: 'Гонка', type: 'race', count: 10, active: true, exist: true},
        best_lap: {title: 'Лучший круг', type: 'best_lap', count: 1, active: true, exist: true},
      },

      raceInfo: {},
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
      if (this.item.send_date) this.raceInfo['fill'] = this.item.send_date
      this.raceInfo['userToken'] = this.token

      if (this.item.sprint) {
        this.progBlocks.sprint.exist = true
        this.adminResult.sprint.exist = true
      }

      Object.keys(this.progBlocks).forEach((selector) => {

        this.adminResult[selector].data = this.item.result_race[selector] ?? []

        this.progBlocks[selector].data = this.item.prognosis[selector] ?? []

      })

    }
  },

  methods: {
    ...mapActions({
      getOneElement: 'race/getOneElement',
      calcRaceResult: 'admin/calcRaceResult'
    }),

    async fillElem() {

      this.loader = true

      this.queryEvent.number = this.$route.params.number
      this.queryEvent.events = this.$route.params.event
      this.queryEvent.userToken = this.token

      await this.getOneElement()

    },

    async calcResult() {
      this.loader = true

      this.adminQueryEvent.race_id = this.raceInfo['race_id']

      await this.calcRaceResult()

      this.loader = false

    }
  },

  computed: {
    ...mapState({
      token: state => state.auth.authData.token,
      queryEvent: state => state.race.queryEvent,
      item: state => state.race.oneRace,
      role: state => state.auth.userInfo.role,

      adminQueryEvent: state => state.admin.queryEvent,
      sensSuccess: state => state.admin.sendSuccess
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

.btn_admin_block {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4px;
  background: @red;
  color: @colorText;
  padding: 4px;
  border-radius: 5px;

  .title {
    .shadow_inset;
    .flex_center;
  }

  .btn_block {
    display: flex;
    flex-direction: row;
    gap: 4px;
    justify-content: flex-end;

    .btn {
      .shadow_inset;
    }
  }
}

.block_gap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn_set_result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: @red;
  color: @colorText;
  cursor: pointer;
  .shadow_template;
  padding: 2px 2px;
  font-size: 10px;
  border-radius: 3px;
  text-align: center;
  border: 1px solid transparent;
  text-decoration: none;
  margin-top: 8px;
  margin-bottom: 38px;
}
</style>