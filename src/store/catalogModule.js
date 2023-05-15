/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const catalogModule = {
    state: () => ({
        eventsData: [],

        catalogData: {
            type: ''
        },

    }),

    getters: {},
    mutations: {
        setEventsData(state, eventsData) {
            state.eventsData = eventsData
        },
    },
    actions: {

        async getEventsInfo({state, commit}) {
            try {

                const response = await axios.post(baseConfig.BASE_URL + 'events/', state.catalogData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    commit('setEventsData', response.data.info)
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
