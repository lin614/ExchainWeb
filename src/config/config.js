import Env from './env';

let config = {
    env: Env,
    url: {
        fee: 'https://stats.exchain.com', //首页待分配收入api地址
        invite: 'https://invite.exchain.com', //邀请相关接口地址
        user: 'https://service.exchain.com', //登录注册相关接口（主api)
        quote: 'wss://service.exchain.com/wsapp/', //行情相关接口

        domain: 'exchain.com',
        trade: 'https://www.exchain.com:44381' //交易
    },
    // userid: '40006834'
};
export default config;