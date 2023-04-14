<template>
  <PreLoader v-if="this.matchLoading"></PreLoader>
  <SendSuccess v-if="prognosisSuccess"></SendSuccess>
  <div v-else class="match_wrapper">
    <PageHeader class="header">Матч № {{ $route.params.number }}</PageHeader>
    <div class="match_title">
      <div class="number title_cell"># {{ arMatch.number }}</div>
      <div class="date title_cell">&#128197; {{ arMatch.date }}</div>
      <div class="time title_cell">&#128344; {{ arMatch.time }}</div>
      <div class="stage title_cell">{{ arMatch.step }}</div>
    </div>
    <div class="match_record_wrapper" v-if="arMatch.active === 'Y'">
      <p>icon {{ stateArray[18] }}</p>

      <div class="teams_block">
        <div class="team">
          <div class="flag">
            <img :src="urlImg + home.flag" alt="">
          </div>
          <div class="name name_home">{{ home.name }}</div>
        </div>
        <div class="dash">–</div>
        <div class="team">
          <div class="name name_guest">{{ guest.name }}</div>
          <div class="flag">
            <img :src="urlImg + guest.flag" alt="">
          </div>
        </div>
      </div>
      <div class="prognosis_block">
        <div class="goals_block">
          <div class="goals_block_title pb_title">
            <img src="@/assets/icon/football/scoreboard.svg" alt="">
          </div>
          <div class="goal_block">
            <div class="zero goal_btn" @click="setGoals('zero', 15)">0</div>
            <div class="minus goal_btn" @click="setGoals('minus', 15)">-</div>
            <div class="value">{{ data[15] }}</div>
            <div class="plus goal_btn" @click="setGoals('plus', 15)">+</div>
            <div class="two goal_btn" @click="setGoals('two', 15)">2</div>
          </div>
          <div class="dash">–</div>
          <div class="goal_block">
            <div class="zero goal_btn" @click="setGoals('zero', 16)">0</div>
            <div class="minus goal_btn" @click="setGoals('minus', 16)">-</div>
            <div class="value">{{ data[16] }}</div>
            <div class="plus goal_btn" @click="setGoals('plus', 16)">+</div>
            <div class="two goal_btn" @click="setGoals('two', 16)">2</div>
          </div>
        </div>
        <div class="prognosis_dash_line"></div>
        <div class="match_math_block">

          <div class="match_result_block">
            <div class="match_result_title pb_title" v-html="icon[18]">

            </div>
            <div class="match_result_box">
              <div class="match_result_el" :class="{'active' : data[18] === 'п1'}" @click="setResult('п1')">п1</div>
              <div class="match_result_el" :class="{'active' : data[18] === 'н'}" @click="setResult('н')">н</div>
              <div class="match_result_el" :class="{'active' : data[18] === 'п2'}" @click="setResult('п2')">п2</div>
            </div>
          </div>

          <div class="match_sum_block">
            <div class="match_sum_title pb_title" v-html="icon[28]">

            </div>
            <div class="match_sum_box">
              <div class="minus math_btn" @click="setMath('minus', 28, 'sum')">-</div>
              <div class="value">{{ data[28] }}</div>
              <div class="plus math_btn" @click="setMath('plus', 28, 'sum')">+</div>
            </div>
          </div>

          <div class="match_sum_block">
            <div class="match_sum_title pb_title">
              <span>Σ</span>
            </div>
            <div class="match_sum_box">
              <div class="minus math_btn" @click="setMath('minus', 19)">-</div>
              <div class="value">{{ data[19] }}</div>
              <div class="plus math_btn" @click="setMath('plus', 19)">+</div>
            </div>
          </div>
        </div>

        <div class="prognosis_dash_line"></div>

        <div class="match_domination_block">
          <div class="pb_title">&#129112;</div>
          <div class="match_domination_box">
            <div class="minus math_btn" @click="setRangeBtn('minus')">-</div>
            <div class="value left">{{ data[32] }}</div>
            <input class="domination_range" type="range" ref="iRange" :value="data[32]" @change="rangeChange()">
            <div class="value right">{{ 100 - data[32] }}</div>
            <div class="plus math_btn" @click="setRangeBtn('plus')">-</div>
            <div class="plus math_btn" @click="setRangeBtn('half')">50</div>
          </div>
        </div>
        <div class="prognosis_dash_line"></div>
        <div class="cards_block">
          <div class="block yellow">
            <div class="title">&#9646;</div>
            <div class="box">
              <div class="btn" @click="setValue('zero', 21)">0</div>
              <div class="btn" @click="setValue('minus', 21)">-</div>
              <div class="value">{{ data[21] }}</div>
              <div class="btn" @click="setValue('plus', 21)">+</div>
              <div class="btn" @click="setValue('five', 21)">5</div>
            </div>
          </div>

          <div class="block red">
            <div class="title">&#9646;</div>
            <div class="box">
              <div class="btn" @click="setValue('zero', 22)">0</div>
              <div class="btn" @click="setValue('minus', 22)">-</div>
              <div class="value">{{ data[22] }}</div>
              <div class="btn" @click="setValue('plus', 22)">+</div>
              <div class="btn" @click="setValue('one', 22)">1</div>
            </div>
          </div>
        </div>
        <div class="prognosis_dash_line"></div>
        <div class="corner_penalty_block">
          <div class="block corner">
            <div class="title">&#129132;</div>
            <div class="box">
              <div class="btn" @click="setValue('zero', 20)">0</div>
              <div class="btn" @click="setValue('minus', 20)">-</div>
              <div class="value">{{ data[20] }}</div>
              <div class="btn" @click="setValue('plus', 20)">+</div>
              <div class="btn" @click="setValue('six', 20)">6</div>
            </div>
          </div>

          <div class="block penalty">
            <div class="title">&#129081;</div>
            <div class="box">
              <div class="btn" @click="setValue('zero', 23)">0</div>
              <div class="btn" @click="setValue('minus', 23)">-</div>
              <div class="value">{{ data[23] }}</div>
              <div class="btn" @click="setValue('plus', 23)">+</div>
              <div class="btn" @click="setValue('one', 23)">1</div>
            </div>
          </div>
        </div>
        <div class="btns_block">

          <div class="annotation_btn" @click="annotationVis = !annotationVis">Пояснения</div>
          <div class="btn_send" @click="sendPrognosis" v-if="arMatch.active === 'Y'">Отправить</div>
          <div class="btn_send btn_gray" v-else>Не доступно</div>
        </div>
      </div>

      <div class="error_message" v-if="error">{{ error }}</div>

      <div class="annotation_block" v-if="annotationVis">

      </div>
    </div>
    <div class="match_result_wrapper">
      <table class="table table-dark table-hover om_table_box">
        <thead>
        <tr>
          <th class="pr_table_col">0-0</th>
          <th class="pr_table_col">&#127942;</th>
          <th class="pr_table_col">sum</th>
          <th class="pr_table_col">+/-</th>
          <th class="pr_table_col">%</th>
          <th class="pr_table_col"><i class="bi bi-file-fill" style="color:yellow"></i></th>
          <th class="pr_table_col"><i class="bi bi-file-fill" style="color:red"></i></th>
          <th class="pr_table_col"><i class="bi bi-flag"></i></th>
          <th class="pr_table_col">pen</th>
          <th class="pr_table_col">+<i class="bi bi-alarm"></i></th>
          <th class="pr_table_col">+pen</th>
          <th class="pr_table_col">all</th>
        </tr>
        </thead>
        <tbody>
        <tr>

          <td class="pr_table_col">{{ prognosis.goal_home }} - {{ prognosis.goal_guest }}</td>
          <td class="pr_table_col">{{ prognosis.result}}</td>
          <td class="pr_table_col">{{ prognosis.sum}}</td>
          <td class="pr_table_col">{{ prognosis.diff}}</td>
          <td class="pr_table_col">{{ prognosis.domination}} - {{100- prognosis.domination}}</td>
          <td class="pr_table_col">{{ prognosis.yellow}}</td>
          <td class="pr_table_col">{{ prognosis.red}}</td>
          <td class="pr_table_col">{{ prognosis.corner}}</td>
          <td class="pr_table_col">{{ prognosis.penalty}}</td>
          <td class="pr_table_col">{{ prognosis.otime}}</td>
          <td class="pr_table_col">{{ prognosis.spenalty}}</td>
          <td class="pr_table_col"></td>

        </tr>

        <tr>

          <td class="pr_table_col result">{{ matchR.goal_home }} - {{ matchR.goal_guest }}</td>
          <td class="pr_table_col result">{{ matchR.result}}</td>
          <td class="pr_table_col result">{{ matchR.sum}}</td>
          <td class="pr_table_col result">{{ matchR.diff}}</td>
          <td class="pr_table_col result">{{ matchR.domination}} - {{100- matchR.domination}}</td>
          <td class="pr_table_col result">{{ matchR.yellow}}</td>
          <td class="pr_table_col result">{{ matchR.red}}</td>
          <td class="pr_table_col result">{{ matchR.corner}}</td>
          <td class="pr_table_col result">{{ matchR.penalty}}</td>
          <td class="pr_table_col result">{{ matchR.otime}}</td>
          <td class="pr_table_col result">{{ matchR.spenalty}}</td>
          <td class="pr_table_col result"></td>

        </tr>

        <tr class="prog_r">

          <td class="pr_table_col" :class="{'green' : progR.score >0}">{{ progR.score }}</td>
          <td class="pr_table_col" :class="{'green' : progR.result >0}">{{ progR.result}}</td>
          <td class="pr_table_col" :class="{'green' : progR.sum >0}">{{ progR.sum}}</td>
          <td class="pr_table_col" :class="{'green' : progR.diff >0}">{{ progR.diff}}</td>
          <td class="pr_table_col" :class="{'green' : progR.domination >0}">{{ progR.domination}}</td>
          <td class="pr_table_col" :class="{'green' : progR.yellow >0}">{{ progR.yellow}}</td>
          <td class="pr_table_col" :class="{'green' : progR.red >0}">{{ progR.red}}</td>
          <td class="pr_table_col" :class="{'green' : progR.corner >0}">{{ progR.corner}}</td>
          <td class="pr_table_col" :class="{'green' : progR.penalty >0}">{{ progR.penalty}}</td>
          <td class="pr_table_col" :class="{'green' : progR.otime >0}">{{ progR.otime}}</td>
          <td class="pr_table_col" :class="{'green' : progR.spenalty >0}">{{ progR.spenalty}}</td>
          <td class="pr_table_col" :class="{'green' : progR.all >0}">{{ progR.all}}</td>

        </tr>

        </tbody>
      </table>
    </div>
    <div class="btn_select_other_wrapper">
      <div class="prev_btn other_match_btn" @click="$router.push(prevLink).then(() => { this.$router.go() })">
        <img src="@/assets/icon/pagination/left.svg" alt=""><span>Предыдущий</span>
      </div>

      <div class="next_btn other_match_btn" @click="$router.push(nextLink).then(() => { this.$router.go() })">
        <span>Следующий</span><img src="@/assets/icon/pagination/right.svg" alt="">
      </div>
    </div>
  </div>

