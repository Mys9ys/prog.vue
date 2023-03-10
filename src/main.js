import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import store from "@/store";
import router from "@/router/router";
import directives from "@/directives";
const app = createApp(App)

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(store)
    .use(router)
    .mount('#app')