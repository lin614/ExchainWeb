
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
import md5 from 'md5'
// import bus from '../bus.js'
export default {
  name: 'login',
  components: { page, block, crd },
  data() {
    return {
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
      // console.log('pwd', md5(vu.loginInfo.pwd))
      // console.log(this.$refs['loginInfo'])
      this.$refs['loginInfo'].validate(valid => {
        if (valid) {
          ax
            .post(
              '/api/user/login',
              {
                email: vu.loginInfo.email,
                password: md5(vu.loginInfo.pwd)
              },
              {
                withcredentials: true
              }
            )
            .then(function(res) {
              // console.log(res.data)
              if (res.status == '200' && res.data.errorCode == 0) {
                sessionStorage.setItem('uid', res.data.result.id)
                sessionStorage.setItem('email', res.data.result.email)
                // console.log(vu.$store.state.islogin)
                vu.$store.commit('showUserInfo', {
                  email: res.data.result.email,
                  mtime: res.data.result.mtime
                })
                if (res.data.result.PN) {
                  var Pn = encodeURIComponent(res.data.result.PN)
                  // console.log('Pn --- ' + Pn)
                  // document.cookie = 'PN=' + Pn
                  // cookie.set('PN', Pn, {
                  //   domain: config.url.domain,
                  //   path: '/'
                  // })
                  sessionStorage.setItem('PN', Pn)
                }

                vu.$router.push('/userCenter')
              } else {
                vu.$Modal.error({ content: '登录失败:' + res.data.errorMsg })
              }
            })
            .catch(function(error) {
              console.log(error)
              vu.$Modal.error({ content: '登录失败:' + error })
            })
        } else {
          this.$Message.error('验证失败!')
        }
      })
    }
  },
  mounted() {}
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
