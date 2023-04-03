import MainPage from "@/pages/MainPage";
import KvnEvent from "@/pages/kvn/KvnEvent";
import AuthPage from "@/pages/auth/AuthPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import KvnGame from "@/pages/kvn/KvnGame";

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
        path: '/kvn/:id',
        component: KvnGame
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