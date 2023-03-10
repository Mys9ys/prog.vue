
const routes = [
    {
        path: '/',
        component: MainPage,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/patients',
        component: PatientsPage,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/bonus',
        component: BonusPage,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/profile',
        component: ProfilePage,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/hello',
        name: 'hello',
        component: NotAuthHello
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/auth',
        component: AuthPage
    },
    {
        path: '/auth_success',
        component: AuthSuccess
    },
    {
        path: '/recover',
        component: RecoverPage,
    },
    {
        path: '/recover_mail',
        component: RecoverMail
    },
    {
        path: '/recover_sms',
        component: RecoverSms
    },
    {
        path: '/recover_success',
        component: RecoverSuccess
    },
    {
        path: '/patient_send',
        component: PatientSend
    },
    {
        path: '/send_success',
        component: SendSuccess
    },

]

export default routes