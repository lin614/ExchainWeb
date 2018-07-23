
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
import md5 from 'md5'
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
      regInfo: {
        email: '',
        emailcode: '',
        pwd: '',
        pwd2: '',
        code: ''
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
          ax
            .post('/api/user/verifyRegister', {
              email: vu.regInfo.email,
              code: vu.regInfo.emailcode,
              token: vu.regtoken,
              password: md5(vu.regInfo.pwd)
            })
            .then(function(res) {
              console.log(res)
              if (res.status == '200' && res.data.errorCode == 0) {
                // vu.$Message.success('用户注册成功!')
                vu.$Modal.success({
                  content: '用户注册成功！',
                  onOk: function() {
                    vu.$router.push('/login')
                  }
                })
              } else {
                vu.$Modal.error('注册失败:' + res.data.errorMsg)
              }
            })
        } else {
          this.$Message.error('验证失败!')
        }
      })
    },
    sendemail() {
      var vu = this
      this.$refs['regInfo'].validateField('email', function(error) {
        if (!error) {
            ax({
              url: '/api/user/register',
              method: 'post',
              data: {email: vu.regInfo.email}
            })
            .then(function(res) {
              console.log(res)
              vu.regtoken = res.data.result.token
              vu.$Message.success('已发送邮件成功!')
            })
        } else {
          vu.$Message.error(error)
        }
      })
    }
  },
  created() {
    this.regInfo.code = this.$route.params.code
    // console.log(this.$route.params)
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
