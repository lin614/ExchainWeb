<template>
  <div class="get-cash-main" v-if="!showCharge">
    <div class="getcash-form">
      <Form ref="getCashForm" :rules="getCashRules" :model="getCashModal" label-position="top" inline class="clearfix">
        <FormItem :label="$t('userCenter.withdrawBox.title')" prop="destAddr" style="width: 100%;">
          <Input v-model="getCashModal.destAddr"></Input>
        </FormItem>
        <FormItem :label="$t('userCenter.withdrawBox.amount')" prop="amount" style="width: 100%;" class="available-box">
          <Input v-model="getCashModal.amount" @on-blur="handleAmountBlur"></Input>
          <span class="available-amount">{{ $t('userCenter.withdrawBox.balance') }} {{accountData.account_available}} {{token}}</span>
          <!-- <span class="available-amount">余额为 <i v-show="(trabsferModal.from === 'master')">{{master}}</i><i v-show="(trabsferModal.from === 'trade')">{{trade}}</i> {{trabsferModal.token}}</span> -->
        </FormItem>
        <FormItem :label="$t('userCenter.withdrawBox.fees')" prop="fee" style="width: 45%;">
          <Input disabled v-model="getCashModal.fee"></Input>
        </FormItem>
        <FormItem :label="$t('userCenter.withdrawBox.receiveAmount')" prop="actualAmount" style="width: 45%;" class="fr">
          <Input disabled v-model="getCashModal.actualAmount"></Input>
        </FormItem>

        <FormItem style="width: 100%;">
          <div class="tip-intro fl">
            <p class="friendly-notice-title">{{ $t('userCenter.withdrawBox.tip') }}</p>
            <li class="friendly-notice-item">{{$t('errorMsg.DECIMAL_LIMIT')}} {{accountData.decimal}} {{$t('errorMsg.DECIMAL_UNIT')}}</li>
            <li class="friendly-notice-item">{{ $t('userCenter.withdrawBox.tipP1') }} : {{params.withdraw_min}} {{token}}</li>
          </div>
          <div class="get-btn-box fr">
            <Button type="primary" @click="handleGetCash('getCashForm')">
              <span>{{ $t('userCenter.withdrawBox.withdraw') }}</span>
              <Spin size="large" fix v-if="spinShow"></Spin>
            </Button>
          </div>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import ax from 'axios'
import util from '../../libs/util.js'
import NP from 'number-precision'
import config from '../../config/config.js'
export default {
  name: 'getCash',
  props: {
    showCharge: Boolean,
    fee: String,
    token: String,
    params: Object
  },
  data () {
    return {
      spinShow: false,
      tokenDecimal: '',
      accountData: {
        account_available: ''
      },
      getCashModal: {
        destAddr: '',
        amount: '',
        fee: '',
        actualAmount: ''
      },
      getCashRules: {
        destAddr: [
          { required: true, message: this.$t('errorMsg.ADDR_BLANK'), trigger: 'blur' }
        ],
        amount: [
          { required: true, message: this.$t('errorMsg.AMOUNT_BLANK'), trigger: 'blur' },
          { 
            validator: (rule, value, callback) => {
              if (value === '' || value === 0 || value === '0') {
                callback(this.$t('errorMsg.AMOUNT_BLANK'))
              }
              // 判断精度
              var decimal = this.accountData.decimal
              var reg = RegExp('^[0-9]{0,8}(\.[0-9]{0,' + decimal + '})?$')
              if (!reg.test(value)) {
                callback(this.$t('errorMsg.DECIMAL_LIMIT') + decimal + this.$t('errorMsg.DECIMAL_UNIT'))
              }
              if (parseFloat(value) > parseFloat(this.accountData.account_available)) {
                callback(this.$t('errorMsg.OVER_AVAILABLE_AMOUNT'))
              }
              if (value < this.fee) {
                callback(this.$t('errorMsg.AMOUNT_LESS_FEE'))
              }
              callback()
            }, trigger: 'change, blur'
           }
        ],
        fee: [
          { required: true, message: this.$t('errorMsg.FEE_BLANK'), trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    fee () {
      this.getCashModal.fee = this.fee
    },
    params () {
      this.accountData = JSON.parse(JSON.stringify(this.params))
    },
    decimal () {
      this.tokenDecimal = this.decimal
    },
    token () {
      this.$refs.getCashForm && this.$refs.getCashForm.resetFields()
      this.getCashModal.fee = this.fee
    }
  },
  methods: {
    handleGetCash (form) {
      if (this.spinShow) {
        return
      }
      var vu = this
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.spinShow = true
          ax.post(config.url.user+'/api/account/withdraw', {
            type: this.token,
            outer_address: this.getCashModal.destAddr,
            balance: this.getCashModal.amount
          })
          .then((res) => {
            if (res.status == '200' && res.data.errorCode == 0) {
              vu.spinShow = false
              vu.$refs.getCashForm.resetFields()
              this.getCashModal.fee = this.fee
              this.$emit('submitGetCash')
              vu.$Message.success(this.$t('errorMsg.WITHDRAW_REQ_SUBMIT'))
            } else {
              vu.spinShow = false
              vu.$Message.error(this.$t('errorMsg.FAIL'))
            }
          })
          .catch((err) => {
            vu.spinShow = false
              vu.$Message.error(this.$t('errorMsg.NETWORK_ERROR'))
            console.log(err)
          })
        }
      })
      
    },
    handleAmountBlur (e) {
      this.getCashModal.actualAmount = NP.minus(parseFloat(e.target.value), parseFloat(this.getCashModal.fee))
    }
  },
  mounted () {
    this.accountData = JSON.parse(JSON.stringify(this.params))
    this.getCashModal.fee = this.fee
  }
}
</script>

<style lang="less">
  .get-cash-main {
    .ivu-form-item {
      .tip-intro {
        width: 400px;
      }
      .get-btn-box {
        padding: 20px;
        .ivu-btn {
          position: relative;
          width: 200px;
          height: 50px;
          font-size: 20px;
        }
      }
    }
  }
</style>
