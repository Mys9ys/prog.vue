/* eslint-disable */
import axios from "axios";

export const kvnModule = {
    state: () => ({
        kvnEventData: {}
    }),
    getters: {
        getGames(state){
            return state.kvnEventData.games

        },
        getEventInfo(state){
            return state.kvnEventData.event_active
        }
    },
    mutations: {
        setEventData(state, kvnEventData){
            state.kvnEventData = kvnEventData
        }
    },
    actions: {
        async fetchAnswer({state, commit}) {
            try {
                const response = await axios.get('http://prog.work/mys_ajax/kvnevents/',{})
                commit('setEventData', response.data)
                console.log(response.data)
            }  catch (e) {
                console.log('error', e)
            }
        }
    },
    namespaced: true

}