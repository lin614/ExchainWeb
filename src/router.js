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
        path: '/usercenter',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/userCenter/index.vue'], resolve)
    }, {
        path: '/usercenter/entrust',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/userCenter/entrust.vue'], resolve)
    }, {
        path: '/usercenter/asset',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/userCenter/asset.vue'], resolve)
    }, {
        path: '/usercenter/kyc',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/userCenter/kyc.vue'], resolve)
    }, {
        path: '/usercenter/bind',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/userCenter/bindPhone.vue'], resolve)
    }
];
export default routers;