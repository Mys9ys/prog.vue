/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const championshipModule = {
    state: () => ({

        queryData: {},
        requestData: {},
        errors: {},
    }),

    getters: {},
    mutations: {
        setRequestData(state, data){
            state.requestData = data
        }
    },
    actions: {
        async getRaceTable({state, commit}) {

            try {
                const response = await axios.post(baseConfig.BASE_URL + '/championship/race/', state.subscribeData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    commit('setRequestData', response.data.result)
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