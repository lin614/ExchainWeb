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
import bus from './views/js/eventBus.js'
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
    domain: config.url.domain
})


Vue.config.lang = lang;
console.log('lang = ' + lang)
// 多语言配置
// const locales = Locales;
const mergeZH = Object.assign(LangZhCn, zhLocale);
const mergeEN = Object.assign(LangEnUs, enLocale);

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

console.log('i18n', i18n);

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

new Vue({
    el: '#app',
    router: router,
    i18n,
    store: store,
    render: h => h(App),
    mounted() {
        var aa = 'China 0086  HongKong(China) 00852  Taiwan(China) 00886  Japan 0081  Korea 0082  UnitedKingdom 0044  Germany 0049  Canada 001  Albania 00355  Algeria 00213  Andorra 00376  Angola 00244  Anguilla 001264  AntiguaandBarbuda 001268  Argentina 0054  Armenia 00374  Aruba 00297  Ascension 00247  Australia 0061  Australianoverseasterritories 00672  Austria 0043  Azerbaijan 00994  Bahamas 001242  Bahrain 00973  Barbados 001246  Belgium 0032  Belize 00501  Benin 00229  Bermuda 001441  Bhutan 00975  BosniaandHerzegovina 00387  Botswana 00267  Brazil 0055  BritishVirginIslands 001284  Brunei 00673  Bulgaria 00359  BurkinaFaso 00226  Burundi 00257  Cambodia 00855  Canada 001  CapeVerde 00238  CaymanIslands. 001345  Chile 0056  China 0086  Colombia 0057  ComorosIslands 00269  CookIslands. 00682  CostaRica 00506  Croatia 00385  Cyprus 00357  CzechRepublic 00420  Denmark 0045  DiegoGarcia 00246  Djibouti 00253  DominicanRepublic 001809  EastTimor 00670  Egypt 0020  ElSalvador 00503  EquatorialGuinea 00240  Eritrea 00291  Estonia 00372  Ethiopia 00251  FalklandIslands 00500  FaroeIslands 00298  Fiji 00679  Finland 00358  France 0033  FrenchGuiana 00594  FrenchPolynesia 00689  Gabon 00241  Gambia 00220  Georgia 00995  Germany 0049  Ghana 00233  Gibraltar 00350  Greece 0030  Greenland 00299  Grenada 001473  Guadeloupe 00590  Guam 001671  Guatemala 00502  Guinea - Bissau 00245  Guyana 00592  Haiti 00509  Honduras 00504  HongKong(China) 00852  Hungary 0036  Iceland 00354  India 0091  Indonesia 0062  Ireland 00353  Israel 00972  Italy 0039  Jamaica 001876  Japan 0081  Jordan 00962  Kazakstan 007  Kenya 00254  Kiribati 00686  Korea 0082  Kuwait 00965  Kyrgyzstan 00996  Laos 00856  Latvia 00371  Lesotho 00266  Liechtenstein 00423  Lithuania 00370  Luxembourg 00352  Macedonia 00389  Madagascar 00261  Malawi 00265  Malaysia 0060  Maldives 00960  Mali 00223  Malta 00356  MarshallIslands 00223  MarshallIslands 00692  Martinique 00596  Mauritania 00222  Mauritius 00230  Mexico 0052  Micronesia 00691  Moldova 00373  Monaco 00377  Mongolia 00976  Montenegro 00382  Montserrat 001664  Morocco 00212  Mozambique 00258  Namibia 00264  Nauru 00674  Nepal 00977  NetheriandsAntilles 00599  Netherlands 0031  NewZealand 0064  NewCaledonia 00687  Nicaragua 00505  Niger 00227  Nigeria 00234  Niue 00683  Norway 0047  Oman 00968  Palau 00680  Palestine 00970  Panama 00507  PapuaNewCuinea 00675  Paraguay 00595  Peru 0051  Philippines 0063  Poland 0048  Portugal 00351  PuertoRico 001  Qatar 00974  Reunion 00262  Romania 0040  Russia 007  Rwanda 00250  SaintLueia 001758  SaintVincent 001784  SaintPierreandMiquelon 00508  SamoaEastern 00684  SamoaWestern 00685  SanMarino 00378  SaoTomeandPrincipe 00239  SaudiArabia 00966  Senegal 00221  Serbia 00381  Seychelles 00248  SierraLeone 00232  Singapore 0065  Slovakia 00421  Slovenia 00386  SolomonIslands 00677  SouthAfrica 0027  Spain 0034  SriLanka 0094  St.Helena 00290  St.Lucia 001758  St.Vincent 001784  Suriname 00597  Swaziland 00268  Sweden 0046  Switzerland 0041  Taiwan(China) 00886  Tajikstan 00992  Tanzania 00255  Thailand 0066  Togo 00228  Tokelau 00690  Tonga 00676  TrinidadandTobago 001868  Tunisia 00216  Turkey 0090  Turkmenistan 00993  Tuvalu 00688  Uganda 00256  Ukraine 00380  UnitedArabEmirates 00971  UnitedKingdom 0044  Uruguay 00598  Uzbekistan 00998  Vanuatu 00678  VaticanCity 00379  Venezuela 0058  Vietnam 0084  WallisandFutuna 00681  Yugoslavia 00338  Zaire 00243 Zambia 00260'
        var i = 0
        var list = aa.split(' ')
        var str = ''

        for (var a in list) {
            if (list[a].trim()) {
                i++
                str += list[a] + (i % 2 == 1 ? ":" : ',')
            }

        }
        console.log(str.substr(0, str.length - 1))
       

    }
});