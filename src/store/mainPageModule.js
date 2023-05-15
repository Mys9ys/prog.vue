/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const mainPageModule = {
    state: () => ({

        footballNearest: {},

        setToken: {},

        errors: {}

    }),

    getters: {},
    mutations: {

        setFootballNearest(state, data) {
            state.footballNearest = data
        },

        setErrors(state, data){
            state.errors = data
        }
    },
    actions: {
        async getFootballNearest({state, commit}) {

            console.log('set token', state.setToken)

            try {
                const response = await axios.post(baseConfig.BASE_URL + 'main_page/', state.setToken,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    console.log('axios response Nearest', response.data)
                    commit('setFootballNearest', response.data.nearest)
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