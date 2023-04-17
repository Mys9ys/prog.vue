<template>
  <div class="catalog_wrapper">
    <PageHeader class="header">Каталог событий</PageHeader>

    <div class="events_block"
         v-for="(event, index) in eventsData" :key="index">
      <div class="event_title_wrapper">
        <div class="title" :class="[event.info.CODE]">{{ event.info.NAME }}</div>
      </div>

      <div class="active event_box" v-if="event.active">
        <div class="title_wrapper">
          <div class="title">Активные</div>
        </div>
        <div class="el_event" v-for="(el, index) in event.active" :key="index">
         <div class="img_box">
           <img :src="url+el.img" alt="">
         </div>
          <div class="name">{{el.NAME}}</div>
          <div class="btn" @click="$router.push('/'+event.info.CODE+ '/' +index)">
            <img src="@/assets/icon/btn/arrow.svg" alt="">
          </div>
        </div>
      </div>
      <div class="old event_box" v-if="event.old">
        <div class="title_wrapper">
          <div class="title">Прошедшие</div>
        </div>
        <div class="el_event" v-for="(el, index) in event.old" :key="index">
          <div class="img_box">
            <img :src="url+el.img" alt="">
          </div>
          <div class="name">{{el.NAME}}</div>
          <div class="btn" @click="$router.push('/'+event.info.CODE+ '/' +index)">
            <img src="@/assets/icon/btn/arrow.svg" alt="">
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PageHeader from "@/components/main/PageHeader";

export default {
  name: "CatalogPage",
  components: {
    PageHeader
  },
  data() {
    return {
      url:  'https://prognos9ys.ru/',
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
      await this.getEventsInfo()
    }
  },

  computed: {
    ...mapState({
      matchLoading: state => state.football.matchLoading,
      eventsData: state => state.catalog.eventsData,
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

    .title_wrapper{
      display: inline-block;
      padding: 2px;
      background: @DarkColorBG;
      border-radius: 5px;
      color: @colorText;
      margin: 4px 0;
      align-items: flex-start;
      .title{
        display: inline-block;
        .shadow_inset;
        font-size: 12px;
        padding: 0 4px;
      }
    }

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
</style>