
<template>
  <page>
    <div class="reg">
      <block>
        <crd slot="inner">
          <span slot="title">{{$t('register.title')}}</span>
          <div class=" content">
            <h1>{{$t('register.dec')}}</h1>
            <hr/>
            <div class="reg_form">
              <Form ref="regInfo" label-position="top" :model="regInfo" :rules="rules">
                <FormItem prop="email" :label="$t('register.email')" class="ivu-form-item-required">
                  <Input v-model="regInfo.email" :placeholder="$t('register.pleaseIptEmail')"></Input>
                </FormItem>

                <FormItem prop="emailcode" :label="$t('register.emailcode')" class="ivu-form-item-required">
                  <Input v-model="regInfo.emailcode" :placeholder="$t('register.pleaseIptEmailCode')" style="width: 360px"></Input>

                  <div v-show="codeDown" class="send-code-down fr">{{codeDownText}}</div>
                  <div v-show="!codeDown" class="send-code-btn fr" @click="sendemail"><Spin v-show="sendCodeLoading" size="small" fix></Spin><span>{{$t('register.sendCode')}}</span></div>
                </FormItem>

                <FormItem prop="pwd" :label="$t('register.pwd')" class="ivu-form-item-required">
                  <Input v-model="regInfo.pwd" type="password" :placeholder="$t('register.pleaseIptPwd')"></Input>
                </FormItem>

                <FormItem prop="pwd2" :label="$t('register.pwd2')" class="ivu-form-item-required">
                  <Input v-model="regInfo.pwd2" type="password" :placeholder="$t('register.pleaseInputPwd2')"></Input>
                </FormItem>

                <FormItem prop="code" :label="$t('register.code')">
                  <Input v-model="regInfo.code" type="text" placeholder=""></Input>
                </FormItem>

                <FormItem>
                  <Button class="btn-large" type="primary" @click="regUser('regInfo')">{{$t('register.registerBtn')}}</Button> {{$t('register.toLogin')}}
                  <router-link class="login" to="/login">{{$t('register.login')}}</router-link>
                </FormItem>
              </Form>
            </div>
            <!-- <div class="info">
              <p>
                {{$t('register.info1')}}<br/> {{$t('register.info2')}}<br/> {{$t('register.info3')}}
              </p>
            </div> -->
          </div>
        </crd>
      </block>
    </div>
  </page>

</template>

