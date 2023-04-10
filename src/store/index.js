import {createStore} from "vuex";
import {kvnModule} from "@/store/kvnModule";
import {authModule} from "@/store/authModule";

export default createStore({
    modules: {
        kvn: kvnModule,
        auth: authModule
    }
})
