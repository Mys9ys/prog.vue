/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const catalogModule = {
    state: () => ({
        catalogData: {},
        ratingEvents: {},

        queryData: {
            type: ''
        },

    }),

    getters: {},
    mutations: {
        setCatalogData(state, data) {
            state.catalogData = data
        },
        setRatingEvents(state, data) {
            state.ratingEvents = data
        },
    },
    actions: {

        async getEventsInfo({state, commit}) {
            try {

                const response = await axios.post(baseConfig.BASE_URL + 'events/', state.queryData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    if(state.queryData.type === 'catalog') {
                        commit('setCatalogData', response.data.result)
                    } else {
                        commit('setRatingEvents', response.data.result)
                    }

                } else {
                    commit('setError', response.data.mes)
                }

            } catch (e) {
                console.log('error', e)
            }
        },

    },
    namespaced: true
}
