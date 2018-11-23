<template>
  <div class="encharge-main">
    <div v-if="no_encharge && !spinShow">
      <ul>
        <li>{{$t('userCenter.entrust.transactionTime')}}</li>
        <li>{{$t('userCenter.entrust.price')}}</li>
        <li>{{$t('userCenter.entrust.transactionNum')}}</li>
        <li>{{$t('userCenter.entrust.transactionAmount')}}</li>
        <li>{{$t('userCenter.entrust.fee')}}</li>
      </ul>
      <ul class="resdata" v-for="(item, index) in resData" :key="index">
        <li>{{item.mtime}}</li>
        <li>{{item.price}}</li>
        <li>{{item.amount}}</li>
        <li>{{item.transactionAmount}}</li>
        <li>{{item.fee}}</li>
      </ul>
    </div>
    <div  v-if="!no_encharge && !spinShow" class="no-encharge">{{$t('common.noData')}}</div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import ax from 'axios'
import ClipboardJS from 'clipboard'
import config from '../../config/config.js'
import { formatMarketPrecision } from '../../libs/utils/format.js'
export default {
  name: 'encharge',
  props: {
    showCharge: Boolean,
    order_id: String,
    params: Object
  },
  data () {
    return {
      qrCode: '',
      spinShow: true,
      no_encharge: false,
      resData: []
    }
  },
  watch: {
    order_id () {
      this.getDatas()
    }
  },
  methods: {
    /**
     * 获取充值地址和二维码
     */
    getDatas () {
      this.spinShow = true
      var vu = this
      ax.get(config.url.user+'/api/order/orderDetail?order_id=' + this.params.order_id, getHeader)
        .then((res) => {
          if (res.status == '200' && res.data.errorCode == 0 && res.data.errorMsg == "success") {
            let data = res.data.result
            if (data.length) {
              for (var i=0; i < data.length; i++) {
                data[i].transactionAmount = formatMarketPrecision(data[i].price * data[i].amount, data[i].market, 'special', vu)
                data[i].price = formatMarketPrecision(data[i].price, data[i].market, 'price', vu)
                data[i].amount = formatMarketPrecision(data[i].amount, data[i].market, 'amount', vu)
                data[i].fee = formatMarketPrecision(data[i].fee, data[i].market, 'price', vu)
              }
              this.resData = data
              vu.spinShow = false
              vu.no_encharge = true
            } else {
              this.resData = data
              vu.spinShow = false
              vu.no_encharge = false
            }
          } else {
            vu.spinShow = false
            vu.no_encharge = false
            apiError(vu, res);
          }
        })
        .catch((err) => {
          vu.spinShow = false
          vu.no_encharge = false
          apiReqError(vu, err);
        })
    }
  },
  mounted () {
    this.no_encharge = false
    this.getDatas()
  },
  beforeDestroy () {
    this.no_encharge = false
    this.spinShow = true
  }
}
</script>

<style lang="less" scoped>

  @import url(../style/config.less);
  .encharge-main {
    position: relative;
    width: 100%;
    background-color: rgb(247, 247, 247);
    .resdata {
      margin-top: 10px;
    }
    ul li {
      display: inline-block;
      width: 19%;
      font-size: 14px;
      text-align: center;
    }
    .addr-box {
      height: 30px;
      margin-bottom: 20px;
      font-size: @font-text;
      color: @font-color-blue;
      .addr-main {
        display: inline-block;
        font-size: 20px;
        line-height: 30px;
        margin-right: 20px;
        font-weight: 600;
        color: #000;
      }
      .copy-addr {
        margin-right: 20px;
        cursor: pointer;
      }
      .show-addr-qr {
        cursor: pointer;
      }
      
    }
    .friendly-notice {
      .friendly-notice-title {
        line-height: 1.5;
      }
      .friendly-notice-item {
        line-height: 1.5;
      }
    }
  }
  .no-encharge {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    line-height: 1.5;
  }
  .ivu-poptip-popper .ivu-poptip-body-content .qr-box img {
    width: 100%;
  }
</style>
