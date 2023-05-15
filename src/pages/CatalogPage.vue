<template>
  <PreLoader v-if="catLoader"></PreLoader>
  <div class="catalog_wrapper">
    <PageHeader class="header">Каталог событий</PageHeader>

    <div class="event_wrapper" v-if="catalog">
      <div class="events_block"
           v-for="(event, index) in catalog" :key="index">
        <div class="event_title_wrapper">
          <div class="title" :class="[event.info.CODE]" v-if="event.info['CODE']">{{ event.info.NAME }}</div>
        </div>

        <div class="event_box">
          <div class="el_event" v-for="(el, id) in event.events" :key="id">
            <div class="img_box">
              <div class="lamp" :class=[el.status]></div>
              <img :src="url+el.img" alt="">
            </div>
            <div class="name">{{el.NAME}}</div>
            <div class="btn" @click="$router.push('/'+event.info.CODE+ '/' +id)">
              <img src="@/assets/icon/btn/arrow.svg" alt="">
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PageHeader from "@/components/main/PageHeader";
import PreLoader from "@/components/main/PreLoader";

export default {
  name: "CatalogPage",
  components: {
    PageHeader,
    PreLoader

  },
  data() {
    return {
      url:  'https://prognos9ys.ru/',
      catalog: {},
      catLoader: false
    }
  },

  mounted() {
    this.fillCatalogElem()
  },

  watch:{
    eventsData(){
      this.catalog = this.eventsData
      this.catLoader = false
    }
  },

  methods: {
    ...mapActions({
      getEventsInfo: 'catalog/getEventsInfo',
    }),

    async fillCatalogElem() {
      this.catLoader = true
      this.catalogData['type'] = 'catalog'
      await this.getEventsInfo()
      this.catLoader = false
    }
  },

  computed: {
    ...mapState({
      matchLoading: state => state.football.matchLoading,
      eventsData: state => state.catalog.eventsData,
      catalogData: state => state.catalog.catalogData,
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.catalog_wrapper {
  .event_title_wrapper {
    padding: 4px;
    background: @DarkColorBG;
    border-radius: 5px;
    text-align: left;

    .title {
      .shadow_inset;
      display: inline-block;
      color: @colorText;
      padding: 0px 12px;
    }

    .football {
      background: @YesWrite;
    }

    .kvn {
      background: @kvn;
    }

    .f1race {
      background: @red;
    }
  }

  .event_box{
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: flex-start;

    margin-bottom: 12px;
  }

  .el_event {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 4px;
    color: @darkbg;
    border-radius: 5px;
    text-align: left;
    gap: 6px;

    .img_box{
      position: relative;
      .shadow_inset;
      .flex_center;
      max-width: 55px;
      height: 55px;
      background: @colorText;
      img{
        width: 100%;
      }
      padding: 5px;
    }
    .name{
      background: @colorText;
      .shadow_inset;
      .flex_center;
      width: 88%;
      justify-content: left;
    }

    .btn{
      background: @DarkColorBG;
      .shadow_inset;
      .flex_center;
      width: 7%;
      padding: 4px;
      img{
        width: 100%;
      }
    }
  }
}

.lamp{
  position: absolute;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 5px;
  box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);
  background: @green;
  border-radius: 50%;

  &.old{
    background: @red;
  }
}

</style>