import Env from './env';

let config = {
    env: Env,
    url: {
        fee: 'https://stats.exchain.com', //'http://172.16.2.20:8893', //首页待分配收入api地址
        invite: 'https://invite.exchain.com', //'http://172.16.2.20:8891', //邀请相关接口地址
        // user: 'http://172.16.2.31:8080', //登录注册相关接口
        // quote: 'ws://172.16.2.31:8080/wsapp/' //行情相关接口
        user: 'http://service.stockchain.cn', //登录注册相关接口
        quote: 'ws://service.stockchain.cn/wsapp/', //行情相关接口
        domain: 'stockchain.cn',
        trade:'http://www.stockchain.cn:81/', //交易地址
    },
    userid: '40006834'
};
export default config;