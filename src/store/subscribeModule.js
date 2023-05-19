/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const subscribeModule = {
    state: () => ({

        subscribeToken: localStorage.getItem('sentFirebaseMessagingToken') || '',
        subscribeData: {},
        errors: {},


    }),

    getters: {},
    mutations: {

        setToken(state, data) {
            state.subscribeToken = data
        },

    },
    actions: {
        async setSubscribeRule({state, commit}) {

            try {
                const response = await axios.post(baseConfig.BASE_URL + 'subscribe/', state.subscribeData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    commit('setPrank', response.data.info)
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