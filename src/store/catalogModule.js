/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const catalogModule = {
    state: () => ({
        eventsData: []
    }),

    getters: {},
    mutations: {
        setEventsData(state, eventsData) {
            state.eventsData = eventsData
        },
    },
    actions: {

        async authRequest({state, commit}) {

            try {
                const response = await axios.post(state.baseUrl + 'events/', state.loginData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    commit('setEventsData', response.data.events)
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