</template>

<script>

import PageHeader from "@/components/main/PageHeader";
import {mapActions, mapState} from "vuex";
import PreLoader from "@/components/main/PreLoader";
import SendSuccess from "@/components/main/SendSuccess";

export default {
  name: "FBMatch",
  components: {
    PageHeader,
    PreLoader,
    SendSuccess
  },

  data() {
    return {
      moreInfo: false,
      urlImg: 'https://prognos9ys.ru/',
      ball: '⚽',
      prevLink: '',
      nextLink: '',
      error: '',
      annotationVis: false,
      data: {
        30: this.$route.params.number, //number
        17: '', //matchId
        15: 0, // goals_home
        16: 0, // goals_guest
        18: '', // Исход матча

        19: '', // Разница мячей
        28: '', // Сумма голов
        32: 50, // Владение
        21: '', // желтых
        22: '', // красных

        20: '', // угловых
        23: '', // пенальти
        52: this.$route.params.event, // Событие
        45: '', // m_otime
        46: '', // m_spenalty

        29: '', // m_offside
      },
      // stateArray: new Map([
      //   [18, ['icon', '&#127942;','desc', '']],
      //   ['catalog', require('@/assets/icon/profile/list.svg')],
      //   ['football', require('@/assets/icon/events/ball.svg')],
      // ]),
      stateArray: {
        18: ['icon', '&#127942;', 'desc', '']
      },

      icon: {
        18: '&#127942;',
        28: 'Δ'
      },
    }
  },

  created() {
    this.fillMatchElem()
    this.setOtherLink()
  },
  methods: {
    ...mapActions({
      getMatchRequest: 'football/getMatchRequest',
      sendUserPrognosis: 'football/sendUserPrognosis',
    }),

    setOtherLink() {
      this.prevLink = '/football/' + this.$route.params.event + '/' + String(Number(this.$route.params.number) - 1)
      this.nextLink = '/football/' + this.$route.params.event + '/' + String(Number(this.$route.params.number) + 1)
    },

    async sendPrognosis() {
      this.error = ''

      if (!this.data[18]) this.error = 'Вы ничего не заполнили'

      if (!this.error) {
        this.queryPrognosis.userToken = this.token
        this.queryPrognosis.fields = this.data

        this.data[17] = this.arMatch.id

        await this.sendUserPrognosis()
      }
    },

    setGoals(type, id) {

      if (type === 'zero') this.data[id] = 0

      if (type === 'minus') {
        if (this.data[id] > 0) this.data[id]--
      }

      if (type === 'plus') this.data[id]++

      if (type === 'two') this.data[id] = 2
      if (type === 'five') this.data[id] = 5

      this.data[28] = this.data[15] + this.data[16]

      this.data[19] = this.data[15] - this.data[16]

      if (this.data[19] > 0) this.data[18] = 'п1'
      if (this.data[19] === 0) this.data[18] = 'н'
      if (this.data[19] < 0) this.data[18] = 'п2'

    },

    setMath(operation, id, type = '') {
      if (operation === 'minus') {
        if (type === 'sum') {
          if (this.data[id] > 0) this.data[id]--
        } else {
          this.data[id]--
        }
      }

      if (operation === 'plus') this.data[id]++
    },

    setResult(res) {
      this.data[18] = res
    },

    rangeChange() {
      this.data[32] = this.$refs.iRange.value
    },

    setValue(type, id) {
      if (type === 'zero') this.data[id] = 0

      if (type === 'minus') {
        if (this.data[id] > 0) this.data[id]--
      }

      if (type === 'plus') this.data[id]++

      if (type === 'one') this.data[id] = 1
      if (type === 'five') this.data[id] = 5
      if (type === 'six') this.data[id] = 6

    },

    setRangeBtn(type) {
      if (type === 'minus') {
        if (this.data[32] > 0) this.data[32]--
      }

      if (type === 'plus') {
        if (this.data[32] < 101) this.data[32]++
      }

      if (type === 'half') this.data[32] = 50
    },

    async fillMatchElem() {
      this.queryMatch.number = this.$route.params.number
      this.queryMatch.eventId = this.$route.params.event
      this.queryMatch.userToken = this.token

      await this.getMatchRequest()
    }
  },
  computed: {
    ...mapState({
      arMatch: state => state.football.match,
      home: state => state.football.match.home,
      guest: state => state.football.match.guest,
      queryMatch: state => state.football.queryMatch,
      queryPrognosis: state => state.football.queryPrognosis,
      matchLoading: state => state.football.matchLoading,
      prognosisSuccess: state => state.football.prognosisSuccess,
      token: state => state.auth.authData.token,
      prognosis: state => state.football.match.prognosis,
      matchR: state => state.football.match.match_result,
      progR: state => state.football.match.prog_result,
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.match_title {
  background: @DarkColorBG;
  color: @colorText;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  padding: 4px;
  border-radius: 5px;

  gap: 4px;

  margin-bottom: 4px;

  .title_cell {
    .shadow_inset;
  }

}

.teams_block {
  background: @DarkColorBG;
  color: @colorText;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 4px;
  border-radius: 5px;

  gap: 4px;

  margin-bottom: 4px;

  .team {
    max-width: 46%;
    display: flex;
    flex-direction: row;
    gap: 4px;

    .flag {
      max-width: 24px;
      .shadow_inset;
      padding: 3px;
      .flex_center;

      img {
        width: 98%;
        max-width: 20px;
        border-radius: 3px;
      }
    }

    .name {
      max-width: 85%;
      width: 180px;
      .shadow_inset;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.name_home {
        text-align: left;
      }

      &.name_guest {
        text-align: right;
      }
    }
  }

}

.dash {
  .shadow_inset;
}

.prognosis_btn {
  background: @YesWrite;

  .flex_center;
  background: @colorText2;
  color: @colorText;
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 -1px 0 rgba(0, 0, 0, .2);
  padding: 2px 2px;
  font-size: 14px;
  border-radius: 3px;
  text-align: center;
  border: 1px solid transparent;
  text-decoration: none;
}

.value {
  .flex_center;
  .shadow_inset;
  width: 26px;
  height: 26px;
  border: 2px solid @YesWrite;
  padding: 2px 2px;
  font-size: 14px;
  border-radius: 3px;
}

.prognosis_block {
  background: @DarkColorBG;
  color: @colorText;
  padding: 4px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  gap: 4px;

  .pb_title {
    width: 24px;
    height: 24px;
    .shadow_inset;
    .flex_center;
    color: @maxdarkgrey;
    font-size: 18px;
    font-weight: 700;
    padding: 0;
  }

  .prognosis_dash_line {
    width: 100%;
    border-bottom: 1px dotted @maxdarkgrey;
  }

  .goals_block {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 4px;

    justify-content: space-between;

    .goals_block_title {
      img {
        width: 14px;
      }
    }

    .goal_block {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 3px;

      .value {
        .flex_center;
        .shadow_inset;
        width: 26px;
        height: 26px;
        border: 2px solid @YesWrite;
        padding: 2px 2px;
        font-size: 14px;
        border-radius: 3px;
      }

      .goal_btn {
        width: 26px;
        height: 26px;
        background: @YesWrite;

        .flex_center;
        background: @colorText2;
        color: @colorText;
        cursor: pointer;
        box-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 -1px 0 rgba(0, 0, 0, .2);
        padding: 2px 2px;
        font-size: 14px;
        border-radius: 3px;
        text-align: center;
        border: 1px solid transparent;
        text-decoration: none;
      }
    }
  }

  .match_math_block {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 3px;

    justify-content: space-between;

    .match_result_block {
      display: flex;
      flex-direction: row;

      gap: 4px;

      .match_result_title {
        img {
          width: 16px;
          height: 16px;
        }
      }

      .match_result_box {
        display: flex;
        flex-direction: row;
        gap: 2px;

        .match_result_el {
          .flex_center;
          .shadow_inset;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          font-size: 12px;
          border: 2px solid @maxdarkgrey;

          &.active {
            border-color: @YesWrite;
          }
        }
      }
    }

    .match_sum_block {
      display: flex;
      flex-direction: row;
      gap: 3px;

      .match_sum_title {

      }

      .match_sum_box {
        display: flex;
        flex-direction: row;
        gap: 3px;

        .math_btn {
          width: 24px;
          height: 24px;
          background: @YesWrite;

          .flex_center;
          background: @colorText2;
          color: @colorText;
          cursor: pointer;
          box-shadow: 0 2px 3px rgba(0, 0, 0, .4), 0 -1px 0 rgba(0, 0, 0, .2);
          padding: 2px 2px;
          font-size: 14px;
          border-radius: 3px;
          text-align: center;
          border: 1px solid transparent;
          text-decoration: none;
        }

        .value {
          .flex_center;
          .shadow_inset;
          width: 24px;
          height: 24px;
          border: 2px solid @YesWrite;
          padding: 2px 2px;
          font-size: 14px;
          border-radius: 3px;
        }
      }
    }
  }

  .match_domination_block {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 3px;

    .pb_title {
      width: 24px;
      height: 24px;
    }

    .match_domination_box {
      display: flex;
      flex-direction: row;
      gap: 3px;

      .domination_range {
        width: 204px;
        max-width: 59.8%;
      }

      .value {
        width: 24px;
        height: 24px;
      }

      .math_btn {
        .prognosis_btn;
        width: 24px;
        height: 24px;
      }
    }
  }

  .cards_block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .block {
      display: flex;
      flex-direction: row;
      gap: 3px;

      .title {
        .pb_title;
        width: 24px;
        height: 24px;
      }

      .box {
        display: flex;
        flex-direction: row;
        gap: 3px;
      }

      .value {
        width: 24px;
        height: 24px;
      }

      .btn {
        .prognosis_btn;
        width: 24px;
        height: 24px;
      }

      &.yellow {
        .title {
          color: @maxYellow;
        }

        .value {
          border-color: @maxYellow;
        }

        .btn {
          background: @maxYellow;
        }
      }

      &.red {
        .title {
          color: @maxred;
        }

        .value {
          border-color: @maxred;
        }

        .btn {
          background: @maxred;
        }
      }
    }

  }

  .corner_penalty_block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .block {
      display: flex;
      flex-direction: row;
      gap: 3px;

      .title {
        .pb_title;
        width: 24px;
        height: 24px;
      }

      .box {
        display: flex;
        flex-direction: row;
        gap: 3px;
      }

      .value {
        width: 24px;
        height: 24px;
      }

      .btn {
        .prognosis_btn;
        width: 24px;
        height: 24px;
      }

      &.penalty {
        .title {
          font-size: 24px;
        }
      }
    }
  }

  .btns_block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-top: 10px;

    .other_match_btn {
      .prognosis_btn;
      width: 26px;
      height: 26px;
    }

    .annotation_btn {
      .prognosis_btn;
      width: 140px;
      max-width: 40%;
    }

    .btn_send {
      .prognosis_btn;
      width: 140px;
      max-width: 40%;
    }

    .btn_gray {
      background: @maxdarkgrey;
      cursor: not-allowed;
    }
  }
}

.error_message {
  margin-top: 4px;
  width: 100%;
  padding: 4px 2px;
  border: 1px solid @warning;
  color: @warning;
  border-radius: 6px;
}

.btn_select_other_wrapper {
  background: @DarkColorBG;
  color: @colorText;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 4px;
  border-radius: 5px;

  gap: 4px;

  margin-top: 4px;

  .other_match_btn {
    .prognosis_btn;
    display: flex;
    flex-direction: row;
    gap: 4px;
    width: 140px;
    max-width: 40%;
  }
}

.annotation_block {
  background: @DarkColorBG;
  color: @colorText;
  display: flex;
  flex-direction: column;

  padding: 4px;
  border-radius: 5px;

  gap: 4px;

  margin-top: 4px;
}

.om_table_box {
  border-radius: 5px;
  th, td{
    padding: 2px;
    font-size: 11px;
  }

  .result{
    color: @NoWrite;
  }

  .prog_r{
    td{
      color: @colorBlur;
    }
    .green{
      color: @YesWrite;
    }
  }

}
</style>