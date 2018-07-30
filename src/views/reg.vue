
<template>
  <page>
    <div class="reg">
      <block>
        <crd slot="inner">
          <span slot="title">注册</span>
          <div class=" content">
            <h1>注册 Exchain 账号</h1>
            <hr/>
            <div class="reg_form">
              <Form ref="regInfo" label-position="top" :model="regInfo" :rules="rules">
                <FormItem prop="email" label="邮箱">
                  <Input v-model="regInfo.email" placeholder="请输入有效的邮箱"></Input>
                </FormItem>
                <FormItem prop="emailcode" label="邮箱验证码">
                  <Input v-model="regInfo.emailcode" placeholder="请输入邮箱里收到的验证码"></Input>
                </FormItem>
                <FormItem prop="pwd" label="密码">
                  <Input v-model="regInfo.pwd" type="password" placeholder="请输入6位以上字符的密码">
                  </Input>
                </FormItem>
                <FormItem prop="pwd2" label="确认密码">
                  <Input v-model="regInfo.pwd2" type="password" placeholder="请再次输入密码">
                  </Input>
                </FormItem>
                <FormItem prop="code" label="邀请码（选填）">
                  <Input v-model="regInfo.code" type="text" placeholder="">
                  </Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="regUser('regInfo')">注册</Button> 已有账户？请
                  <router-link to="/login">登录</router-link>
                </FormItem>
              </Form>
            </div>
            <div class="reg_sendemail">
              <a @click="sendemail">发送验证码</a>
            </div>
            <div class="info">
              <p>
                验证邮件可能会被误判为垃圾邮件，请注意查收。<br/> 请妥善保存您的 Exchain 账号及登录密码。<br/> 请勿和其他网站使用相同的登录密码。
              </p>
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
import md5 from 'crypto-md5'
export default {
  name: 'reg',
  components: { page, block, crd },
  data() {
    var vu = this
    var vali = function(rule, value, callback) {
      if (value != vu.regInfo.pwd) {
        callback(new Error('两次密码必须一致'))
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
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        emailcode: [
          {
            required: true,
            message: '邮箱验证码不能为空',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '密码不能为空.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码长度必须大于6位',
            trigger: 'blur'
          }
        ],
        pwd2: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: vali
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
            vu.$Message.error('验证码加载失败，请重试')
          }
        } else {
          vu.$Message.error('验证失败!')
        }
      })
    },
    regUserFn () {
      var vu = this
      var result = this.geettest.getValidate()
      ax
        .post('/api/user/verifyRegister', {
          email: vu.regInfo.email,
          code: vu.regInfo.emailcode,
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
            vu.$Message.success('注册成功!')
            vu.$router.push('/login')
            // vu.$Modal.success({
            //   content: '用户注册成功！',
            //   onOk: function() {
            //     vu.$router.push('/login')
            //   }
            // })
          } else if (res.data.errorCode == 2) {
            vu.geettest.reset()
            vu.$Message.error('信息填写有误，请检查您的输入')
          } else {
            vu.geettest.reset()
            vu.$Message.error('操作失败')
          }
        })
        .catch(() => {
          vu.geettest.reset()
          vu.$Message.error('网络异常')
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
            .post('/api/user/register', {
              email: vu.regInfo.email
            })
            .then(function(res) {
              vu.sendCodeLoading = false
              if (res.status == '200' && res.data.errorCode == 0) {
                vu.regtoken = res.data.result.token
                vu.$Message.success('已发送邮件成功!')
              } else if (res.data.errorCode == 200) {
                vu.$Message.error('用户已存在')
              } else if (res.data.errorCode == 707) {
                vu.$Message.error('限制请求，请稍候再试')
              } else {
                vu.$Message.error('网络异常')
              }
            })
            .catch(() => {
              vu.sendCodeLoading = false
              vu.$Message.error('网络异常')
            })
        } else {
          vu.$Message.error(error)
        }
      })
    },
    initGeetest () {
      var vu = this
      ax.post('/api/user/initCaptcha')
        .then((res) => {
          var data = res.data
          vu.gtserver = data.gtserver
          vu.$initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: true,
            product: 'bind'
          }, function (captchaObj) {
            vu.geettest = captchaObj
            captchaObj.onReady(function(){
              console.log('onready')
              vu.geetOnReady = true
            }).onSuccess(function(){
                vu.regUserFn()
            }).onError(function(){
              vu.geetOnReady = false
              vu.$Message.error('验证码初始化异常，请尝试刷新页面来进行验证码初始化')
            })

          })
        })
        .catch(() => {
          console.log('网络异常')
        })
    }
  },
  created() {
    this.initGeetest()
    this.regInfo.code = this.$route.params.code
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
