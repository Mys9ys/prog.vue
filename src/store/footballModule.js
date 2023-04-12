/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const footballModule = {
    state: () => ({
        matches: [],

        queryEvent: {
            eventID:'',
            userToken: ''
        },

    }),

    getters: {},
    mutations: {
        setMatchesData(state, data) {
            state.matches = data
        },
    },
    actions: {

        async getEventMatchesRequest({state, commit}) {

            try {
                const response = await axios.post(baseConfig.BASE_URL + 'football/', state.queryEvent,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    commit('setMatchesData', response.data.matches)
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
