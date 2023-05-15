import {createStore} from "vuex";
import {kvnModule} from "@/store/kvnModule";
import {authModule} from "@/store/authModule";
import {regModule} from "@/store/regModule";
import {footballModule} from "@/store/footballModule";
import {catalogModule} from "@/store/catalogModule";
import {ratingModule} from "@/store/ratingModule";
import {recoverModule} from "@/store/recoverModule";
import {profileModule} from "@/store/profileModule";
import {iconModule} from "@/store/iconModule";
import {mainPageModule} from "@/store/mainPageModule";

export default createStore({
    state: {
        mainLoader: false,
    },

    mutations: {
        setMainLoading(state, data){
            console.log('loading main', data)
            state.mainLoader = data
        }
    },
    modules: {
        kvn: kvnModule,
        auth: authModule,
        reg: regModule,
        football: footballModule,
        catalog: catalogModule,
        rating: ratingModule,
        recover: recoverModule,
        profile: profileModule,
        icons: iconModule,
        mainPage: mainPageModule
    },
    root: true
})
