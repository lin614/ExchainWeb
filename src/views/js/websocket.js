import decode from './decode';
import EventBus from './eventBus';
import config from '../../config/config'

const SOCKET_URL_WS = config.url.quote //"ws://58.87.100.210:8080";
// const SOCKET_URL_WSS = "wss://ws.stockchain.co";
// const DEFAULT_URL = "https:" === window.location.protocol? SOCKET_URL_WSS:SOCKET_URL_WS;
const DEFAULT_URL = SOCKET_URL_WS;

const STATUS = {
    connecting: 0,
    open: 1,
    closing: 2,
    closed: 3
};

const heartBeat = (WS) => {
    let params = {
        event: "req",
        channel: "heart_beat"
    };
    setInterval(() => {
        WS.send(JSON.stringify(params));
    }, 25 * 1000);
};

export default (url = DEFAULT_URL) => {
    if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持WebSocket,请升级您的浏览器！');
        return
    }
    const WS = new WebSocket(url);
    WS.onopen = (e) => {
        etLog('WebSocket open');
    };

    WS.onclose = (e) => {
        etLog(`${url} onclose: ${e}`);
        window.checkNet = setInterval(function () {
            if (navigator.onLine) {
                window.checkNet = null
                // window.location.reload()
            }
        }, 1000)
    };

    WS.onerror = (e) => {
        etLog(`${url} onerror: ${e}`);
    };

    WS.onmessage = (e) => {
        let data = decode(e.data);
        let msg = JSON.parse(data);
        etLog('onmessage', msg.channel)
        etLog('onmessage', msg.data)
        if (msg.status === 0) {
            EventBus.$emit("wsUpdate", msg);
        }
    };

    WS.postData = function (data, callback) {
        data = typeof data === "object" ? JSON.stringify(data) : data;
        this.waitForConnection(() => {
            WS.send(data);
            if (typeof callback !== 'undefined') {
                callback();
            }
        }, 100);
    };

    WS.waitForConnection = (callback, interval) => {
        if (WS.readyState === STATUS.open) {
            callback();
        } else {
            setTimeout(() => {
                WS.waitForConnection(callback, interval);
            }, interval);
        }
    };

    heartBeat(WS);
    return WS;
}