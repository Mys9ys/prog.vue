/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const footballModule = {
    state: () => ({
        matches: [],

        match: [],

        queryEvent: {
            eventId:'',
            userToken: ''
        },

        queryMatch: {
            eventId:'',
            userToken: '',
            number: ''
        },

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

        setMatchLoading(state){
            console.log('setMatchLoading')
            state.matchLoading = false
        }
    },
    actions: {

        async getEventMatchesRequest({state, commit}) {

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
                    commit('setMatchesData', response.data.matches)
                    commit('setMatchLoading')
                }
                if (response.data.status == 'error') {
                    commit('setError', response.data.mes)
                }

            } catch (e) {
                console.log('error', e)
            }
        },

        async getMatchRequest({state, commit}) {

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
                    commit('setMatchLoading')
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
