<template>
  <div class="get-cash-main" v-if="!showCharge">
    <div class="getcash-form">
      <Form ref="loginForm" :rules="getCashRules" :model="getCashModal" label-position="top" inline class="clearfix">
        <FormItem label="提币地址" prop="destAddr" style="width: 100%;">
          <Input v-model="getCashModal.destAddr"></Input>
        </FormItem>
        <FormItem label="数量" prop="amount" style="width: 100%;">
          <Input v-model="getCashModal.amount"></Input>
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
            <Button type="primary">提币</Button>
          </div>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getCash',
  props: {
    showCharge: Boolean,
    fee: String
  },
  data () {
    return {
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
          { required: true, message: '数量不能为空', trigger: 'blur' }
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
    }
  },
  mounted () {
    console.log('mounted' + this.fee)
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
          width: 200px;
          height: 50px;
          font-size: 20px;
        }
      }
    }
  }
</style>
