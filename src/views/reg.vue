<template>
  <page class="page_content-padding">
    <div class="reg">
      <block>
        <crd slot="inner">
          <span slot="title">{{$t('register.title')}}</span>
          <div class=" content">
            <h1>{{$t('register.dec')}}</h1>
            <hr/>
            <!-- <h1 style="text-align:center;">即将开放注册，敬请期待！</h1> -->
            <div class="reg_form">
              
              <Form ref="regInfo" label-position="top" :model="regInfo" :rules="rules">
                <FormItem prop="email" :label="$t('register.email')" class="ivu-form-item-required">
                  <Input v-model="regInfo.email" :placeholder="$t('register.pleaseIptEmail')"></Input>
                  <div>{{$t('register.emailTip')}}</div>
                </FormItem>

                <FormItem prop="emailcode" :label="$t('register.emailcode')" class="ivu-form-item-required">
                  <Input v-model="regInfo.emailcode" :placeholder="$t('register.pleaseIptEmailCode')" style="width: 360px"></Input>

                  <div v-show="codeDown" class="send-code-down fr">{{codeDownText}}</div>
                  <div v-show="!codeDown" class="send-code-btn fr" ref="sendEmail"><Spin v-show="sendCodeLoading" size="small" fix></Spin><span>{{$t('register.sendCode')}}</span></div>
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

                <FormItem prop="protocol">
                  <Checkbox v-model="regInfo.protocol">
                    {{$t('register.readed')}}
                    <router-link class="login" to="/cont" target="_blank">{{$t('register.protocol')}}</router-link>
                  </Checkbox>
                </FormItem>

                <FormItem>
                  <Button class="btn-large" type="primary" ref="regUser"><Spin v-show="regLoading" :fix="true"></Spin>{{$t('register.registerBtn')}}</Button> {{$t('register.toLogin')}}
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
        code: '',
        protocol: false
      },
      sense: null,
      geettestFlag: '',
      codeDown: false,
      regLoading: false,
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
        ],
        protocol: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(this.$t('errorMsg.PROTOCOL_BLANK'))
              }
              callback()
            },
            trigger: 'change'
          }
        ],
      }
    }
  },
  computed: {
    activeLang() {
      return this.$store.state.activeLang
    }
  },
  methods: {
    sendemailBefore() {
      if (this.sendCodeLoading) {
        return
      }
      var vu = this
      this.$refs['regInfo'].validateField('email', function(error) {
        if (!error) {
          vu.geettestFlag = 'SEND_EMAIL_CODEA';
          vu.sense.sense();
        }
      })
    },

    sendEmail (params) {
      var vu = this
      
      var lang = this.activeLang === 'cn' ? 'zh-cn' : this.activeLang === 'en' ? 'en-us' : ''
      vu.sendCodeLoading = true

      let captcha_type = '';
      if (this.$t('common.lang') === 'cn') {
        captcha_type = 'dk-register'
      } else {
        captcha_type = 'dk-register-en'
      }

      params.email = vu.regInfo.email;
      params.language = lang;
      params.captcha_type = captcha_type;

      ax
        .post(config.url.user + '/api/user/register', params)
        .then(function(res) {
          vu.sendCodeLoading = false
          if (res.status == '200' && res.data.errorCode == 0) {
            vu.regtoken = res.data.result.token
            vu.$Message.success(vu.$t('errorMsg.EMAIL_SEND_SUCC'))
            vu.codeDown = true;
            vu.handleCodeDown();
            // vu.geettest.reset();
          } else {
            // vu.geettest.reset();
            apiError(vu, res);
          }
        })
        .catch((err) => {
          // vu.geettest.reset();
          vu.sendCodeLoading = false
          apiReqError(vu, err);
        })
    },

    regUser() {
      var vu = this
      this.regLoading = true
      this.$refs['regInfo'].validate(valid => {
        if (valid) {
          vu.geettestFlag = 'SUBMIT_DATA';
          vu.sense.sense();
        } else {
          vu.regLoading = false
        }
      })
    },

    regUserFn(params) {
      var vu = this

      let captcha_type = '';
      if (this.$t('common.lang') === 'cn') {
        captcha_type = 'dk-register'
      } else {
        captcha_type = 'dk-register-en'
      }

      params.email = vu.regInfo.email;
      params.code = vu.regInfo.emailcode;
      params.channel = vu.regInfo.source;
      params.inviteCode = vu.regInfo.code;
      params.token = vu.regtoken;
      params.password = md5(vu.regInfo.pwd);
      params.captcha_type = captcha_type;

      ax
        .post(config.url.user + '/api/user/verifyRegister', params)
        .then(function(res) {
          etLog(res)
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
            // vu.geettest.reset();
          } else {
            vu.regLoading = false
            // vu.geettest.reset()
            apiError(vu, res)
          }
        })
        .catch((err) => {
          vu.regLoading = false
          // vu.geettest.reset()
          apiReqError(vu, err)
        })
    },

    initGeetest() {
      var vu = this
      let params = null;

      if (this.$t('common.lang') === 'cn') {
        params = {type: 'dk-register'}
      } else {
        params = {type: 'dk-register-en'}
      }

      ax
        .post(config.url.user + '/api/user/initCaptcha', params)
        .then(res => {
          var data = res.data
          this.initSenseAction(data);
        })
        .catch(() => {
          vu.$Message.error(vu.$t('errorMsg.NETWORK_ERROR'));
        })
    },

    initSenseAction (data) {
      let vu = this;
      vu.$initSense({
        id: data.id,
        lang: vu.$t('common.lang') === 'cn' ? 'zh-cn' : 'en',
        onError:function(err){
            etLog('gt error', err)
        }
      }, sense => {
        vu.sense = sense;
        vu.$refs.sendEmail.addEventListener('click', this.sendemailBefore);
        vu.$refs.regUser.$el.addEventListener('click', this.regUser);

        sense.setInfos(function () {
          return {
            interactive: 1  //用户场景
          }
        }).onSuccess(function (data) {
          if (vu.geettestFlag === 'SUBMIT_DATA') {
            let params = {geetest_challenge: data.challenge}
            vu.regUserFn(params);
          } else {
            let params = {geetest_challenge: data.challenge}
            vu.sendEmail(params)
          }
        }).onClose(function(){
          vu.regLoading = false
          etLog('close')
        }).onError(function(err){
          etLog(err);
          if(err && err.code === '1001'){
              submit({})
          }
        })
      });
    },

    initGeetestAction (data) {
      vu.gtserver = data.gtserver
      var result = this.geettest.getValidate()
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
              etLog('onready')
              vu.geetOnReady = true
            })
            .onSuccess(function() {
              if (vu.geettestFlag === 'SUBMIT_DATA') {
                let params = {
                  geetest_challenge: result.geetest_challenge,
                  geetest_validate: result.geetest_validate,
                  geetest_seccode: result.geetest_seccode,
                  gtserver: vu.gtserver
                };
                vu.regUserFn();
              } else {
                let params = {
                  geetest_challenge: result.geetest_challenge,
                  geetest_validate: result.geetest_validate,
                  geetest_seccode: result.geetest_seccode,
                  gtserver: vu.gtserver
                }
                vu.sendEmail();
              }
            })
            .onError(function() {
              vu.geetOnReady = false
              vu.$Message.error(this.$t('errorMsg.GEET_INIT_ERR'))
            })
            .onClose(function () {
              vu.regLoading = false
            })
        }
      )
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

    sendemailBefore0() {
      if (this.sendCodeLoading) {
        return
      }
      var vu = this
      this.$refs['regInfo'].validateField('email', function(error) {
        if (!error) {
          if (vu.geetOnReady) {
            vu.geettestFlag = 'SEND_EMAIL_CODEA';
            vu.geettest.verify()
          } else {
            vu.$Message.error(vu.$t('errorMsg.GEET_LOAD_ERR_TIP'))
          }
        }
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
  },

  mounted() {
    var vu = this
    bus.$on('langChange', () => {
      vu.$refs.regInfo.resetFields();
      vu.$refs.sendEmail.removeEventListener('click', this.sendemailBefore, false);
      vu.$refs.regUser.$el.removeEventListener('click', this.regUser, false);
      this.initGeetest();
    })
    window.addEventListener('keyup', this.onEnter)
  },
  destroyed () {
    clearInterval(this.timer)
    bus.$off('langChange');
    window.removeEventListener('keyup', this.onEnter)
  }
}
</script>

<style lang="less">
@import url(./style/config.less);
.reg {
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
    height: 40px;
    line-height: 38px;
    padding: 0 10px;
    border: 1px solid #999;
    color: #fff;
    background-color: #999;
    text-align: center;
    border-radius: 0px;
  }
  .send-code-btn {
    position: relative;
    // display: inline-block;
    box-sizing: border-box;
    min-width: 140px;
    height: 40px;
    line-height: 40px;
    border-radius: 0px;
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
  .btn-large {
    position: relative;
  }
  .ivu-checkbox-inner {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
}
</style>
