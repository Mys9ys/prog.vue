<template>
  <PreLoader v-if="this.mainLoader"></PreLoader>
  <div class="ratings_wrapper">
    <PageHeader class="header">Рейтинги</PageHeader>

    <div class="event_block">
      <div class="el_event" v-for="(el, index) in eventsData" :key="index">
        <div class="img_box" @click="loadRating(el.id, el.code)">
          <img :src="url+el.img" alt="">
        </div>
      </div>
    </div>

    <div class="rating_block">
      <div class="rating_header">

      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/main/PageHeader";
import {mapActions, mapState} from "vuex";
import PreLoader from "@/components/main/PreLoader";

export default {
  name: "RatingPage",
  components: {
    PageHeader,
    PreLoader
  },
  data() {
    return {
      url:  'https://prognos9ys.ru/',

      relation: {

      },

      icons: {
        1: '0-0',
        18: '🏆',  // result
        28: 'Δ',
        19: 'Σ',
        32: '🡘',
        21: '▮',
        22: '▮',
        20: '🡬',
        23: '🠹',
        45: '+🕘',
        46: '+🠹',
      },

      description: {
        1: 'Счет матча',
        18: 'Исход матча (п1 - победа первой команды, н - ничья, п2 - победа второй',
        28: 'Разница мячей забитые второй командой вычитаются из забитых первой командой',
        19: 'Сумма мячей забитых обеими командами',
        32: 'Процент владения мячом первой и второй командой',
        21: 'Количество желтых карточек в матче (сумма для обеих команд)',
        22: 'Количество красных карточек в матче (сумма для обеих команд)',
        20: 'Количество угловых в матче (сумма для обеих команд)',
        23: 'Количество пенальти в матче (сумма для обеих команд)',
        45: 'Дополнительное время (наличие/отсутствие)',
        46: 'Серия пенальти (наличие/отсутствие)',

      }
    }
  },

  created() {
    this.fillCatalogElem()
  },

  methods: {
    ...mapActions({
      getEventsInfo: 'catalog/getEventsInfo',
      getFootballRatings: 'rating/getFootballRatings',
    }),

    async fillCatalogElem() {
      this.catalogData['type'] = 'all'

      await this.getEventsInfo()
    },

    async loadRating(id, type){

      if(type === 'football'){
        this.ratingData.event = id
        await this.getFootballRatings()
      }
    }
  },

  computed: {
    ...mapState({
      matchLoading: state => state.football.matchLoading,
      eventsData: state => state.catalog.eventsData,
      catalogData: state => state.catalog.catalogData,
      ratingData: state => state.rating.ratingData,
      footballRating: state => state.rating.footballRating,
      mainLoader: state => state.mainLoader,
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.ratings_wrapper{
  .event_block{
    display: flex;
    flex-direction: row;
    gap: 4px;
    .el_event{
      background: @DarkColorBG;
      width: 25%;
      padding: 4px;
      border-radius: 5px;
      .img_box{
        cursor: pointer;
        background: @colorBlur;
        width: 100%;
        img{
          width: 100%;
        }
      }
    }
  }
}
</style>