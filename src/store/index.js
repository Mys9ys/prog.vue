import {createStore} from "vuex";

export default createStore({
    state: {

    },

    getters: {
        isAuth(state) {
            return state.auth
        }
    },
    actions: {
        authSuccess({commit}){
            console.log('authSuccess')
            commit('IS_AUTH')
        }
    },
    mutations: {
        IS_AUTH(state){
            console.log('IS_AUTH')
            state.auth = true
        }

        // logout(state) {
        //     state.auth = false
        // },
    }
})
