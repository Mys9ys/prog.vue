/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const profileModule = {
    state: () => ({
        profileRequest: {},
        profileData: {},
    }),

    getters: {},
    mutations: {
        setProfileData(state, data) {
            state.profileData = data
        },
    },
    actions: {

        async getProfileData({state, commit}) {
            commit('setMainLoading', true, { root: true })
            try {
                const response = await axios.post(baseConfig.BASE_URL + 'profile/', state.profileRequest,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    commit('setProfileData', response.data.profile)
                } else {
                    if(response.data.mes) {
                        commit('setError', response.data.mes)
                    } else {
                        commit('setError', 'что то не так')
                    }
                }

            } catch (e) {
                console.log('error', e)
            }
        },

    },
    namespaced: true
}
