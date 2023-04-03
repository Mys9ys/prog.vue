import MainPage from "@/pages/MainPage";
import KvnEvent from "@/pages/kvn/KvnEvent";
import AuthPage from "@/pages/auth/AuthPage";
import RegisterPage from "@/pages/auth/RegisterPage";

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
    {
        path: '/auth',
        component: AuthPage,
    },
    {
        path: '/register',
        component: RegisterPage,
    },
]

export default routes