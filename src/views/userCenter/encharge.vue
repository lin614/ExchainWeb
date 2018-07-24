<template>
  <div class="encharge-main" v-if="showCharge">
    <div>充币地址</div>
    <div class="addr-box">
      <div class="fl">
        <span class="addr-main">{{addr}}</span>
      </div>
      <div class="fl">
        <input type="hidden" v-model="addr" id="addr">
        <a class="copy-addr" id="btnLink" data-clipboard-target="#addr">复制</a>
        <Poptip content="content" placement="bottom">
          <span class="show-addr-qr">二维码</span>
          <div class="qr-box" slot="content">
            <img :src="qrCode" alt="">
          </div>
        </Poptip>
      </div>
    </div>
    <div class="friendly-notice">
      <p class="friendly-notice-title">温馨提示</p>
      <li class="friendly-notice-item">请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</li>
      <li class="friendly-notice-item">请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</li>
      <li class="friendly-notice-item">请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</li>
      <li class="friendly-notice-item">请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</li>
      <li class="friendly-notice-item">请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</li>
    </div>
     <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import ax from 'axios'
import ClipboardJS from 'clipboard'
export default {
  name: 'encharge',
  props: {
    params: Object,
    showCharge: Boolean,
    token: String
  },
  data () {
    return {
      addr: '',
      qrCode: '',
      spinShow: false
    }
  },
  watch: {
    token () {
      console.log('---------------------' + this.token)
      this.getAddress(this.token)
    }
  },
  methods: {
    getAddress (token) {
      this.spinShow = true
      ax.get('/api/account/getAddress?type=' + token)
        .then((res) => {
          if (res.status == '200' && res.data.errorCode == 0) {
            console.log('ok')
            console.log(res.data.result)
            this.addr = res.data.result.address
            this.qrCode = res.data.result.qrcode
            this.spinShow = false
          } else {
            this.spinShow = true
          }
        })
        .catch((err) => {
          this.spinShow = true
        })
    }
  },
  mounted () {
    new ClipboardJS('#addr')
    console.log('this.token' + '--------------------------')
    console.log(this.token)
    this.getAddress(this.token)
  }
}
</script>

<style lang="less">
  @import url(../style/config.less);
  .encharge-main {
    position: relative;
    width: 100%;
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
      .qr-box {
        width: 140px;
        height: 140px;
        img {
          width: 100%;
          height: 100%;
        }
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
</style>
