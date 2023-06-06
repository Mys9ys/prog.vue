/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const ratingModule = {
    state: () => ({
        footballRating: [],

        raceRating: [],

        ratingData: {
            event: '',
        },

    }),
    getters: {},
    mutations: {
        setFootballRatings(state, data) {
            state.footballRating = data
        },

        setRaceRatings(state, data){
            state.raceRating = data
        }

    },
    actions: {
        async getFootballRatings({state, commit}) {
            try {
                const response = await axios.post(baseConfig.BASE_URL + 'football/ratings/', state.ratingData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    commit('setFootballRatings', response.data.ratings)
                } else {
                    if (response.data.status == 'error') {
                        commit('setError', response.data.mes)
                    } else {
                        commit('setError', 'Что то пошло не так')
                    }
                }


            } catch (e) {
                console.log('error', e)
            }
        },

        async getRaceRatings({state, commit}) {
            try {
                const response = await axios.post(baseConfig.BASE_URL + 'race/ratings/', state.ratingData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    console.log('response.data.ratings',response.data.ratings)
                    commit('setRaceRatings', response.data.ratings)
                } else {
                    if (response.data.status == 'error') {
                        commit('setError', response.data.mes)
                    } else {
                        commit('setError', 'Что то пошло не так')
                    }
                }

            } catch (e) {
                console.log('error', e)
            }
        },
    },
    namespaced: true

}