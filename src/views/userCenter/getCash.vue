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
            <li class="friendly-notice-item">因币种限制，最多支持到小数点后 {{accountData.decimal}} 位</li>
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
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '提现数量不能为空', trigger: 'blur' },
          { 
            validator: (rule, value, callback) => {
              if (value === '' || value === 0 || value === '0') {
                callback('请输入提现数量')
              }
              // 判断精度
              var decimal = this.accountData.decimal
              var reg = RegExp('^[0-9]{0,8}(\.[0-9]{0,' + decimal + '})?$')
              if (!reg.test(value)) {
                callback('因币种限制，最多支持到小数点后' + decimal + '位')
              }
              if (parseFloat(value) > parseFloat(this.accountData.account_available)) {
                callback('超出可用额度')
              }
              if (value < this.fee) {
                callback('提现数量不足以支付手续费')
              }
              callback()
            }, trigger: 'change, blur'
           }
        ],
        fee: [
          { required: true, message: '交易费不能为空', trigger: 'blur' }
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
          ax.post('/api/account/withdraw', {
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
              vu.$Message.success('提币请求已提交！')
            } else {
              vu.spinShow = false
              vu.$Message.error('网络异常')
            }
          })
          .catch((err) => {
            vu.spinShow = false
              vu.$Message.error('网络异常')
            console.log(err)
          })
        }
      })
      
    },
    handleAmountBlur (e) {
      /**
       * 数字计算精度问题
       */
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
