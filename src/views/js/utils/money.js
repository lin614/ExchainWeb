/**
* 去除千分位
*@param{Object}num
*/
export function toUnCommafy(num) {
    num = num + '';
    if (num.trim() == '') {
        return '';
    }
    num = num.replace(/,/gi, '');
    return num;
}

/**
 * 科学计数法转正常数字
 */
export function scientificNotation2Number(number) {
    if ((number + '').indexOf('e') !== -1) {
        let length = 0;
        // 还原小数点后数据长度
        // . 和 e 之间的数据长度
        if ((number + '').indexOf('.') !== -1) {
            length = (number + '').indexOf('e') - (number + '').indexOf('.') - 1
        }
        
        length += parseInt((number + '').split('-')[1]);
        return Number(number).toFixed(length);
    }
    return number;
}