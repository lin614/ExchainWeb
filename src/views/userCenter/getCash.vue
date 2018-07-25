<template>
  <div class="get-cash-main" v-if="!showCharge">
    <div class="getcash-form">
      <Form ref="getCashForm" :rules="getCashRules" :model="getCashModal" label-position="top" inline class="clearfix">
        <FormItem label="提币地址" prop="destAddr" style="width: 100%;">
          <Input v-model="getCashModal.destAddr"></Input>
        </FormItem>
        <FormItem label="数量" prop="amount" style="width: 100%;" class="available-box">
          <Input v-model="getCashModal.amount"></Input>
          <span class="available-amount">余额为{{accountData.account_available}}</span>
          <!-- <span class="available-amount">余额为 <i v-show="(trabsferModal.from === 'master')">{{master}}</i><i v-show="(trabsferModal.from === 'trade')">{{trade}}</i> {{trabsferModal.token}}</span> -->
        </FormItem>
        <FormItem label="手续费" prop="fee" style="width: 45%;">
          <Input v-model="getCashModal.fee"></Input>
        </FormItem>
        <FormItem label="到账数量" prop="actualAmount" style="width: 45%;" class="fr">
          <Input disabled v-model="getCashModal.actualAmount"></Input>
        </FormItem>
        <FormItem style="width: 100%;">
          <div class="tip-intro fl">
            <p class="friendly-notice-title">温馨提示</p>
            <li class="friendly-notice-item">请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</li>
            <li class="friendly-notice-item">请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</li>
            <li class="friendly-notice-item">请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</li>
            <li class="friendly-notice-item">请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</li>
            <li class="friendly-notice-item">请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</li>
          </div>
          <div class="get-btn-box fr">
            <Button type="primary" @click="handleGetCash">
              <span>提币</span>
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
export default {
  name: 'getCash',
  props: {
    showCharge: Boolean,
    fee: String,
    token: String,
    params: Object,
    getTokenObj: Object
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
              var decimal = 8
              var reg = RegExp('^[0-9]{0,8}(\.[0-9]{0,' + decimal + '})?$')
              if (!reg.test(value)) {
                callback('划转数量格式有误')
              }
              if (parseFloat(value) > parseFloat(this.accountData.account_available)) {
                callback('超出可用额度')
              } else {
                callback()
              }
              // console.log('value = '+ value + ', this.tokenDecimal = ' + this.tokenDecimal)
              // console.log(util.checkPointNum(value, this.tokenDecimal))
              callback(util.checkPointNum(value, this.tokenDecimal))
            }, trigger: 'change'
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
      console.log('fee' + this.fee)
      this.getCashModal.fee = this.fee
    },
    params () {
      this.accountData = JSON.parse(JSON.stringify(this.params))
    },
    decimal () {
      console.log('this.decimal = ' + this.decimal)
      this.tokenDecimal = this.decimal
    }
  },
  methods: {
    handleGetCash () {
      if (this.spinShow) {
        return
      }
      this.spinShow = true
      var vu = this
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
  },
  mounted () {
    console.log(this.params)
    this.accountData = JSON.parse(JSON.stringify(this.params))
    this.getCashModal.fee = this.fee
    // this.tokenDecimal = this.decimal
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
