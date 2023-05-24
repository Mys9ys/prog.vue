<template>
  <PreLoader v-if="loader"></PreLoader>
  <PageHeader class="header" :path="'/race/' + $route.params.event">Гонка № {{ $route.params.number }}</PageHeader>

  <div class="item_wrapper" v-if="item">
    <div class="item_title">
      <div class="number title_cell"># {{ item.number }}</div>
      <div class="date title_cell">&#128197; {{ item.date }}</div>
      <div class="time title_cell">&#128344; {{ item.time }}</div>
    </div>

    <div class="item_name">
      <div class="box">
        <div class="name_cell">Гран-при</div>
        <div class="name_cell">{{item.name}}</div>
      </div>
      <div class="box">
        <div class="name_cell">{{item.country.NAME}}</div>
        <div class="name_cell flag_cell">
          <img :src="urlImg + item.country.flag" alt="">
        </div>
      </div>
    </div>

    <div class="qual_block">
      <div class="title_block">
        <div class="title">
          Прогноз на квалификацию
        </div>
        <div class="close">V</div>
      </div>
      <div class="data_block">
        <div class="title_count" v-if="qualData.length !==10">Осталось выбрать еще {{10-qualData.length}}</div>
        <div class="title_count" v-else>Выбрано 10 гонщиков</div>
        <div class="drag_block">
          <div class="race_list">
            <RaceListItem
                v-for="el in item.racers"
                :item="el"
                :key="el.ID"
                draggable="true"
                @dragstart="onDragStart($event, el.ID)"
            ></RaceListItem>
          </div>
          <div class="race_list_disable" v-if="qualData.length === 10"></div>
          <div class="result_list"
               @drop="onDrop($event)"
               @dragover.prevent
               @dragenter.prevent
          >
            <DragResultList
                v-for="(id, index) in qualData"
                :key = "id"
                :item = "item.racers[id]"
                :place="index"
                @click="deleteElement(item.racers[id], index)"
            ></DragResultList>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import PageHeader from "@/components/main/PageHeader";
import {mapActions, mapState} from "vuex";
import PreLoader from "@/components/main/PreLoader";
import RaceListItem from "@/components/race/RaceListItem";
import DragResultList from "@/components/race/DragResultList";

export default {
  name: "RacePage",
  components: {
    PageHeader,
    PreLoader,
    RaceListItem,
    DragResultList
  },
  data(){
    return{
      urlImg: 'https://prognos9ys.ru/',
      loader: false,
      qualData: []
    }
  },

  created() {
    this.fillElem()
  },

  methods: {
    ...mapActions({
      getOneElement: 'race/getOneElement',
      sendUserPrognosis: 'football/sendUserPrognosis',
    }),

    async fillElem(){

      this.loader = true

      this.queryEvent.number = this.$route.params.number
      this.queryEvent.events = this.$route.params.event
      this.queryEvent.userToken = this.token

      await this.getOneElement()

      this.loader = false
    },

    onDragStart(e, index) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', index.toString())
      this.dragStart = true
      setTimeout(() => {
        e.target.style.visibility = 'hidden'
      }, 0)
      // e.target.style.opacity = '1'
      e.target.classList.add('drag')
    },

    onDrop(e) {
      const itemId = parseInt(e.dataTransfer.getData('itemId'))
      console.log('itemId', itemId)
      // this.result[Object.keys(this.result).length + 1] = this.items[itemId]
      this.qualData.push(itemId)
      // delete this.items[itemId];
    },

    deleteElement(id, index) {
      // this.items[id] = this.result[id]

      console.log('id', id)
      // this.result = this.result.filter((i) => {i !== id})
      delete this.qualData[index];

      this.qualData = this.qualData.filter(i => i !== undefined)

    }
  },

  computed: {
    ...mapState({
      token: state => state.auth.authData.token,
      queryEvent: state => state.race.queryEvent,
      item: state => state.race.oneRace
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.item_wrapper{
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.item_title{
  display: flex;
  flex-direction: row;
  gap: 4px;
  background: @DarkColorBG;
  color: @colorText;
  padding: 4px;
  border-radius: 5px;

  .title_cell{
    .shadow_inset;
    .flex_center;
  }
}

.item_name{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4px;
  background: @DarkColorBG;
  color: @colorText;
  padding: 4px;
  border-radius: 5px;

  .box{
    display: flex;
    flex-direction: row;
    gap: 4px;
  }
  .name_cell{
    .shadow_inset;
    .flex_center;
  }
}

.flag_cell{
  width: 24px;
  height: 24px;
  img{
    width: 100%;
  }
}
.qual_block{
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: @DarkColorBG;
  color: @colorText;
  padding: 4px;
  border-radius: 5px;

  .title_block{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 4px;
  }
  .title{
    .shadow_inset;
  }
  .close{
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 24px;
    height: 24px;
    width: 24%;
    background: @valleyball;
    padding: 2px 2px;
    border-radius: 3px;
    cursor: pointer;
    .shadow_template;
  }
}
.data_block{
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-wrap: nowrap;
}
.title_count{
  width: 100%;
  .shadow_inset;
  font-size: 11px;
  color: @maxGreen;
}
.drag_block{
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 4px;
  flex-wrap: nowrap;
}
.race_list{
  width: 45%;
  display: flex;
  flex-direction: column;

  gap: 2px;
}
.race_list_disable{
  top:0;
  left: 0;

  position: absolute;
  width: 45%;
  height: 100%;
  background: @maxdarkgrey;
  opacity: 0.15;
}

.result_list{
  width: 55%;
  display: flex;
  flex-direction: column;

  gap: 2px;

  .shadow_inset;

  min-height: 120px;
  padding-bottom: 30px;
}
</style>