<template>
  <div class="event_wrapper">
    <PageHeader class="header">Соревнование</PageHeader>
    <div v-if="arMatches.past">
      <div class="past_title_wrapper">
        <div class="past_title">
          Прошедшие
        </div>
        <div class="more_btn" @click="past = !past">
          <span :class="{'close' : !past, 'open' : past}"> > </span>
        </div>

      </div>
      <div class="past_box match_box" v-if="past">
        <div class="date_match_block"
             v-for="(matches, index) in arMatches.past"
             :key="index"
        >
          <div class="date_title_wrapper">
            <div class="date_title">{{index}}</div>
          </div>

          <EventMatch
              v-for="(el, index) in matches"
              :key="index"
              :match="el"
          ></EventMatch>
          <div class="doted_line"></div>
        </div>

      </div>
    </div>

    <div v-if="arMatches.recent">
      <div class="past_title_wrapper">
        <div class="past_title">
          Недавние
        </div>
        <div class="more_btn" @click="recent = !recent">
          <span :class="{'close' : !recent, 'open' : recent}"> > </span>
        </div>

      </div>
      <div class="past_box match_box" v-if="recent">
        <div class="date_match_block"
             v-for="(matches, index) in arMatches.recent"
             :key="index"
        >
          <div class="date_title_wrapper">
            <div class="date_title">{{index}}</div>
          </div>

          <EventMatch
              v-for="(el, index) in matches"
              :key="index"
              :match="el"
          ></EventMatch>
          <div class="doted_line"></div>
        </div>

      </div>
    </div>

    <div v-if="arMatches.nearest">
      <div class="past_title_wrapper">
        <div class="past_title">
          Ближайшие
        </div>
        <div class="more_btn" @click="nearest = !nearest">
          <span :class="{'close' : !nearest, 'open' : nearest}"> > </span>
        </div>

      </div>
      <div class="past_box match_box" v-if="nearest">
        <div class="date_match_block"
             v-for="(matches, index) in arMatches.nearest"
             :key="index"
        >
          <div class="date_title_wrapper">
            <div class="date_title">{{index}}</div>
          </div>

          <EventMatch
              v-for="(el, index) in matches"
              :key="index"
              :match="el"
          ></EventMatch>
          <div class="doted_line"></div>
        </div>

      </div>
    </div>

    <div v-if="arMatches.future">
      <div class="past_title_wrapper">
        <div class="past_title">
          Будущие
        </div>
        <div class="more_btn" @click="future = !future">
          <span :class="{'close' : !future, 'open' : future}"> > </span>
        </div>

      </div>
      <div class="past_box match_box" v-if="future">
        <div class="date_match_block"
             v-for="(matches, index) in arMatches.future"
             :key="index"
        >
          <div class="date_title_wrapper">
            <div class="date_title">{{index}}</div>
          </div>

          <EventMatch
              v-for="(el, index) in matches"
              :key="index"
              :match="el"
          ></EventMatch>
          <div class="doted_line"></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import EventMatch from "@/components/football/EventMatch";
import PageHeader from "@/components/main/PageHeader";
import {mapActions, mapState} from "vuex";

export default {
  name: "FBEvent",
  components: {
    EventMatch,
    PageHeader
  },
  data() {
    return {
      past: false, //прошедшие
      recent: true, //недавние
      nearest: true, //ближайшие
      future: false, //будущие

    }
  },
  mounted() {
    this.fillMatchesElem()
  },
  methods: {
    ...mapActions({
      getEventMatches: 'football/getEventMatchesRequest',
    }),

    async fillMatchesElem() {
      await this.getEventMatches()
    }
  },
  computed: {
    ...mapState({
      arMatches: state => state.football.matches,
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.shadow_inset {
  box-shadow: inset 0 2px 10px 1px rgba(0, 0, 0, .3), inset 0 0 0 60px rgba(0, 0, 0, .3), 0 1px rgba(255, 255, 255, .08);
  padding: 0 4px;
  border-radius: 3px;
}

.past_title_wrapper{
  background: @DarkColorBG;
  color: @colorText;
  padding: 4px;
  border-radius: 5px;
  text-align: left;
  margin-bottom: 6px;
  margin-top: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .past_title{
    display: inline-block;
    .shadow_inset;
  }
  .more_btn {
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
    box-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 -1px 0 rgba(0, 0, 0, .2);

    span{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .close {
      transform: rotate(90deg);
    }

    .open {
      transform: rotate(-90deg);
    }

    &:hover {
      background: @colorText;
      color: @valleyball;
      border: 1px solid @valleyball;
    }
  }
}

.match_box{
  background: @BackGreenColor;
  .doted_line{
    width: 100%;
    border-bottom: 2px dotted @darkbg;
  }
  .date_title_wrapper{
    width: 20%;
    max-width: 75px;
    background: @DarkColorBG;
    color: @colorText;
    padding: 4px;
    border-radius: 5px;
    display: inline-block;
    .date_title{
      .shadow_inset;
    }
  }

  .date_match_block{
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }
}

</style>