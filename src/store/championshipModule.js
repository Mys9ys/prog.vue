/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const championshipModule = {
    state: () => ({

        raceData: {},
        footballData: {},
        queryData: {},
        errors: {},
    }),

    getters: {},
    mutations: {
        setRaceData(state, data){
            state.raceData = data
        },
        setFootballData(state, data){
            state.footballData = data
        }
    },
    actions: {
        async getRaceTable({state, commit}) {

            try {
                const response = await axios.post(baseConfig.BASE_URL + '/championship/race/', state.queryData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    commit('setRaceData', response.data.result)
                } else {
                    commit('setErrors', response.data.mes)
                }

            } catch (e) {
                console.log('error', e)
            }
        },

        async getFootballTable({state, commit}) {

            try {
                const response = await axios.post(baseConfig.BASE_URL + '/championship/football/', state.queryData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    commit('setFootballData', response.data.result)
                } else {
                    commit('setErrors', response.data.mes)
                }

            } catch (e) {
                console.log('error', e)
            }
        },


    },


    namespaced: true

}