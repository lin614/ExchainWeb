
<template>
  <page>
    <div class="login">
      <block>
        <crd slot="inner">
          <span slot="title">{{ $t('userCenter.login.login') }}</span>
          <div class=" content">
            <h1>{{ $t('userCenter.login.welcomeLogin') }}</h1>
            <hr/>

            <div class="login_form">
              <Form ref="loginInfo" label-position="top" :model="loginInfo" :rules="rules">
                <FormItem prop="email" :label="$t('userCenter.login.email')">
                  <Input v-model="loginInfo.email" :placeholder="$t('userCenter.login.pleaseInputEmail')"></Input>
                </FormItem>

                <FormItem prop="pwd" :label="$t('userCenter.login.password')">
                  <Input v-model="loginInfo.pwd" type="password" :placeholder="$t('userCenter.login.pleaseInputPassword')">
                  </Input>
                </FormItem>

                <FormItem>
                  <Button type="primary" @click="login()">{{ $t('userCenter.login.login') }}</Button>
                  {{ $t('userCenter.login.forgotPassword') }}?
                  <router-link to="/reset">{{ $t('userCenter.login.resetPassword') }}</router-link>
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
// import bus from '../bus.js'

export default {
  name: 'login',
  components: { page, block, crd },
  data() {
    return {
      geetOnReady: false,
      gtserver: '',
      loginInfo: {
        email: '',
        pwd: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      var vu = this
      this.$refs['loginInfo'].validate(valid => {
        if (valid) {
          if (this.geetOnReady) {
            vu.geettest.verify()
          } else {
            vu.$Message.error('验证码加载失败，请重试')
          }
        } else {
          vu.$Message.error('验证失败!')
        }
      })
    },
    loginFn() {
      var vu = this
      var result = this.geettest.getValidate()
      ax
        .post(
          config.url.user + '/api/user/login',
          {
            email: vu.loginInfo.email,
            password: md5(vu.loginInfo.pwd),
            geetest_challenge: result.geetest_challenge,
            geetest_validate: result.geetest_validate,
            geetest_seccode: result.geetest_seccode,
            gtserver: vu.gtserver
          },
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
              cookie.set('PN', res.data.result.pn, {
                domain: config.url.domain
              })
              cookie.set('email', vu.loginInfo.email, {
                domain: config.url.domain
              })
              cookie.set('uid', res.data.result.id, {
                domain: config.url.domain
              })
              var Pn = encodeURIComponent(res.data.result.pn)
              sessionStorage.setItem('PN', Pn)
            }

            vu.$router.push('/userCenter')
          } else if (res.data.errorCode == 202) {
            vu.geettest.reset()
            vu.$Message.error('用户名或密码错误')
          } else {
            vu.geettest.reset()
            vu.$Message.error('登录失败')
          }
        })
        .catch(function(error) {
          vu.geettest.reset()
          vu.$Message.error('登录失败')
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
              product: 'bind'
            },
            function(captchaObj) {
              vu.geettest = captchaObj
              captchaObj
                .onReady(function() {
                  vu.geetOnReady = true
                })
                .onSuccess(function() {
                  vu.loginFn()
                })
                .onError(function() {
                  vu.geetOnReady = false
                  vu.$Message.error(
                    '验证码初始化异常，请尝试刷新页面来进行验证码初始化'
                  )
                })
            }
          )
        })
        .catch(() => {
          console.log('网络异常')
        })
    }
  },
  mounted() {
    this.initGeetest()
  }
}
</script>

<style lang="less">
@import url(./style/config.less);
.login {
  padding-top: 16px;
  .ivu-input {
    border-radius: 0;
    font-size: @font-text;
  }
  .ivu-btn {
    width: 200px;
    margin-right: 32px;
    border-radius: 0;
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
      width: 400px;
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