<script>
import page from './components/page'
import block from './components/block'
import crd from './components/crd'
import ax from 'axios'
import config from '../config/config.js'
import md5 from 'crypto-md5'
import util from '../libs/util.js'
export default {
  name: 'reg',
  components: { page, block, crd },
  data() {
    return {
      regtoken: '',
      gtserver: '',
      regInfo: {
        email: '',
        emailcode: '',
        source: '',
        pwd: '',
        pwd2: '',
        code: ''
      },
      codeDown: false,
      codeDownText: '',
      timer: null,
      geettest: null,
      geetOnReady: false,
      sendCodeLoading: false,
      rules: {
        email: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.EMAIL_BLANK'))
              }
              if (value.length > 100) {
                callback(this.$t('errorMsg.EMAIL_LIMIT_LENGTH'))
              }
              if (util.checkEmail(value)) {
                callback()
              } else {
                callback(this.$t('errorMsg.EMAIL_ERR'))
              }
            },
            trigger: 'blur'
          }
        ],
        emailcode: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.EMAIL_CODE_BLANK'))
              }
              if (value.length > 20) {
                callback(this.$t('errorMsg.EMAIL_CODE_LIMIT_LENGTH'))
              }
              if (util.checkCode(value)) {
                callback()
              } else {
                callback(this.$t('errorMsg.SYMBOL_ERR'))
              }
            },
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.PWD_BLANK'))
              }
              if (util.checkPwd(value)) {
                callback()
              } else {
                callback(this.$t('errorMsg.PWD_LIMIT'))
              }
            },
            trigger: 'blur'
          }
        ],
        pwd2: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.PWD2_BLANK'))
              }
              if (!util.checkPwd(value)) {
                callback(this.$t('errorMsg.PWD_LIMIT'))
              }
              if (value != this.regInfo.pwd) {
                callback(this.$t('errorMsg.DIFFERENT_PASSWORD_IPT'))
              } else {
                callback()
              }
              callback()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    activeLang() {
      return this.$store.state.activeLang
    }
  },
  methods: {
    regUser(name) {
      var vu = this
      this.$refs[name].validate(valid => {
        if (valid) {
          if (vu.geetOnReady) {
            vu.geettest.verify()
          } else {
            vu.$Message.error(vu.$t('errorMsg.GEET_LOAD_ERR_TIP'))
          }
        }
        //  else {
        //   vu.$Message.error(vu.$t('errorMsg.CHECK_FAIL'))
        // }
      })
    },
    regUserFn() {
      var vu = this
      var result = this.geettest.getValidate()
      let params = {
        email: vu.regInfo.email,
        code: vu.regInfo.emailcode,
        inviteCode: vu.regInfo.code,
        channel: vu.regInfo.source,
        token: vu.regtoken,
        password: md5(vu.regInfo.pwd),
        geetest_challenge: result.geetest_challenge,
        geetest_validate: result.geetest_validate,
        geetest_seccode: result.geetest_seccode,
        gtserver: vu.gtserver
      }
      ax
        .post(config.url.user + '/api/user/verifyRegister', params)
        .then(function(res) {
          console.log(res)
          if (res.status == '200' && res.data.errorCode == 0) {
            sessionStorage.removeItem('regInviteCode');
            sessionStorage.removeItem('regSource');
            vu.$Message.success(vu.$t('errorMsg.REGISTER_SUCC'))
            vu.$router.push('/login')
            // vu.$Modal.success({
            //   content: '用户注册成功！',
            //   onOk: function() {
            //     vu.$router.push('/login')
            //   }
            // })
          } else if (res.data.errorCode == 2) {
            vu.geettest.reset()
            vu.$Message.error(vu.$t('errorMsg.REGISTER_IPT_ERR'))
          } else {
            vu.geettest.reset()
            vu.$Message.error(vu.$t('errorMsg.FAIL'))
          }
        })
        .catch(() => {
          vu.geettest.reset()
          vu.$Message.error(vu.$t('errorMsg.NETWORK_ERROR'))
        })
    },

    /**
     * 倒计时
     */
    handleCodeDown () {
      var time = 60
      this.codeDownText = time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        time -= 1
        if (time <= 0) {
          this.codeDown = false
          clearInterval(this.timer)
        }
        this.codeDownText = time + 's ' + this.$t('userCenter.bindPhone.codeDownText')
      }, 1000)
    },
    sendemail() {
      if (this.sendCodeLoading) {
        return
      }
      var vu = this
      var lang = this.activeLang === 'cn' ? 'zh-cn' : this.activeLang === 'en' ? 'en-us' : ''
      console.log('lang = ' + lang)
      this.$refs['regInfo'].validateField('email', function(error) {
        if (!error) {
          vu.sendCodeLoading = true
          ax
            .post(config.url.user + '/api/user/register', {
              email: vu.regInfo.email,
              language: lang
            })
            .then(function(res) {
              vu.sendCodeLoading = false
              if (res.status == '200' && res.data.errorCode == 0) {
                vu.regtoken = res.data.result.token
                vu.$Message.success(vu.$t('errorMsg.EMAIL_SEND_SUCC'))
                vu.codeDown = true;
                vu.handleCodeDown();
              } else if (res.data.errorCode == 200) {
                vu.$Message.error(vu.$t('errorMsg.USER_EXISTED'))
              } else if (res.data.errorCode == 707) {
                vu.$Message.error(vu.$t('errorMsg.REQ_LIMIT'))
              } else {
                vu.$Message.error(vu.$t('errorMsg.FAIL'))
              }
            })
            .catch(() => {
              vu.sendCodeLoading = false
              vu.$Message.error(vu.$t('errorMsg.NETWORK_ERROR'))
            })
        } else {
          vu.$Message.error(error)
        }
      })
    },
    initGeetest() {
      var vu = this
      ax
        .post(config.url.user + '/api/user/initCaptcha')
        .then(res => {
          var data = res.data
          vu.gtserver = data.gtserver
          vu.$initGeetest(
            {
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success,
              new_captcha: true,
              product: 'bind',
              lang: this.activeLang ? (this.activeLang === 'cn') ? 'zh-cn' : this.activeLang : 'zh-cn'
            },
            function(captchaObj) {
              vu.geettest = captchaObj
              captchaObj
                .onReady(function() {
                  console.log('onready')
                  vu.geetOnReady = true
                })
                .onSuccess(function() {
                  vu.regUserFn()
                })
                .onError(function() {
                  vu.geetOnReady = false
                  vu.$Message.error(this.$t('errorMsg.GEET_INIT_ERR'))
                })
            }
          )
        })
        .catch(() => {
          console.log('network error')
        })
    },
    onEnter (e) {
      if (e.keyCode === 13) {
        this.regUser('regInfo')
      }
    }
  },
  created() {
    this.initGeetest()
    this.regInfo.code = this.$route.params.code
    this.regInfo.source = this.$route.query.source

    // 邀请码
    if (this.regInfo.code) {
      sessionStorage.setItem('regInviteCode', this.regInfo.code);
    } else {
      let regInviteCode = sessionStorage.getItem('regInviteCode');
      this.regInfo.code = regInviteCode ? regInviteCode : '';
    }

    // 来源
    if (this.regInfo.source) {
      sessionStorage.setItem('regSource', this.regInfo.source);
    } else {
      let source = sessionStorage.getItem('regSource');
      this.regInfo.source = source ? source : '';
    }
    
    var vu = this
    bus.$on('langChange', () => {
      vu.$refs.regInfo.resetFields()
      this.initGeetest()
    })
    window.addEventListener('keyup', this.onEnter)
  },
  destroyed () {
    window.removeEventListener('keyup', this.onEnter)
  }
}
</script>

<style lang="less">
@import url(./style/config.less);
.reg {
  padding-top: 16px;
  .ivu-input {
    font-size: @font-text;
  }
  .ivu-btn {
    width: 200px;
    margin-right: 32px;
  }
  .content {
    padding: 32px;
    position: relative;

    h1 {
      color: @font-color-blue;
      font-size: 20px;
      font-weight: normal;
    }
    hr {
      background-color: @hr-color;
      border: none;
      height: 1px;
      margin: 32px auto;
    }
    .reg_form {
      width: 520px;
      label {
        font-size: @font-text;
      }
      input {
        font-size: @font-text;
      }
    }
    .info {
      background: @text-bg-color;
      padding: 16px;
      position: absolute;
      top: 165px;
      left: 650px;
      line-height: 40px;
    }
  }
  .send-code-down {
    box-sizing: border-box;
    min-width: 140px;
    height: 50px;
    line-height: 48px;
    padding: 0 10px;
    border: 1px solid #999;
    color: #fff;
    background-color: #999;
    text-align: center;
    border-radius: 4px;
  }
  .send-code-btn {
    position: relative;
    // display: inline-block;
    box-sizing: border-box;
    min-width: 140px;
    height: 50px;
    line-height: 48px;
    border-radius: 4px;
    padding: 0 10px;
    border: 1px solid #419aec;
    color: #419aec;
    background-color: #fff;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: #419aec;
      color: #fff;
    }
  }
}
</style>
