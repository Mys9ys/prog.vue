import KvnEvent from "@/pages/kvn/KvnEvent";
import KvnGame from "@/pages/kvn/KvnGame";

export const kvnEvent = {
    path: '/kvn/',
    component: KvnEvent,
    meta: {
        requiresAuth: true,
    }
}

export const kvnGame =
    {
        path: '/kvn/:id',
        component: KvnGame
    }
