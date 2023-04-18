import {createStore} from "vuex";
import {kvnModule} from "@/store/kvnModule";
import {authModule} from "@/store/authModule";
import {regModule} from "@/store/regModule";
import {footballModule} from "@/store/footballModule";
import {catalogModule} from "@/store/catalogModule";
import {ratingModule} from "@/store/ratingModule";

export default createStore({
    state: {
        mainLoader: false,
    },

    mutations: {
        setMainLoading(state, data){
            state.mainLoader = data
        }
    },
    modules: {
        kvn: kvnModule,
        auth: authModule,
        reg: regModule,
        football: footballModule,
        catalog: catalogModule,
        rating: ratingModule
    },
    root: true
})
