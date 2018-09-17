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
            <li class="friendly-notice-item">{{ $t('userCenter.withdrawBox.tipP2') }} : {{params.withdraw_max}} {{token}}</li>
          </div>
          <div class="get-btn-box fr">
            <Button class="btn-large" type="primary" @click="openSecurityModal()">
              <span>{{ $t('userCenter.withdrawBox.withdraw') }}</span>
              <!-- <Spin size="large" fix v-if="securityModalLoading"></Spin> -->
            </Button>
          </div>
        </FormItem>
      </Form>
    </div>

    <!-- 发送验证码模态框 -->
    <Modal v-model="showSecurityModal" class-name="change-pwd-model" :closable="false" @on-cancel="closeSecurityModal('formCustom')">
      <crd potColor="#4399e9">
        <span slot="title">{{ $t('userCenter.asset.withdrawModal.title') }}</span>
        <div class="form-box">
          <Form ref="securityModal" :rules="securityModalRules" :model="securityModal" label-position="top">
            <FormItem :label="$t('userCenter.asset.withdrawModal.phone')">
              <Input v-model="securityModal.phone" disabled></Input>
            </FormItem>

            <FormItem :label="$t('userCenter.asset.withdrawModal.phoneCode')" prop="phoneCode">
              <Input v-model="securityModal.phoneCode" style="width: 250px"></Input>

              <div v-show="phoneCodeDownFlag" class="send-code-down fr">{{phoneCodeDownText}}</div>

              <div v-show="!phoneCodeDownFlag" class="send-code-btn fr" @click="sendPhoneCode">
                <Spin v-show="phoneCodeLoading" size="small" fix></Spin>
                <span>{{$t('register.sendCode')}}</span>
              </div>
            </FormItem>

            <FormItem :label="$t('userCenter.asset.withdrawModal.email')">
              <Input v-model="securityModal.email" disabled></Input>
            </FormItem>

            <FormItem :label="$t('userCenter.asset.withdrawModal.emailCode')" prop="emailCode">
              <Input v-model="securityModal.emailCode" style="width: 250px"></Input>

              <div v-show="emailCodeDownFlag" class="send-code-down fr">{{emailCodeDownText}}</div>

              <div v-show="!emailCodeDownFlag" class="send-code-btn fr" @click="sendEmailCode">
                <Spin v-show="emailCodeLoading" size="small" fix></Spin>
                <span>{{$t('register.sendCode')}}</span>
              </div>
            </FormItem>
          </Form>
        </div>
      </crd>

      <div slot="footer">
        <div class="model-btn-wrap clearfix">
          <span class="model-btn fr" @click="closeSecurityModal()">{{$t('common.cancel')}}</span>

          <div class="model-btn primary fl" @click="handleGetCash()">
            <span>{{ $t('common.confirm') }}</span>
            <Spin v-if="securityModalLoading" size="small" fix></Spin>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import ax from 'axios'
import util from '../../libs/util.js'
import NP from 'number-precision'
import config from '../../config/config.js'
import cookie from 'js-cookie'
import crd from '../components/crd.vue'

ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
  domain: config.url.domain
})

let instance = null;

