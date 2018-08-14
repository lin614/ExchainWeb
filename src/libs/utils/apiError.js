import { debug } from "util";

/**
 * 错误提示
 * 陈万安 2018-08-08
 */

export function apiError (vu, res) {
    vu.$Message.error(vu.$t(`ApiError.${res.data.errorCode}`));
}

export function apiReqError (vu, err) {
    vu.$Message.error(vu.$t(`ApiError.-1`));
}