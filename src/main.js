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
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';
import ax from 'axios'
import LangZhCn from './static/i18n/zh-cn'
import LangEnUs from './static/i18n/en-us'
import bus from './views/js/eventBus.js'
import {
    sub,
    unsub
} from './views/js/channels'
import ws from './views/js/websocket.js'
global.ws = ws()
global.bus = bus

import './static/icons/iconfont.css'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(iView);

import config from './config/config'
import {
    isBoolean
} from 'util';
ax.defaults.headers.post['Content-Type'] = "application/json"
// ax.defaults.headers.post['referer'] = config.url.domain
// ax.defaults.headers.post['origin'] = config.url.domain
// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);
const i18n = new VueI18n({
    locale: lang,
    messages: {
        'cn': LangZhCn,
        'en': LangEnUs
    }
})


// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

Vue.prototype.toTrade = function (pair) {
    pair = pair ? pair : 'btc_usdt'
    cookie.set('pair', pair, {
        domain: config.url.domain
    })

    window.location.href = config.url.trade
}

router.beforeEach((to, from, next) => {
    console.log(to)
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


const store = new Vuex.Store({
    state: {
        currentLang: 'cn',
        email: '',
        mtime: ''
    },
    mutations: {

        changeLang(s, data) {
            s.currentLang = data
        },
        showUserInfo(s, data) {
            s.email = data.email
            s.mtime = data.mtime
        },

    },
    getters: {
        // islogin: function () {

        // }
    },
    actions: {

    }
});

// window.onbeforeunload = function (event) {
//     console.log('bd')
//     localStorage.clear()
//     return confirm("确定退出吗")
// }

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted() {}
});