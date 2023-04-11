import MainPage from "@/pages/MainPage";
import AuthPage from "@/pages/auth/AuthPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import {kvnEvent, kvnGame} from "@/pages/kvn/routes";
import CatalogPage from "@/pages/CatalogPage";
import FBMatch from "@/pages/football/FBMatch";
import FBCatalog from "@/pages/football/FBCatalog";
import FBEvent from "@/pages/football/FBEvent";

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

    {
        path: '/catalog',
        component: CatalogPage,
    },

    {
        path: '/football',
        component: FBCatalog,
    },

    {
        path: '/football/:event',
        component: FBEvent,
        props: true
    },

    {
        path: '/football/:event/:number',
        component: FBMatch,
        props: true
    },
    // квновские роуты -->
    kvnEvent,
    kvnGame
    // квновские роуты /-->
]

export default routes