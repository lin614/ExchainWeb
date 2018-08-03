
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
                <FormItem prop="email" :label="$t('register.email')">
                  <Input v-model="regInfo.email" :placeholder="$t('register.pleaseIptEmail')"></Input>
                </FormItem>
                <FormItem prop="emailcode" :label="$t('register.emailcode')">
                  <Input v-model="regInfo.emailcode" :placeholder="$t('register.pleaseIptEmailCode')"></Input>
                </FormItem>
                <FormItem prop="pwd" :label="$t('register.pwd')">
                  <Input v-model="regInfo.pwd" type="password" :placeholder="$t('register.pleaseIptPwd')">
                  </Input>
                </FormItem>
                <FormItem prop="pwd2" :label="$t('register.pwd2')">
                  <Input v-model="regInfo.pwd2" type="password" :placeholder="$t('register.pleaseInputPwd2')">
                  </Input>
                </FormItem>
                <FormItem prop="code" :label="$t('register.code')">
                  <Input v-model="regInfo.code" type="text" placeholder="">
                  </Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="regUser('regInfo')">{{$t('register.registerBtn')}}</Button> {{$t('register.toLogin')}}
                  <router-link to="/login">{{$t('register.login')}}</router-link>
                </FormItem>
              </Form>
            </div>
            <div class="reg_sendemail">
              <a @click="sendemail">{{$t('register.sendCode')}}</a>
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
export default {
  name: 'reg',
  components: { page, block, crd },
  data() {
    var vu = this
    var vali = function(rule, value, callback) {
      if (value != vu.regInfo.pwd) {
        callback(this.$t('errorMsg.DIFFERENT_PASSWORD_IPT'))
      } else {
        callback()
      }
    }
    return {
      regtoken: '',
      gtserver: '',
      regInfo: {
        email: '',
        emailcode: '',
        pwd: '',
        pwd2: '',
        code: ''
      },
      geettest: null,
      geetOnReady: false,
      sendCodeLoading: false,
      rules: {
        email: [
          {
            required: true,
            message: this.$t('errorMsg.EMAIL_BLANK'),
            trigger: 'blur'
          },
          {
            type: 'email',
            message: this.$t('errorMsg.EMAIL_ERR'),
            trigger: 'blur'
          }
        ],
        emailcode: [
          {
            required: true,
            message: this.$t('errorMsg.EMAIL_CODE_BLANK'),
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: this.$t('errorMsg.PWD_BLANK'),
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: this.$t('errorMsg.PWD_LIMIT'),
            trigger: 'blur'
          }
        ],
        pwd2: [
          {
            required: true,
            message: this.$t('errorMsg.PWD2_BLANK'),
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
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
        } else {
          vu.$Message.error(vu.$t('errorMsg.CHECK_FAIL'))
        }
      })
    },
    regUserFn() {
      var vu = this
      var result = this.geettest.getValidate()
      ax
        .post(config.url.user + '/api/user/verifyRegister', {
          email: vu.regInfo.email,
          code: vu.regInfo.emailcode,
          inviteCode: vu.regInfo.code,
          token: vu.regtoken,
          password: md5(vu.regInfo.pwd),
          geetest_challenge: result.geetest_challenge,
          geetest_validate: result.geetest_validate,
          geetest_seccode: result.geetest_seccode,
          gtserver: vu.gtserver
        })
        .then(function(res) {
          console.log(res)
          if (res.status == '200' && res.data.errorCode == 0) {
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
    sendemail() {
      if (this.sendCodeLoading) {
        return
      }
      var vu = this
      this.$refs['regInfo'].validateField('email', function(error) {
        if (!error) {
          vu.sendCodeLoading = true
          ax
            .post(config.url.user + '/api/user/register', {
              email: vu.regInfo.email
            })
            .then(function(res) {
              vu.sendCodeLoading = false
              if (res.status == '200' && res.data.errorCode == 0) {
                vu.regtoken = res.data.result.token
                vu.$Message.success(vu.$t('errorMsg.EMAIL_SEND_SUCC'))
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
              product: 'bind'
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
    }
  },
  created() {
    this.initGeetest()
    this.regInfo.code = this.$route.params.code
    var vu = this
    bus.$on('langChange', () => {
      vu.$refs.regInfo.resetFields()
    })
    // console.log(this.$initGeetest)
    // this.initGeetest()
  }
}
</script>

<style lang="less">
@import url(./style/config.less);
.reg {
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
    .reg_form {
      width: 400px;
      label {
        font-size: @font-text;
      }
      input {
        font-size: @font-text;
      }
    }

    .reg_sendemail {
      position: absolute;
      top: 155px;
      left: 450px;
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
