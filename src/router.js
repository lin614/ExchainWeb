const routers = [{
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    }
    // , {
    //     path: '/bonus',
    //     meta: {
    //         title: ''
    //     },
    //     component: (resolve) => require(['./views/index2.vue'], resolve)
    // },
    // {
    //     path: '/partner',
    //     meta: {
    //         title: ''
    //     },
    //     component: (resolve) => require(['./views/partner.vue'], resolve)
    // },
    // {
    //     path: '/et',
    //     meta: {
    //         title: ''
    //     },
    //     component: (resolve) => require(['./views/et.vue'], resolve)
    // },
    // {
    //     path: '/priv',
    //     meta: {
    //         title: ''
    //     },
    //     component: (resolve) => require(['./views/components/priv.vue'], resolve)
    // },
    // {
    //     path: '/cont',
    //     meta: {
    //         title: ''
    //     },
    //     component: (resolve) => require(['./views/components/cont.vue'], resolve)
    // },
    // {
    //     path: '/invite',
    //     meta: {
    //         title: ''
    //     },
    //     component: (resolve) => require(['./views/components/invite.vue'], resolve)
    // }, {
    //     path: '/paper',
    //     meta: {
    //         title: ''
    //     },
    //     component: (resolve) => require(['./views/paper.vue'], resolve)
    // }
];
export default routers;