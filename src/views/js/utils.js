import moment from 'moment';
import * as Constant from '@/assets/js/constant';

export const isEmptyObject = (obj) => {
    for(var item in obj){
        return false;
    }
    return true;
}

export const throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
};

export const toFixed = (num, s) => {
    let times = Math.pow(10, s);
    let des = num * times + 0.5;
    des = parseInt(des, 10) / times;
    return des;
};

export const shuffle = (arr) => {
    let res = [],
        len = arr.length,
        n;
    while(len){
        n = Math.floor(Math.random()*(len--));
        res.push(arr.splice(n,1)[0]);
    }
    return res;
};

export const splitData = (rawData) => {
    let data = rawData.slice(0);
    var categoryData = [];
    var values = [];
    var volumes = [];
    for (var i = 0; i < data.length; i++) {
        categoryData.push(data[i].splice(0, 1)[0]);
        //开盘  收盘价 最低价  最高价
        values.push([data[i][0],data[i][3],data[i][2], data[i][1]]);
        volumes.push(data[i][4]);
    }

    return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
    };
};

export const calculateMA = (dayCount, data) => {
     var result = [];
     for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data.values[i - j][1];
        }
        result.push(+(sum / dayCount));
    }
    return result;   
};

//将路由格式化为面板标题 将'_'替换为'/',然后转为大写
export const formatSymbol = (data) => {
    if(!data) return "";
    return data.replace(/_/,'/').toUpperCase();
};

//将币对格式化为路由 将'/'替换为'_',然后转为小写
export const formatSymbol2 = (data) => {
    if(!data) return "";
    return data.replace(/\//,'_').toLowerCase();
};

export const getDataZoomStart = (data) => {
    let len = data.length;
    let poivt = 40;
    let start = 0;
    if(len > poivt){
        start = (1-poivt/len)*100;
    }
    return start;
};

export const formatTimeLabel = (value, type) => {
    let formatter;
    switch(type){
        case '1day':
            formatter = Constant.FORMATTERS[3];
            break;
        case '1week':
        case '1mon':
            formatter = Constant.FORMATTERS[2];
            break;
        default:
            formatter = Constant.FORMATTERS[1];
            break;
    }

    let t = moment(Number(value)).format(formatter);
    return t;
};

export const setMarkLineStyle = (isIncreased) => {
    let color = isIncreased?Constant.COLORS.borderColor:Constant.COLORS.borderColor0;
    return {
        lineStyle:{
            color
        },
        label:{
            color
        }
    }
}; 

export const addSymbolsMoreInfo = (symbols) => {        
    return symbols.map((item) => {
        let p = item.price/(1+item.priceChange);
        item.dayClose = p;
        return item;
    });
};

export const calculatePriceChange = (dayClose, price) => {
    return (price - dayClose) / dayClose;
};

export const formatOrderStatus = (status) => {
    let result = "--";
    switch(status){
        case "1":
            result = "挂单中";
            break;
        case "2":
            result = "已成交";
            break;
        case "3":
            result = "取消";
            break;
    }
    return result;
}

export const formatOrderSide = (side) => {
    let result = "--"
    switch(side){
        case "1":
            result = "买";
            break;
        case "2":
            result = "卖";
            break;
    }
    return result;
}