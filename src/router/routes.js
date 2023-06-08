import MainPage from "@/pages/MainPage";
import AuthPage from "@/pages/auth/AuthPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import {kvnEvent, kvnGame} from "@/pages/kvn/routes";
import CatalogPage from "@/pages/CatalogPage";
import FBCatalog from "@/pages/football/FBCatalog";
import FBEvent from "@/pages/football/FBEvent";
import RatingPage from "@/pages/RatingPage";
import MyProfilePage from "@/pages/MyProfilePage";
import ProfilePage from "@/pages/ProfilePage";
import RecoverMail from "@/pages/auth/RecoverMail";
import RecoverSuccess from "@/pages/auth/RecoverSuccess";
import HumorPage from "@/pages/HumorPage";
import HelloPage from "@/pages/HelloPage";
import NewsPage from "@/pages/NewsPage";
import RaceEvent from "@/pages/race/RaceEvent";
import RacePage from "@/pages/race/RacePage";
import FootballPage from "@/pages/football/FootballPage";

const routes = [
    {
        path: '/',
        component: HelloPage,
    },
    {
        path: '/main',
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
        path: '/ratings',
        component: RatingPage,
    },

    {
        path: '/football',
        component: FBCatalog,
    },

    {
        path: '/race/:event',
        component: RaceEvent,
    },

    {
        path: '/race/:event/:number',
        component: RacePage,
    },

    {
        path: '/humor',
        component: HumorPage,
    },

    {
        path: '/news',
        component: NewsPage,
    },

    {
        path: '/profile',
        component: MyProfilePage,
    },

    {
        path: '/profile/:id',
        component: ProfilePage,
    },

    {
        path: '/recover',
        component: RecoverMail,
    },
    {
        path: '/recover_success',
        component: RecoverSuccess,
    },

    {
        path: '/football/:event',
        component: FBEvent,
        props: true
    },

    {
        path: '/football/:event/:number',
        component: FootballPage,
        props: true
    },
    // квновские роуты -->
    kvnEvent,
    kvnGame
    // квновские роуты /-->
]

export default routes