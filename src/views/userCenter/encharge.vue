<template>
  <div class="encharge-main" v-if="showCharge">
    <div v-if="!no_encharge">
      <div>{{ $t('userCenter.depositBox.title') }}</div>
      <div class="addr-box">
        <div class="fl">
          <span class="addr-main">{{addr}}</span>
        </div>
        <div class="fl">
          <input type="hidden" v-model="addr" id="addr">

          <a class="copy-addr" id="btnLink" :data-clipboard-text="addr" @click="handleCopy">{{ $t('userCenter.depositBox.copy') }}</a>
          
          <Poptip content="content" placement="bottom" :transfer="true">
            <span class="show-addr-qr">{{ $t('userCenter.depositBox.qrCode') }}</span>
            <div class="qr-box" slot="content">
              <img :src="'data:image/png;base64,' + qrCode" alt="">
            </div>
          </Poptip>
        </div>
      </div>
      <div class="friendly-notice">
        <p class="friendly-notice-title">{{ $t('userCenter.depositBox.tip') }}</p>
        <li class="friendly-notice-item">{{ $t('userCenter.depositBox.tipP1') }} {{token}} {{ $t('userCenter.depositBox.tipP2') }}</li>
        <li class="friendly-notice-item">{{ $t('userCenter.depositBox.tipP3') }} {{params.recharge_min}} {{token}}</li>
      </div>
    </div>
    <div v-else class="no-encharge">{{$t('errorMsg.NO_AVAILABLE_ENCHARGE_ADDR')}}</div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import ax from 'axios'
import ClipboardJS from 'clipboard'
import config from '../../config/config.js'
export default {
  name: 'encharge',
  props: {
    showCharge: Boolean,
    token: String,
    params: Object
  },
  data () {
    return {
      addr: '',
      qrCode: '',
      spinShow: true,
      no_encharge: false
    }
  },
  watch: {
    token () {
      if (this.showCharge) {
        this.getAddress(this.token)
      }
    }
  },
  methods: {
    /**
     * 获取充值地址和二维码
     */
    getAddress (token) {
      this.spinShow = true
      var vu = this
      ax.get(config.url.user+'/api/account/getAddress?type=' + token,getHeader)
        .then((res) => {
          if (res.status == '200' && res.data.errorCode == 0) {
            vu.addr = res.data.result.address
            vu.qrCode = res.data.result.qrcode
            vu.spinShow = false
            vu.no_encharge = false
          } else {
            vu.spinShow = false
            vu.no_encharge = true
            apiError(vu, res);
          }
        })
        .catch((err) => {
          vu.spinShow = false
          vu.no_encharge = true
          apiReqError(vu, err);
        })
    },
    /**
     * 复制
     */
    handleCopy () {
      var vu = this
      var clipboard = new ClipboardJS('.copy-addr')
      clipboard.on('success', e => {
        vu.$Message.success(vu.$t('errorMsg.COPY_SUCCESS'))
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        vu.$Message.error(vu.$t('errorMsg.BROWSER_COPY_LIMIT'))
        clipboard.destroy()
      })
    }
  },
  mounted () {
    this.no_encharge = false
    if (this.showCharge) {
      new ClipboardJS('#addr')
      this.getAddress(this.token)
    }
    
  },
  beforeDestroy () {
    this.no_encharge = false
  }
}
</script>

<style lang="less">
  @import url(../style/config.less);
  .encharge-main {
    position: relative;
    width: 100%;
    background-color: rgb(247, 247, 247);
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
