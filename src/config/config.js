import Env from './env';

let config = {
    env: Env,
    url: {
        fee: 'http://stats.exchain.com', //首页待分配收入api地址
        invite: 'http://invite.exchain.com', //邀请相关接口地址
        user: 'http://service.exchain.com', //登录注册相关接口（主api)
        quote: 'ws://service.exchain.com/wsapp/', //行情相关接口

        domain: 'exchain.com',
        // trade: 'http://dash.exchain.com:81', //交易地址
        trade: 'http://www.exchain.com:81'
    },
    // userid: '40006834'
};
export default config;