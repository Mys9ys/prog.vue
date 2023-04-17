/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const footballModule = {
    state: () => ({
        matches: [],

        match: [],

        prognosis: [],

        queryEvent: {
            eventId:'',
            userToken: ''
        },

        queryMatch: {
            eventId:'',
            userToken: '',
            number: ''
        },

        queryPrognosis: {
            userToken: '',
            fields: []
        },

        prognosisSuccess: false,

        matchLoading: true,

    }),

    getters: {},
    mutations: {
        setMatchesData(state, data) {
            state.matches = data
        },

        setMatchData(state, data) {
            state.match = data
        },

        setPrognosisData(state, prognosis){
            state.prognosis = prognosis
        },

        setMatchLoading(state, data){
            state.matchLoading = data
        },
        setPrognosisSuccess(state, data){
            state.prognosisSuccess = data
        }
    },
    actions: {

        async getEventMatchesRequest({state, commit}) {
            commit('setMatchLoading', true)
            try {
                const response = await axios.post(baseConfig.BASE_URL + 'football/matches/', state.queryEvent,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    commit('setMatchesData', response.data.res)
                    commit('setPrognosisData', response.data.res.prognosis)
                    commit('setMatchLoading', false)
                }
                if (response.data.status == 'error') {
                    commit('setError', response.data.mes)
                }

            } catch (e) {
                console.log('error', e)
            }
        },

        async getMatchRequest({state, commit}) {

            commit('setMatchLoading', true)
            try {
                const response = await axios.post(baseConfig.BASE_URL + 'football/match/', state.queryMatch,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    commit('setMatchData', response.data.match)
                    commit('setMatchLoading', false)
                }
                if (response.data.status == 'error') {
                    commit('setError', response.data.mes)
                }

            } catch (e) {
                console.log('error', e)
            }
        },

        async sendUserPrognosis({state, commit}) {

            commit('setMatchLoading', true)
            try {
                const response = await axios.post(baseConfig.BASE_URL + 'football/send/', state.queryPrognosis,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    commit('setMatchLoading', false)
                    commit('setPrognosisSuccess', true)
                }
                if (response.data.status == 'error') {
                    commit('setError', response.data.mes)
                }

            } catch (e) {
                console.log('error', e)
            }
        },

    },
    namespaced: true
}
