import {createStore} from "vuex";
import {kvnModule} from "@/store/kvnModule";

export default createStore({
    modules: {
        kvn: kvnModule
    }
})
