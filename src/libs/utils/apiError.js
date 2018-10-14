/**
 * 错误提示
 * 陈万安 2018-08-08
 */

export function javaApiReqError (vu, res) {
    if (res.data.meta.code) {
        let code = res.data.meta.code + '';
        vu.$Message.error(vu.$t(`javaApiError.${code}`));
    } else {
        vu.$Message.error(vu.$t(`ApiError.-1`));
    }
}

export function baiduApiError (vu, res) {
    if (res.data.error_code) {
        let code = res.data.error_code + '';
        vu.$Message.error(vu.$t(`baiduApiError.${code}`));
    } else {
        vu.$Message.error(vu.$t(`ApiError.-1`));
    }
}

export function apiError (vu, res) {
    if (res.data.errorCode) {
        vu.$Message.error(vu.$t(`ApiError.${res.data.errorCode}`));
    } else {
        vu.$Message.error(vu.$t(`ApiError.-1`));
    }
}

export function apiReqError (vu, err) {
    vu.$Message.error(vu.$t(`ApiError.-1`));
}