import MainPage from "@/pages/MainPage";
import KvnEvent from "@/pages/kvn/KvnEvent";

const routes = [
    {
        path: '/',
        component: MainPage,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/kvn/',
        component: KvnEvent,
        meta: {
            requiresAuth: true,
        }
    },
]

export default routes