export default {
  name: 'getCash',
  components: {
    crd
  },
  props: {
    showCharge: Boolean,
    fee: String,
    token: String,
    params: Object
  },
  data () {
    return {
      // securityModalLoading: false,
      tokenDecimal: '',
      accountData: {
        account_available: ''
      },
      getCashModal: {
        destAddr: '',
        amount: '',
        fee: '',
        actualAmount: '',
      },
      getCashRules: {
        destAddr: [
          { 
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(this.$t('errorMsg.ADDR_BLANK'))
              } else if (value.length > 100) {
                callback(this.$t('errorMsg.ADDR_LIMIT'))
              } else {
                callback()
              }
            }, trigger: 'change, blur'
          }
        ],
        amount: [
          { 
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(this.$t('errorMsg.AMOUNT_BLANK'))
              }
              // 判断精度
              var decimal = this.accountData.decimal
              if (!/^\d+(\.\d+)?$/.test(value)) {
                callback(this.$t('errorMsg.FORMATTING_INCORRECT'))
              }
              var reg = RegExp('^[0-9]{0,8}(\\.[0-9]{0,' + decimal + '})?$')
              if (!reg.test(value)) {
                callback(this.$t('errorMsg.DECIMAL_LIMIT') + decimal + this.$t('errorMsg.DECIMAL_UNIT'))
              }
              if (parseFloat(value) > parseFloat(this.accountData.account_available)) {
                callback(this.$t('errorMsg.OVER_AVAILABLE_AMOUNT'))
              }
              if (parseFloat(value) > parseFloat(this.params.withdraw_max)) {
                callback(this.$t('errorMsg.AMOUNT_LESS_MAX_WITHDRAW'))
              }
              if (parseFloat(value) < parseFloat(this.params.withdraw_min)) {
                callback(this.$t('errorMsg.AMOUNT_LESS_MIN_WITHDRAW'))
              }
              if (parseFloat(value) < parseFloat(this.fee)) {
                callback(this.$t('errorMsg.AMOUNT_LESS_FEE'))
              }
              callback()
            }, trigger: 'change, blur'
           }
        ],
        fee: [
          { required: true, message: this.$t('errorMsg.FEE_BLANK'), trigger: 'blur' }
        ]
      },
      showSecurityModal: false,
      securityModalLoading: false,
      securityModal: {
        phone: '',
        phoneCode: '',
        phoneToken: '',
        email: '',
        emailCode: '',
        emailToken: ''
      },
      securityModalRules: {
        emailCode: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(this.$t('errorMsg.EMAIL_CODE_BLANK'))
              } else if (value.length > 20) {
                callback(this.$t('errorMsg.EMAIL_CODE_LIMIT_LENGTH'))
              } else if (util.checkCode(value)) {
                callback()
              } else {
                callback(this.$t('errorMsg.SYMBOL_ERR'))
              }
            },
            trigger: 'blur'
          }
        ],
        phoneCode: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(this.$t('errorMsg.PHONE_CODE_BLANK'))
              } else if (value.length > 20) {
                callback(this.$t('errorMsg.PHONE_CODE_LIMIT_LENGTH'))
              } else if (util.checkCode(value)) {
                callback()
              } else {
                callback(this.$t('errorMsg.SYMBOL_ERR'))
              }
            },
            trigger: 'blur'
          }
        ]
      },
      phoneCodeTimer: null,
      phoneCodeDownFlag: false,
      phoneCodeDownText: '',
      phoneCodeLoading: false,
      emailCodeTimer: null,
      emailCodeDownFlag: false,
      emailCodeDownText: '',
      emailCodeLoading: false,
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
    /**
     * 打开安全验证模态框
     */
    openSecurityModal () {
      this.$refs['getCashForm'].validate((valid) => {
        if (valid) {
          // 验证是否kyc
          let idCardStatus = sessionStorage.getItem('idCardStatus');
          if (idCardStatus === '0') {
            this.$Message.error(this.$t(`ApiError.219`));
            this.$router.push('/usercenter/kyc')
            return;
          } else if (idCardStatus === '1') {
            this.$Message.error(this.$t(`ApiError.218`));
            return;
          } else if (idCardStatus === '3') {
            this.$Message.error(this.$t(`ApiError.218`));
            this.$router.push('/usercenter/kyc')
            return;
          } 

          // 验证是否绑定手机号
          let bindPhone = sessionStorage.getItem('bindPhone');
          if (bindPhone === 'unbind') {
            this.$Message.error(this.$t(`ApiError.711`));
            this.$router.push('/usercenter/bind');
            return;
          }
          this.showSecurityModal = true;
        }
      });
    },
    /**
     * 关闭安全验证模态框
     */
    closeSecurityModal(form) {
      this.$refs['securityModal'].resetFields()
      this.showSecurityModal = false
    },
    /**
     * 发送短信验证码
     */
    sendPhoneCode () {
      if (this.phoneCodeLoading) {
        return
      } else {
        this.phoneCodeLoading = true
      }

      ax
        .post(config.url.user + '/api/account/getPhoneCode', {language: this.$t('common.lang') === 'cn' ? 'zh-cn' : 'en-us'})
        .then((res) => {
          this.phoneCodeLoading = false
          if (res.status == '200' && res.data.errorCode == 0) {
            this.securityModal.phoneToken = res.data.result
            this.$Message.success(this.$t('errorMsg.PHONE_SEND_SUCC'))
            this.phoneCodeDownFlag = true;
            this.handleCodeDown('phoneCodeTimer', 'phoneCodeDownText', 'phoneCodeDownFlag');
          } else if (res.status == '200' && res.data.errorCode == 711) {
            apiError(this, res);
            this.$router.push('/usercenter/bind')
          } else {
            apiError(this, res);
          }
        })
        .catch((err) => {
          this.phoneCodeLoading = false
          apiReqError(this, err);
        })
    },
    
    /**
     * 发送邮件验证码
     */
    sendEmailCode () {
      if (this.emailCodeLoading) {
        return
      } else {
        this.emailCodeLoading = true
      }

      ax
        .post(config.url.user + '/api/account/getEmailCode', {language: this.$t('common.lang') === 'cn' ? 'zh-cn' : 'en-us'})
        .then((res) => {
          this.emailCodeLoading = false
          if (res.status == '200' && res.data.errorCode == 0) {
            this.securityModal.emailToken = res.data.result
            this.$Message.success(this.$t('errorMsg.EMAIL_SEND_SUCC'))
            this.emailCodeDownFlag = true;
            this.handleCodeDown('emailCodeTimer', 'emailCodeDownText', 'emailCodeDownFlag');
          } else if (res.status == '200' && res.data.errorCode == 711) {
            apiError(this, res);
            this.$router.push('/usercenter/bind')
          } else {
            apiError(this, res);
          }
        })
        .catch((err) => {
          this.emailCodeLoading = false
          apiReqError(this, err);
        })
    },
    /**
     * 倒计时
     */
    handleCodeDown (timer, codeDownText, codeDownFlag) {
      var time = 60
      this[codeDownText] = time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
      clearInterval(this[timer])
      this[timer] = setInterval(() => {
        time -= 1
        if (time <= 0) {
          this[codeDownFlag] = false
          clearInterval(this[timer])
        }
        this[codeDownText] = time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
      }, 1000)
    },
    handleGetCash () {
      if (this.securityModalLoading) {
        return
      }
      var vu = this
      this.$refs['getCashForm'].validate((valid) => {
        if (valid) {
          vu.securityModalLoading = true
          ax.post(config.url.user+'/api/account/withdraw', {
            type: vu.token,
            outer_address: vu.getCashModal.destAddr,
            balance: vu.getCashModal.amount,
            emailCode: this.securityModal.emailCode,
            emailToken: this.securityModal.emailToken,
            phoneCode: this.securityModal.phoneCode,
            phoneToken: this.securityModal.phoneToken,
            language: this.$t('common.lang') === 'cn' ? 'zh-cn' : 'en-us'
          })
          .then((res) => {
            if (res.status == '200' && res.data.errorCode == 0) {
              vu.showSecurityModal = false
              vu.securityModalLoading = false
              vu.$refs.getCashForm.resetFields()
              vu.getCashModal.fee = vu.fee
              vu.$Message.success(vu.$t('errorMsg.WITHDRAW_REQ_SUBMIT'))

              setTimeout(() => {
                vu.$emit('submitGetCash')
              }, 50);
            } else if (res.status == '200' && res.data.errorCode == 219) {
              apiError(this, res);
              this.$router.push('/usercenter/kyc')
            } else {
              vu.securityModalLoading = false
              apiError(vu, res);
            }
          })
          .catch((err) => {
            vu.securityModalLoading = false
            apiReqError(vu, err);
          })
        }
      })
      
    },
    handleAmountBlur (e) {
      var vu = this
      this.$refs.getCashForm.validateField('amount', (error) => {
        if(!error){
          vu.getCashModal.actualAmount = NP.minus(parseFloat(e.target.value), parseFloat(vu.getCashModal.fee))
        } else {
          vu.getCashModal.actualAmount = ''
        }
      })
    },
    initSecurityModalData () {
      this.securityModal.phone = sessionStorage.getItem('userNum');
      this.securityModal.email = sessionStorage.getItem('email');
    }
  },
  created () {
    instance = this;
  },
  mounted () {
    this.initSecurityModalData();
    this.accountData = JSON.parse(JSON.stringify(this.params))
    this.getCashModal.fee = this.fee
    let vu = this;
    bus.$on('langChange', () => {
      let fee = vu.getCashModal.fee;
      vu.$refs.getCashForm.resetFields();
      vu.getCashModal.fee = fee;
    })
  },
  destroyed() {
    clearInterval(this.phoneCodeTimer)
    clearInterval(this.emailCodeTimer)
    bus.$off('langChange');
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
        }
      }
    }
  }
</style>
