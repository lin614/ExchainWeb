import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'Exchain';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8888' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.fourDigit =  (value, s) => {
    if (isNaN(value) || value === '' || value === null) {
        return ''
    }
    const num = value.toString().split('.')
    if (num.length === 1) {
        return value.toString()
    } else if (num[1].length >= s) {
        return num[0] + '.' + num[1].substring(0, s)
    } else {
        return value.toString()
    }
}

util.checkPointNum = (value, s) => {
    //由于币种特性，提币数量只支持输入小数点后4位。
    const num = value.toString().split('.')
    if (num.length === 1) {
        return ''
    } else if (num[1].length >= s) {
        return '由于币种特性，提币数量只支持输入小数点后' + s + '位。'
    }
}

/**
 * 
 * @param {Array} arr  表头数组
 * @param {Number} count   表头展示格数
 * @param {String} langStr   i18n字符串
 * @param {Object} vu   Vue 实例
 */
util.toggleTableHeaderLang = (arr, count, langStr, vu) => {
    arr.forEach((value, index) => {
        if (index > count) {
            return
        } else {
            var title = vu.$t(langStr + value.key)
            value.title = title
        }
    })
}

export default util;