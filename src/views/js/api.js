import axios from 'axios';
import qs from 'qs'
import * as Constant from '@/assets/js/constant';
import config from '../../config/config'

axios.interceptors.request.use((config) => {
  if (config.method === "post") {
    config.data = qs.stringify(config.data);
  }
  return config;
})

const pend = config.url.user + "/api/v1-b";
const pend2 = config.url.user + '/api';

//k线图
export const getKlineHistory = ({
  period,
  type,
  market = Constant.MARKET,
  name
}) => {
  return axios.get(`${pend}/market/kline_history`, {
    params: {
      period,
      type,
      market,
      name
    }
  });
};

//所有交易币对
export const getAllSymbols = () => {
  return axios.get(`${pend}/market/all`);
};


export const getTradeHistory = ({
  market = Constant.MARKET,
  symbol,
  limit = 100
}) => {
  return axios.get(`${pend}/market/trade_history`, {
    params: {
      market,
      symbol,
      limit
    }
  });
};

export const getDepthHistory = ({
  market = Constant.MARKET,
  symbol,
  limit = 100
}) => {
  return axios.get(`${pend}/market/depth_history`, {
    params: {
      market,
      symbol,
      limit
    }
  });
};


/*========================== 用户相关 ===============================*/

export const userRegister = (email) => {
  return axios.post(`${pend2}/user/register`, {
    email
  });
};

export const userVerifyRegister = ({
  email,
  code,
  token,
  password,
  recaptcha
}) => {
  return axios.post(`${pend2}/user/verifyRegister`, {
    email,
    code,
    token,
    password,
    'g-recaptcha-response': recaptcha
  });
};

export const userResetPassword = (email) => {
  return axios.post(`${pend2}/user/resetPassword`, {
    email
  });
};

export const userVerifyResetPassword = ({
  email,
  code,
  token,
  password,
  recaptcha
}) => {
  return axios.post(`${pend2}/user/verifyResetPassword`, {
    email,
    code,
    token,
    password,
    'g-recaptcha-response': recaptcha
  });
};

export const changePassword = ({
  password,
  new_password
}) => {
  return axios.post(`${pend2}/user/changePassword`, {
    password,
    new_password
  });
};
export const userLogin = ({
  email,
  password,
  recaptcha
}) => {
  return axios.post(`${pend2}/user/login`, {
    email,
    password,
    'g-recaptcha-response': recaptcha
  });
};

export const userLogout = () => {
  return axios.post(`${pend2}/user/logout`);
};

export const getUserInfo = () => {
  return axios.get(`${pend2}/user/getUserInfo`);
};

export const getRecentActivity = (page = 1) => {
  return axios.get(`${pend2}/user/getRecentActivity`, {
    page
  });
};

/*交易所*/
export const balanceQuery = () => {
  return axios.get(`${pend2}/exchange/balanceQuery`);
};

export const getMarketInfo = (market) => {
  return axios.get(`${pend2}/exchange/getMarketInfo`, {
    params: {
      market
    }
  })
};
export const getMarketPrecision = () => {
  return axios.get(`${pend2}/exchange/getMarketInfo`)
};

export const orderPutLimit = ({
  market,
  side,
  price,
  amount,
  option,
  datetime
}) => {
  return axios.post(`${pend2}/exchange/orderPutLimit`, {
    market,
    side,
    price,
    amount,
    option,
    datetime
  });
};

export const getOrderList = (params) => {
  return axios.get(`${pend2}/order/lists`, {
    params
  })
}

export const getOrderDetailList = (params) => {
  return axios.get(`${pend2}/order/dealDetailLists`, {
    params
  })
}


/* 钱包 */
export const getAssetsList = () => {
  return axios.get(`${pend2}/account/assetsList`)
}

export const exchangeToAccount = ({
  type,
  balance
}) => {
  return axios.post(`${pend2}/exchange/toAccount`, {
    type,
    balance
  })
}

export const exchangeToStock = ({
  type,
  balance
}) => {
  return axios.get(`${pend2}/account/toExchange`, {
    params: {
      type,
      balance
    }
  })
}

export const getWalletAddress = (type) => {
  return axios.get(`${pend2}/account/getAddress`, {
    params: {
      type
    }
  })
}

export const withDraw = ({
  type,
  balance,
  outer_address
}) => {
  return axios.post(`${pend2}/account/withdraw`, {
    type,
    balance,
    outer_address
  })
}

//最爱功能
export const getCollectList = () => {
  return axios.get(`${pend2}/quotation/getCollectLists`);
};

export const addCollect = (market) => {
  return axios.get(`${pend2}/quotation/addCollect`, {
    params: {
      market
    }
  });
};

export const removeCollect = (market) => {
  return axios.get(`${pend2}/quotation/removeCollect`, {
    params: {
      market
    }
  })
};