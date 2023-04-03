<template>
  <div class="wrapper">
    <div class="header">

    </div>
    <div class="games">
      <div class="game" v-for="(game, index) in getGames" :key="index">
        <GameTitle :title="game.title"></GameTitle>
        <GameTeams :info="game"></GameTeams>
        <GameBtns></GameBtns>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import GameTitle from "@/components/kvn/GameTitle";
import GameTeams from "@/components/kvn/GameTeams";
import GameBtns from "@/components/kvn/GameBtns";

export default {
  name: "KvnEvent",
  components: {
    GameTitle,
    GameTeams,
    GameBtns
  },


  methods: {
    ...mapMutations({
      setEventData: 'kvn/setEventData',
    }),
    ...mapActions({
      fetchAnswer: 'kvn/fetchAnswer'
    }),
  },
  mounted() {
    this.fetchAnswer()
    console.log('window.location.href', window.location.href.includes('localhost'))
  },
  computed: {
    ...mapState({
      kvnEventData: state => state.kvnEventData,
    }),
    ...mapGetters({
      getGames: "kvn/getGames",
      getEventInfo: "kvn/getEventInfo"
    })
  }
}
</script>

<style lang="less" scoped>
@blockBG: #253133;
.game{
  width: 100%;
  background: @blockBG;
  //background:rgb(45,45,45);
  padding: 5px;
  border-radius: 5px;
  margin-bottom:5px;
}
</style>