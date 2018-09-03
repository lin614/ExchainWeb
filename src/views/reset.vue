
<template>
  <page class="page_content-padding">
    <div class="reset">
      <block>
        <crd slot="inner">
          <span slot="title">{{$t('reset.title')}}</span>
          <div class=" content">
            <h1>{{$t('reset.dec')}}</h1>
            <hr/>
            <div class="reset_form">
              <Form ref="resetInfo" label-position="top" :model="resetInfo" :rules="rules">
                <FormItem prop="email" :label="$t('register.email')" class="ivu-form-item-required">
                  <Input v-model="resetInfo.email" :placeholder="$t('register.pleaseIptEmail')"></Input>
                </FormItem>

                <FormItem prop="emailcode" :label="$t('register.emailcode')" class="ivu-form-item-required">
                  <Input v-model="resetInfo.emailcode" :placeholder="$t('register.pleaseIptEmailCode')" style="width: 360px"></Input>

                  <div v-show="codeDown" class="send-code-down fr">{{codeDownText}}</div>
                  <div v-show="!codeDown" class="send-code-btn fr" ref="sendEmail"><Spin v-show="sendCodeLoading" size="small" fix></Spin><span>{{$t('register.sendCode')}}</span></div>
                </FormItem>

                <FormItem prop="pwd" :label="$t('register.pwd')" class="ivu-form-item-required">
                  <Input v-model="resetInfo.pwd" type="password" :placeholder="$t('register.pleaseIptPwd')">
                  </Input>
                </FormItem>

                <FormItem prop="pwd2" :label="$t('register.pwd2')" class="ivu-form-item-required">
                  <Input v-model="resetInfo.pwd2" type="password" :placeholder="$t('register.pleaseInputPwd2')">
                  </Input>
                </FormItem>

                <FormItem>
                  <Button class="btn-large" type="primary" ref="reset"><Spin v-show="resetLoading" :fix="true"></Spin>{{$t('reset.resetBtn')}}</Button>{{$t('reset.toLogin')}}
                  <router-link to="/login">{{$t('reset.login')}}</router-link>
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
      resettoken: '',
      gtserver: '',
      resetLoading: false,
      resetInfo: {
        email: '',
        emailcode: '',
        pwd: '',
        pwd2: '',
        code: ''
      },

      geettestFlag: '',

      codeDown: false,
      codeDownText: '',
      timer: null,
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
              if (value != this.resetInfo.pwd) {
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
    sendemailBefore() {
      if (this.sendCodeLoading) {
        return
      }
      var vu = this
      this.$refs['resetInfo'].validateField('email', function(error) {
        if (!error) {
          vu.geettestFlag = 'SEND_EMAIL_CODEA';
          vu.sense.sense();
        }
      })
    },

    sendEmail (params) {
      var vu = this
      
      var lang = this.activeLang === 'cn' ? 'zh-cn' : this.activeLang === 'en' ? 'en-us' : '';
      vu.sendCodeLoading = true

      let captcha_type = '';
      if (this.$t('common.lang') === 'cn') {
        captcha_type = 'dk-reset'
      } else {
        captcha_type = 'dk-reset-en'
      }

      params.email = vu.resetInfo.email;
      params.language = lang;
      params.captcha_type = captcha_type;

      ax
        .post(config.url.user + '/api/user/resetPassword', params)
        .then(function(res) {
          vu.sendCodeLoading = false
          if (res.status == '200' && res.data.errorCode == 0) {
            vu.resettoken = res.data.result.token
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
        });
    },

    resSetPwd() {
      var vu = this
      this.resetLoading = true
      this.$refs['resetInfo'].validate(valid => {
        if (valid) {
          vu.geettestFlag = 'SUBMIT_DATA';
          vu.sense.sense();
        } else {
          vu.resetLoading = false
        }
      })
    },

    resSetPwdFn(params) {
      let vu = this;

      let captcha_type = '';
      if (this.$t('common.lang') === 'cn') {
        captcha_type = 'dk-reset'
      } else {
        captcha_type = 'dk-reset-en'
      }

      params.email = this.resetInfo.email;
      params.code = this.resetInfo.emailcode;
      params.token = this.resettoken;
      params.password = md5(this.resetInfo.pwd);
      params.captcha_type = captcha_type;

      ax
        .post(config.url.user + '/api/user/verifyResetPassword', params)
        .then(function(res) {
          if (res.status == 200 && res.data.errorCode == 0) {
            // vu.$Modal.success({
            //   content: '重置密码成功！',
            //   onOk: function() {
            //     vu.$router.push('/login')
            //   }
            // })
            vu.$Message.success(vu.$t('errorMsg.RESET_SUCC'))
            vu.$router.push('/login');
            // vu.geettest.reset();
          } else {
            vu.resetLoading = false
            // vu.geettest.reset()
            apiError(vu, res);
          }
        })
        .catch((err) => {
          vu.resetLoading = false
          // vu.geettest.reset()
          apiReqError(vu, err);
        })
    },

    initGeetest() {
      var vu = this
      let params = null;

      if (this.$t('common.lang') === 'cn') {
        params = {type: 'dk-reset'}
      } else {
        params = {type: 'dk-reset-en'}
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
            console.log('gt error', err)
        }
      }, sense => {
        vu.sense = sense;
        vu.$refs.sendEmail.addEventListener('click', this.sendemailBefore);
        vu.$refs.reset.$el.addEventListener('click', this.resSetPwd);

        sense.setInfos(function () {
          return {
            interactive: 1  //用户场景
          }
        }).onSuccess(function (data) {
          if (vu.geettestFlag === 'SUBMIT_DATA') {
            let params = {geetest_challenge: data.challenge}
            vu.resSetPwdFn(params);
          } else {
            let params = {geetest_challenge: data.challenge}
            vu.sendEmail(params)
          }
        }).onClose(function(){
          console.log('close')
          vu.resetLoading = false
        }).onError(function(err){
          console.log(err);
          if(err && err.code === '1001'){
              submit({})
          }
        })
      });
    },

    initGeetestAction (data) {
      vu.gtserver = data.gtserver
        vu.$initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: true,
          product: 'bind',
          lang: this.activeLang ? (this.activeLang === 'cn') ? 'zh-cn' : this.activeLang : 'zh-cn'
        }, function (captchaObj) {
          vu.geettest = captchaObj
          captchaObj.onReady(function(){
            console.log('onready')
            vu.geetOnReady = true
          }).onSuccess(function(){
            if (vu.geettestFlag === 'SUBMIT_DATA') {
              var result = this.geettest.getValidate()
              let params = {
                geetest_challenge: data.challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode,
                gtserver: vu.gtserver
              }
              vu.resSetPwdFn(params);
            } else {
              var result = this.geettest.getValidate()
              let params = {
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode,
                gtserver: vu.gtserver
              };
              vu.sendEmail(params);
            }
          }).onError(function(){
            vu.geetOnReady = false
            vu.$Message.error(vu.$t('errorMsg.GEET_INIT_ERR'))
          })
          .onClose(function () {
            vu.resetLoading = false
          })
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

    resSetPwd0(name) {
      var vu = this
      this.resetLoading = true
      this.$refs[name].validate(valid => {
        if (valid) {
          if (vu.geetOnReady) {
            vu.geettestFlag = 'SUBMIT_DATA';
            vu.geettest.verify()
          } else {
            vu.resetLoading = false
            vu.$Message.error(vu.$t('errorMsg.GEET_LOAD_ERR_TIP'))
          }
        } else {
          vu.resetLoading = false
        }
      })
    },

    sendemailBefore0() {
      if (this.sendCodeLoading) {
        return
      }
      var vu = this
      this.$refs['resetInfo'].validateField('email', function(error) {
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
        this.resSetPwd('resetInfo')
      }
    }
  },
  created() {
    this.resetInfo.code = this.$route.params.code
    var vu = this
    bus.$on('langChange', () => {
      vu.$refs.resetInfo.resetFields()
      vu.$refs.sendEmail.removeEventListener('click', this.sendemailBefore, false);
      vu.$refs.reset.$el.removeEventListener('click', this.resSetPwd, false);
      this.initGeetest()
    })
    window.addEventListener('keyup', this.onEnter)
  },
  mounted() {
    this.initGeetest()
  },
  destroyed () {
    window.removeEventListener('keyup', this.onEnter)
  }
}
</script>

<style lang="less">
@import url(./style/config.less);
.reset {
  .btn-large {
    position: relative;
  }
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
    .reset_form {
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
      top: 150px;
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
}
</style>
