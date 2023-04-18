/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const ratingModule = {
    state: () => ({
        footballRating: [],

        ratingData: {
            event: '',
        }
    }),
    getters: {},
    mutations: {
        setFootballRatings(state, data) {
            state.footballRating = data
        },
    },
    actions: {
        async getFootballRatings({state, commit}) {
            commit('setMainLoading', true, { root: true })
            try {
                const response = await axios.post(baseConfig.BASE_URL + 'football/ratings/', state.ratingData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    commit('setFootballRatings', response.ratings)
                    commit('setMainLoading', false, { root: true })
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