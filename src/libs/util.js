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

/**
 * 
 * 密码为8-20个字符且至少包含数字、字母和符号中的两种
 * @param {String} pwd  密码
 */
util.checkPwd = (pwd) => {
    var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![~!@#$%^&*()_+{}|:"<>?/*-.`\[';,/\]]+$)[~!@#$%^&*()_+{}|:"<>?/*-.`\[';,/\]0-9A-Za-z]{8,20}$/
    return reg.test(pwd)
}

/**
 * 
 * 根据国家码不同采用不同的校验正则
 * @param {Number} nationality 国家码
 * @param {String} phone 手机号
 */
util.checkPhone = (nationality, phone) => {
    switch (nationality) {
        case 86: {
            var reg = /^1[3-9]\d{9}$/
            return reg.test(phone)
        } break
    }
}

/**
 * 
 * 校验币的地址
 * @param {String} addr 地址
 */
util.checkAddr = (addr) => {
    var reg = /^[A-Za-z0-9\+\/\=]+$/
    return reg.test(addr)
}

/**
 * 
 * 校验邮箱
 * @param {String} email 邮箱
 */
util.checkEmail = (email) => {
    var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    return reg.test(email)
}

/**
 * 
 * 校验验证码
 * @param {String} code 验证码
 */
util.checkCode = (code) => {
    var reg = /^[A-Za-z0-9]+$/
    return reg.test(code)
}

export default util;