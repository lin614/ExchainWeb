import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import cookie from 'js-cookie'
import VueI18n from 'vue-i18n';
import Locales from './locale';
import zhLocale from 'iview/dist/locale/zh-CN';
import enLocale from 'iview/dist/locale/en-US';
import ax from 'axios'
import LangZhCn from './static/i18n/zh-cn.js'
import LangEnUs from './static/i18n/en-us.js'
import assign from 'object-assign';
import bus from './views/js/eventBus.js'
import 'babel-polyfill'
import {
    apiError,
    javaApiReqError,
    apiReqError
} from './libs/utils/apiError.js'

import {
    sub,
    unsub
} from './views/js/channels'
import ws from './views/js/websocket.js'
global.ws = ws()
global.bus = bus
global.apiError = apiError;
global.apiReqError = apiReqError;
global.javaApiReqError = javaApiReqError;

import './static/icons/iconfont.css'
import './views/style/main.css'
import './libs/gt'
import './libs/gt.sense'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(iView);
Vue.locale = () => {};

import config from './config/config'
import {
    isBoolean
} from 'util';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

global.getHeader = (() => {
    return {
        headers: {
            'X-EXCHAIN-PN': cookie.get('PN', {
                domain: config.url.domain
            })
        }
    }
})()

//生成参数字符串
global.toParmStr = obj => {
    // var list = obj.map(p => p.key + '=' + p.value)
    var list = []
    for (var k in obj) {
        list.push(k + '=' + obj[k])
    }
    return list.join('&')
}
ax.defaults.headers.post['Content-Type'] = "application/json"
// ax.defaults.headers.post['referer'] = config.url.domain
// ax.defaults.headers.post['origin'] = config.url.domain
// 自动设置语言
const navLang = navigator.language;
let localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
if (localLang === 'zh-CN') {
    localLang = 'cn'
} else if (localLang === 'en-US') {
    localLang = 'en'
}
// const lang = window.localStorage.getItem('exchain_language') || localLang || 'cn';
// window.localStorage.setItem('exchain_language', lang);

const lang = cookie.get('exchain_language', {
    domain: config.url.domain
}) || localLang || 'cn';
cookie.set('exchain_language', lang, {
    domain: config.url.domain,
    expires: 0.08
})


Vue.config.lang = lang;
// console.log('lang = ' + lang)
// 多语言配置
// const locales = Locales;
const mergeZH = assign(LangZhCn, zhLocale);
const mergeEN = assign(LangEnUs, enLocale);

const messages = {
    cn: mergeZH,
    en: mergeEN
};

// Vue.locale('zh-CN', mergeZH);
// Vue.locale('en-US', mergeEN);
const i18n = new VueI18n({
    locale: lang,
    messages
})

// console.log('i18n', i18n);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

Vue.prototype.toTrade = function (pair) {
    pair = pair ? pair : 'btc_usdt'
    cookie.set('pair', pair, {
        domain: config.url.domain,
        expires: 0.08
    })

    window.location.href = config.url.trade
}

router.beforeEach((to, from, next) => {
    // console.log(to)
    if (!to.meta.noNeedLogin && cookie.get('PN', {
            domain: config.url.domain
        }) == null) {
        router.push('/login')
    }
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

/**
 * kyc 认证状态
 * 0 未验证
 * 1 审核中
 * 2 已通过
 * 3 被驳回
 */
const store = new Vuex.Store({
    state: {
        activeLang: lang,
        email: '',
        mtime: '',
        kycphoneStatus: '0',
        idCardStatus: '0',
        marketPrecision: '',
    },
    mutations: {
        setActiveLang(s, data) {
            s.activeLang = data
        },
        showUserInfo(s, data) {
            s.email = data.email
            s.mtime = data.mtime
        },
        setMarketPrecision(s, data) {
            s.marketPrecision = data
        }
    },
    getters: {
        // islogin: function () {

        // }
    },
    actions: {

    }
});

Vue.prototype.$initGeetest = window.initGeetest
Vue.prototype.$initSense = window.initSense

//关键词
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)
new Vue({
    el: '#app',
    router: router,
    i18n,
    store: store,
    render: h => h(App),
    mounted() {

    },
    metaInfo: {
        title: 'Exchain', // set a title
        meta: [{ // set meta
            name: 'keyWords',
            content: 'Exchain、Exchain交易所、交易所、买币、比特币、ETH、BTC、以太坊、USDT、ET、交易即挖矿、合作伙伴'
        }],
        link: [{
            rel: 'asstes',
            href: 'https://www.exchain.com/'
        }]
    }
});