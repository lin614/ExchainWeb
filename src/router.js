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
        component: (resolve) => require(['./views/index2.vue'], resolve)
    },
    {
        path: '/partner',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/partner.vue'], resolve)
    }
];
export default routers;