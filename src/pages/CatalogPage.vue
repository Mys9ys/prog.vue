<template>
  <PreLoader v-if="catLoader"></PreLoader>
  <div class="catalog_wrapper">
    <PageHeader class="header">Каталог событий</PageHeader>

    <div class="event_wrapper" v-if="eventsData">
      <div class="events_block"
           v-for="(event, index) in eventsData" :key="index">
        <div class="event_title_wrapper">
          <div class="title" :class="[event.info['CODE']]" v-if="event.info['CODE']">{{ event.info.NAME }}</div>
          <div class="btn_block">
            <div class="btn_wrapper">
              <div class="btn_act"
                   :class="{[event.info['CODE']] : [event.info['CODE']], 'inactive' : arActive[index] === false}"
                   v-if="event.events['now']"
                   @click="arActive[index] = true"
              >Активные</div>
            </div>
            <div class="btn_wrapper">
              <div class="btn_act last"
                   :class="{[event.info['CODE']] : [event.info['CODE']], 'inactive' : arActive[index] === true}"
                   v-if="event.events['old']"
                   @click="arActive[index] = false"
              >Прошедшие</div>

            </div>
          </div>
        </div>

        <div class="event_box" v-if="arActive[index]">
          <CatalogElement v-for="(el, id) in event.events['now']" :key="id"
                          :element="el"
                          :code="event.info['CODE']"
          ></CatalogElement>
        </div>

        <div class="event_box" v-else>
          <CatalogElement v-for="(el, id) in event.events['old']" :key="id"
                          :element="el"
                          :code="event.info['CODE']"
          ></CatalogElement>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PageHeader from "@/components/main/PageHeader";
import PreLoader from "@/components/main/PreLoader";
import CatalogElement from "@/components/catalog/CatalogElement";

export default {
  name: "CatalogPage",
  components: {
    CatalogElement,
    PageHeader,
    PreLoader

  },
  data() {
    return {
      url: 'https://prognos9ys.ru/',
      catLoader: false,
      arActive: {}
    }
  },

  mounted() {
    this.fillCatalogElem()
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

      this.fillActionArray()
    },

    fillActionArray(){
      Object.keys(this.eventsData).forEach((id)=>
      {
        // this.eventsData[id].events
        Object.keys(this.eventsData[id].events).forEach((status)=>{
            if(status === 'old') this.arActive[id] = false
            if(status === 'now') this.arActive[id] = true
        })
      })
    },

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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 4px;
    background: @DarkColorBG;
    border-radius: 5px;
    text-align: left;
    margin-bottom: 4px;

    .title {
      .shadow_inset;
      display: inline-block;
      color: @colorText;
      padding: 0px 12px;
    }

    .btn_block {
      display: flex;
      flex-direction: row;
      gap: 4px;
      .btn_wrapper{
        border-radius: 5px;
        text-align: left;
        .btn_act{
          .shadow_inset;
          display: inline-block;
          color: @colorText;
          font-size: 12px;
          padding: 2px;
        }
      }
    }

    .football {
      background: @YesWrite2;
    }

    .kvn {
      background: @kvn;
    }

    .race {
      background: @cubersport;
    }
    .inactive{
      background: @DarkColorBG;
    }
  }

  .event_box {
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: flex-start;

    margin-bottom: 12px;
  }

}
</style>