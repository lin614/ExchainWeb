const routers = [{
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    }, {
        path: '/bonus',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/bonus.vue'], resolve)
    },
    {
        path: '/partner',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/partner.vue'], resolve)
    },
    {
        path: '/et',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/et.vue'], resolve)
    },
    {
        path: '/priv',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/priv.vue'], resolve)
    },
    {
        path: '/cont',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/cont.vue'], resolve)
    },
    {
        path: '/invite',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/invite.vue'], resolve)
    }, {
        path: '/paper',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/paper.vue'], resolve)
    }, {
        path: '/reg',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/reg.vue'], resolve)
    }, {
        path: '/login',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    }
];
export default routers;