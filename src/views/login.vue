<template>
  <page class="page_content-padding">
    <div class="login">
      <block>
        <crd slot="inner">
          <span slot="title">{{ $t('userCenter.login.login') }}</span>
          <div class=" content">
            <h1>{{ $t('userCenter.login.welcomeLogin') }}</h1>
            <hr/>

            <div class="login_form">
              <Form ref="loginInfo" label-position="top" :model="loginInfo" :rules="rules">
                <FormItem prop="email" :label="$t('userCenter.login.email')" class="ivu-form-item-required">
                  <Input v-model="loginInfo.email" :placeholder="$t('userCenter.login.pleaseInputEmail')"></Input>
                </FormItem>

                <FormItem prop="pwd" :label="$t('userCenter.login.password')" class="ivu-form-item-required">
                  <Input v-model="loginInfo.pwd" type="password" :placeholder="$t('userCenter.login.pleaseInputPassword')">
                  </Input>
                </FormItem>

                <FormItem>
                  <Button class="btn-large" type="primary" ref="loginBefore">{{ $t('userCenter.login.login') }}<Spin v-show="loginLoading" :fix="true"></Spin></Button>
                  {{ $t('userCenter.login.forgotPassword') }}?
                  <router-link to="/reset" v-html="$t('userCenter.login.resetPassword')"></router-link>
                  </router-link>
                </FormItem>
              </Form>
            </div>

            <div class="info">
              <p>{{ $t('userCenter.login.isnotEXUser') }} ?</p>
              <p>{{ $t('userCenter.login.quickReg') }}</p>
              <router-link to="/reg">{{ $t('userCenter.login.signUp') }}</router-link>
            </div>
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
import cookie from 'js-cookie'
import md5 from 'crypto-md5'
import util from '../libs/util.js'
// import bus from '../bus.js'

export default {
  name: 'login',
  components: { page, block, crd },
  data() {
    return {
      geetOnReady: false,
      loginLoading: false,
      gtserver: '',
      sense: null,
      loginInfo: {
        email: '',
        pwd: ''
      },
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
    loginBefore() {
      if (this.loginLoading) {
        return
      }
      this.loginLoading = true
      this.$refs['loginInfo'].validate(valid => {
        if (valid) {
          this.sense.sense();
        } else {
          this.loginLoading = false
        }
      })
    },
    login() {
      if (this.loginLoading) {
        return
      }
      this.loginLoading = true
      var vu = this
      this.$refs['loginInfo'].validate(valid => {
        if (valid) {
          if (vu.geetOnReady) {
            vu.geettest.verify()
          } else {
            vu.loginLoading = false
            vu.$Message.error(vu.$t('errorMsg.GEET_LOAD_ERR_TIP'))
          }
        } else {
          vu.loginLoading = false
        }
      })
    },
    loginFn(params) {
      var vu = this
      
      let captcha_type = '';
      if (this.$t('common.lang') === 'cn') {
        captcha_type = 'dk-login'
      } else {
        captcha_type = 'dk-login-en'
      }

      params.email = vu.loginInfo.email;
      params.password = md5(vu.loginInfo.pwd)
      params.captcha_type = captcha_type

      ax
        .post(
          config.url.user + '/api/user/login',
          params,
          {
            withcredentials: true
          }
        )
        .then(function(res) {
          if (res.status == '200' && res.data.errorCode == 0) {
            sessionStorage.setItem('uid', res.data.result.id)
            sessionStorage.setItem('email', res.data.result.email)
            vu.$store.commit('showUserInfo', {
              email: res.data.result.email,
              mtime: res.data.result.mtime
            })

            if (res.data.result.pn) {
              ax.defaults.headers.post['X-EXCHAIN-PN'] = res.data.result.pn
              let timestamp = Date.parse(new Date()) + (5*60*1000);
              
              let dateStr = new Date(timestamp);
              cookie.set('PN', res.data.result.pn, {
                domain: config.url.domain,
                expires: 0.08
              })
              cookie.set('email', vu.loginInfo.email, {
                domain: config.url.domain,
                expires: 0.08
              })
              cookie.set('uid', res.data.result.id, {
                domain: config.url.domain,
                expires: 0.08
              })
              var Pn = encodeURIComponent(res.data.result.pn)
              sessionStorage.setItem('PN', Pn)
            }

            vu.$router.push('/userCenter')
          } else {
            vu.loginLoading = false
            // vu.geettest.reset()
            apiError(vu, res);
          }
        })
        .catch(function(err) {
          vu.loginLoading = false
          // vu.geettest.reset()
          apiReqError(vu, err);
        })
    },
    
    initGeetest() {
      var vu = this
      let params = null;

      if (this.$t('common.lang') === 'cn') {
        params = {type: 'dk-login'}
      } else {
        params = {type: 'dk-login-en'}
      }
      ax
        .post(config.url.user + '/api/user/initCaptcha', params)
        .then(res => {
          var data = res.data
          // this.initGeetestAction(data);
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
        vu.$refs.loginBefore.$el.addEventListener('click', this.loginBefore);
        sense.setInfos(function () {
          return {
            interactive: 2  //用户场景
          }
        }).onSuccess(function (data) {
          let params = {geetest_challenge: data.challenge}
          vu.loginFn(params)
        }).onClose(function(){
          console.log('close')
          vu.loginLoading = false
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
              vu.geetOnReady = true
            })
            .onSuccess(function() {
              var result = this.geettest.getValidate()
              let params = {
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode,
                gtserver: vu.gtserver
              }
              vu.loginFn(params)
            })
            .onError(function() {
              vu.geetOnReady = false
              vu.$Message.error(vu.$t('errorMsg.GEET_INIT_ERR'))
            })
            .onClose(function () {
                vu.loginLoading = false
            })
        }
      )
    },
    onEnter (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    }
  },
  mounted() {
    this.initGeetest()
    var vu = this
    bus.$on('langChange', () => {
      vu.$refs.loginInfo.resetFields()
      vu.$refs.loginBefore.$el.removeEventListener('click', this.loginBefore, false);
      this.initGeetest()
    })
    window.addEventListener('keyup', this.onEnter)
  },
  destroyed () {
    bus.$off('langChange');
    window.removeEventListener('keyup', this.onEnter)
  }
}
</script>

<style lang="less">
@import url(./style/config.less);
.login {
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
    .login_form {
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
}
</style>
