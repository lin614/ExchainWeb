import {scientificNotation2Number} from '../../views/js/utils/money'

export const formatMarketPrecision = (number, market, type, vu) => {
    number = scientificNotation2Number(number);
    if (typeof number === 'undefined' || typeof market === 'undefined' || isNaN(parseFloat(number))) {
        return '';
    }
    number = number + '';
    if (market.indexOf('_') !== -1) {
        var arr = list[i].pair.split('_')
        market = arr.join('/').toUpperCase()
    }

    let marketPrecision = vu.$store.state.marketPrecision;

    for (var o in marketPrecision) {
        if (market === o) {
            let length = 0;
            if (type === 'amount') {
                length = marketPrecision[o].amount_precision;
            } else if (type === 'price'){
                length = marketPrecision[o].price_precision;
            } else {
                let tmp1 = marketPrecision[o].amount_precision;
                let tmp2 = marketPrecision[o].price_precision;
                length = tmp1 > tmp2 ? tmp1 : tmp2
            }

            if (length == 0) return scientificNotation2Number(number + '');
            
            var str = '';
            var dotIndex = number.indexOf('.');
            if (dotIndex === -1) {
                str = '.';
                for (var i = 0; i < length; i++) {
                str += '0';
                }
                str = number + str;
            } else {
                str = number.substr(0, dotIndex) + number.substr(dotIndex, parseInt(length) + 1);
                if ((number.length - dotIndex - 1) < length) {
                let l = length - (number.length - dotIndex - 1);
                let s = '';
                for (var j = 0; j < l; j++) {
                    s += '0';
                }
                str = str + s;
                }
            }
            return scientificNotation2Number(str);
        }
    } 
}