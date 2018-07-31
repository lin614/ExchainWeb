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
          
          <Poptip content="content" placement="bottom">
            <span class="show-addr-qr">{{ $t('userCenter.depositBox.qrCode') }}</span>
            <div class="qr-box" slot="content">
              <img :src="qrCode" alt="">
            </div>
          </Poptip>
        </div>
      </div>
      <div class="friendly-notice">
        <p class="friendly-notice-title">{{ $t('userCenter.depositBox.tip') }}</p>
        <li class="friendly-notice-item">{{ $t('userCenter.depositBox.tipP1') }} {{token}} {{ $t('userCenter.depositBox.tipP2') }}</li>
      </div>
    </div>
    <div v-else class="no-encharge">暂无可用充值地址</div>
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
    token: String
  },
  data () {
    return {
      addr: '',
      qrCode: '',
      spinShow: false,
      no_encharge: true
    }
  },
  watch: {
    token () {
      this.getAddress(this.token)
    }
  },
  methods: {
    getAddress (token) {
      this.spinShow = true
      ax.get(config.url.user+'/api/account/getAddress?type=' + token)
        .then((res) => {
          if (res.status == '200' && res.data.errorCode == 0) {
            this.addr = res.data.result.address
            this.qrCode = res.data.result.qrcode
            this.spinShow = false
            this.no_encharge = false
          } else {
            this.spinShow = false
            this.no_encharge = true
          }
        })
        .catch((err) => {
          this.spinShow = false
          this.no_encharge = true
        })
    },
    handleCopy () {
      var vu = this
      var clipboard = new ClipboardJS('.copy-addr')
      clipboard.on('success', e => {
        vu.$Message.success('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        vu.$Message.success('该浏览器不支持自动复制')
        clipboard.destroy()
      })
    }
  },
  mounted () {
    new ClipboardJS('#addr')
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
  .no-encharge {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    line-height: 1.5;
  }
</style>
