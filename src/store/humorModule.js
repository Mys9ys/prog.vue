/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const humorModule = {
    state: () => ({

        prank: {},

        setToken: {},

        errors: {}

    }),

    getters: {},
    mutations: {

        setPrank(state, data) {
            state.setPrank = data
        },

        setErrors(state, data){
            state.errors = data
        }
    },
    actions: {
        async getOnePrank({state, commit}) {

            try {
                const response = await axios.post(baseConfig.BASE_URL + 'humor/one/', state.setToken,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    commit('setPrank', response.data.nearest)
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