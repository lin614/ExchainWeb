
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
                  <Button type="primary" @click="handleSubmit('regInfo')">注册</Button> 已有账户？请
                  <router-link to="/login">登录</router-link>
                </FormItem>
              </Form>
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
      regInfo: {
        email: '',
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
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('成功!')
        } else {
          this.$Message.error('失败!')
        }
      })
    }
  }
}
</script>

<style lang="less">
@import url(./style/config.less);
.reg {
  padding-top: 16px;

  .content {
    padding: 32px;
    position: relative;
    //默认组件样式
    .ivu-input {
      border-radius: 0;
      font-size: @font-text;
    }

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
      width: 450px;
      label {
        font-size: @font-text;
      }
      input {
        font-size: @font-text;
      }
      .ivu-btn {
        width: 200px;
        margin-right: 32px;
        border-radius: 0;
      }
    }
    // .form {
    //   label {
    //     display: block;
    //     margin: 8px auto;
    //   }
    //   input {
    //     width: 450px;
    //     padding: 8px;
    //     margin-bottom: 16px;
    //     &::-webkit-input-placeholder {
    //       color: @placeholder-color;
    //     }
    //   }
    //   .ivu-btn {
    //     width: 200px;
    //     margin-right: 32px;
    //     border-radius: 0;
    //   }
    //   .ckb {
    //     label {
    //       display: inline-block;
    //       margin-right: 16px;
    //     }
    //     margin-bottom: 32px;
    //     input {
    //       width: auto;
    //     }
    //   }
    // }
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
