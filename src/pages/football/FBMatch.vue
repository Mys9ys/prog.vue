<template>
  <p>{{arMatch}}</p>
  <div class="match_wrapper">
    <PageHeader class="header">Матч № {{$route.params.number}}</PageHeader>
   <div class="match_title">
     <div class="number"></div>
     <div class="date"></div>
     <div class="time"></div>
     <div class="stage"></div>
   </div>
    <div class="teams_block">
      <div class="team">
        <div class="flag"></div>
        <div class="name"></div>
      </div>
      <div class="dash">–</div>
      <div class="team">
        <div class="name"></div>
        <div class="flag"></div>
      </div>
    </div>
    <div class="prognosis_block">
      <div class="goals_block">

      </div>
    </div>
    <div class="btn_block" @click="sendPrognosis">Отправить</div>
  </div>

</template>

<script>
import PageHeader from "@/components/main/PageHeader";
import {mapActions, mapState} from "vuex";

export default {
  name: "FBMatch",
  components: {
    PageHeader
  },

  mounted() {
    this.fillMatchElem()
  },
  methods: {
    ...mapActions({
      getMatchRequest: 'football/getMatchRequest',
    }),

    sendPrognosis(){
      console.log('ghdhd')
    },

    async fillMatchElem() {
      this.queryMatch.number = this.$route.params.number
      this.queryMatch.eventId = this.$route.params.event
      this.queryMatch.userToken = this.token

      console.log(this.queryMatch)
      await this.getMatchRequest()
    }
  },
  computed: {
    ...mapState({
      arMatch: state => state.football.match,
      queryMatch: state => state.football.queryMatch,
      token: state => state.auth.authData.token
    })
  },
}
</script>

<style lang="less" scoped>
.match_title{

}
</style>