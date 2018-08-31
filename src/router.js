const routers = [{
        path: '/',
        meta: {
            title: '',
            noNeedLogin: true
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
            title: '',
            noNeedLogin: true
        },
        component: (resolve) => require(['./views/partner.vue'], resolve)
    },
    {
        path: '/et',
        meta: {
            title: '',
            noNeedLogin: true
        },
        component: (resolve) => require(['./views/et.vue'], resolve)
    },
    {
        path: '/priv',
        meta: {
            title: '',
            noNeedLogin: true
        },
        component: (resolve) => require(['./views/priv.vue'], resolve)
    },
    {
        path: '/cont',
        meta: {
            title: '',
            noNeedLogin: true
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
            title: '',
            noNeedLogin: true
        },
        component: (resolve) => require(['./views/paper.vue'], resolve)
    }, {
        path: '/reg',
        meta: {
            title: '',
            noNeedLogin: true
        },
        component: (resolve) => require(['./views/reg.vue'], resolve)
    }, {
        path: '/reset',
        meta: {
            title: '',
            noNeedLogin: true
        },
        component: (resolve) => require(['./views/reset.vue'], resolve)
    },
    {
        path: '/reg/:code',
        meta: {
            title: '',
            noNeedLogin: true
        },
        component: (resolve) => require(['./views/reg.vue'], resolve)
    }, {
        path: '/login',
        meta: {
            title: '',
            noNeedLogin: true
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
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
        path: '/usercenter/financeRecord',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/userCenter/financeRecord.vue'], resolve)
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
    }, {
        path: '*',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/notFound.vue'], resolve)
    }
];
export default routers;

// {
//     path: '/usercenter/manageaddr',
//     meta: {
//         title: ''
//     },
//     component: (resolve) => require(['./views/userCenter/manageAddr.vue'], resolve)
// }