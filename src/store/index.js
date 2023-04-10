import {createStore} from "vuex";
import {kvnModule} from "@/store/kvnModule";
import {authModule} from "@/store/authModule";
import {regModule} from "@/store/regModule";

export default createStore({
    modules: {
        kvn: kvnModule,
        auth: authModule,
        reg: regModule
    }
})
