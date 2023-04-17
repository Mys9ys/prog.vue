import {createStore} from "vuex";
import {kvnModule} from "@/store/kvnModule";
import {authModule} from "@/store/authModule";
import {regModule} from "@/store/regModule";
import {footballModule} from "@/store/footballModule";
import {catalogModule} from "@/store/catalogModule";

export default createStore({
    state: {
        loading: true,
    },
    modules: {
        kvn: kvnModule,
        auth: authModule,
        reg: regModule,
        football: footballModule,
        catalog: catalogModule
    }
})
