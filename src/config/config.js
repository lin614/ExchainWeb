import Env from './env';

let config = {
    env: Env,
    url: {
        fee: 'https://stats.exchain.com', //'http://172.16.2.20:8893', //首页待分配收入api地址
        invite: 'https://invite.exchain.com', //'http://172.16.2.20:8891', //邀请相关接口地址
        exchange: 'http://172.16.2.31:8080', //'http://172.16.2.31:8080', 交易所相关接口
    },
    userid: '40006834'
};
export default config;