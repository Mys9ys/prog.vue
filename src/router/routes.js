import MainPage from "@/pages/MainPage";
import AuthPage from "@/pages/auth/AuthPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import {kvnEvent, kvnGame} from "@/pages/kvn/routes";

const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/auth',
        component: AuthPage,
    },
    {
        path: '/register',
        component: RegisterPage,
    },
    // квновские роуты -->
    kvnEvent,
    kvnGame
    // квновские роуты /-->
]

export default routes