<template>
  <div class="encharge-main">
    <div>充币地址</div>
    <div class="addr-box">
      <span class="addr-main">1PywpKk22ZXLAKZ5LsVkpyArhFAR3Xkipu</span>
      <span class="copy-addr">复制</span>
      <Poptip content="content" placement="bottom">
        <span class="show-addr-qr">二维码</span>
        <div class="qr-box" slot="content">
          <img src="../../static/imgs/wx.png" alt="">
        </div>
      </Poptip>
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
export default {
  name: 'encharge'
}
</script>

<style lang="less">
  @import url(../style/config.less);
  .encharge-main {
    width: 100%;
    padding: 20px;
    .addr-box {
      height: 30px;
      margin-bottom: 20px;
      font-size: @font-text;
      color: @font-color-blue;
      .addr-main {
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
