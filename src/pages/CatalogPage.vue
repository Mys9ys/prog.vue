<template>
  <div class="catalog_wrapper">
    <PageHeader class="header">Каталог событий</PageHeader>

    <div class="events_block"
         v-for="(event, index) in eventsData" :key="index">
      <div class="event_title_wrapper">
        <div class="title" :class="[event.info.CODE]">{{ event.info.NAME }}</div>
      </div>

      <div class="active event_box" v-if="event.active">
        <div class="el_event" v-for="(el, index) in event.active" :key="index">
         <div class="img_box">
           <div class="active_lamp"></div>
           <img :src="url+el.img" alt="">
         </div>
          <div class="name">{{el.NAME}}</div>
          <div class="btn" @click="$router.push('/'+event.info.CODE+ '/' +index)">
            <img src="@/assets/icon/btn/arrow.svg" alt="">
          </div>
        </div>
      </div>
      <div class="old event_box" v-if="event.old">
        <div class="el_event" v-for="(el, index) in event.old" :key="index">
          <div class="img_box">
            <div class="old_lamp"></div>
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

.active_lamp{
  position: absolute;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 5px;
  box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);
  background: @green;
  border-radius: 50%;
}
.old_lamp{
  .active_lamp;
  background: @red;
}
</style>