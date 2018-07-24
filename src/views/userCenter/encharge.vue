<template>
  <div class="encharge-main" v-if="showCharge">
    <div>充币地址</div>
    <div class="addr-box">
      <div class="fl">
        <span class="addr-main">1PywpKk22ZXLAKZ5LsVkpyArhFAR3Xkipu</span>
      </div>
      <div class="fl">
        <input type="hidden" v-model="addr" id="addr">
        <a class="copy-addr" id="btnLink" data-clipboard-target="#addr">复制</a>
        <Poptip content="content" placement="bottom">
          <span class="show-addr-qr">二维码</span>
          <div class="qr-box" slot="content">
            <img src="../../static/imgs/wx.png" alt="">
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
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
export default {
  name: 'encharge',
  props: {
    params: Object,
    showCharge: Boolean
  },
  data () {
    return {
      addr: '1PywpKk22ZXLAKZ5LsVkpyArhFAR3Xkipu'
    }
  },
  mounted () {
    new ClipboardJS('#addr')
    console.log('this.params' + '--------------------------')
    console.log(this.params)
  }
}
</script>

<style lang="less">
  @import url(../style/config.less);
  .encharge-main {
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
