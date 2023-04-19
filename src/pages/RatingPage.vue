<template>
  <PreLoader v-if="mainLoader"></PreLoader>
  <div class="ratings_wrapper">
    <PageHeader class="header">Рейтинги</PageHeader>

    <div class="event_block" :class="{'small_category' : category}">
      <div class="el_event" v-for="(el, index) in eventsData" :key="index">
        <div class="img_box" @click="selectRating(el.id, el.code)">
          <img :src="url+el.img" alt="">
        </div>
      </div>
    </div>

    <div class="rating_block">
      <FootballRatingBlock v-if="category === 'football'"></FootballRatingBlock>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/main/PageHeader";
import {mapActions, mapState} from "vuex";
import PreLoader from "@/components/main/PreLoader";
import FootballRatingBlock from "@/components/football/FootballRatingBlock";

export default {
  name: "RatingPage",
  components: {
    PageHeader,
    PreLoader,
    FootballRatingBlock
  },
  data() {
    return {
      url:  'https://prognos9ys.ru/',
      category: '',
      eventId: ''
    }
  },

  created() {
    this.fillCatalogElem()
  },

  methods: {
    ...mapActions({
      getEventsInfo: 'catalog/getEventsInfo',
    }),

    async fillCatalogElem() {
      this.catalogData['type'] = 'all'

      await this.getEventsInfo()
    },

    selectRating(id, code){
      console.log('selectRating')
      this.eventId = id
      this.category = code
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

    &.small_category{
      .el_event{
        width: 40px;
      }
    }
  }
}
</style>