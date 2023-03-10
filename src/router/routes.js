import MainPage from "@/pages/MainPage";

const routes = [
    {
        path: '/',
        component: MainPage,
        meta: {
            requiresAuth: true,
        }
    },
]

export default routes