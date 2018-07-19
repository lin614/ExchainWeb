
<template>
    <page>
        <div class="reg">
            <block>
                <crd slot="inner">
                    <span slot="title">注册</span>
                    <div class=" content">
                        <h1>注册 Exchain 账号</h1>
                        <hr/>

                        <div class="form">

                            <!-- <label>*用户名</label>
                            <input/> -->
                            <label>*邮箱</label>
                            <input/>
                            <label>*密码</label>
                            <input placeholder="密码要求：8 - 32个字符，至少一个字母，一个数字" type="password" />
                            <label>*再次输入</label>
                            <input placeholder="请再次输入密码" type="password" />
                            <label>邀请码（选填）</label>
                            <input/>

                            <div class="ckb">
                                <Checkbox v-model="single">
                                </Checkbox>
                                <label>
                                    我已阅读
                                    <router-link to="/cont" target="_blank">用户协议</router-link> 和
                                    <router-link to="/priv" target="_blank">隐私政策</router-link>
                                </label>
                            </div>
                            <Button type="primary" size="large">注册</Button> 已有账户？请
                            <router-link to="/login">登录</router-link>
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
    return {
      formItem: {
        input: ''
      }
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
    .form {
      label {
        display: block;
        margin: 8px auto;
      }
      input {
        width: 450px;
        padding: 8px;
        margin-bottom: 16px;
        &::-webkit-input-placeholder {
          color: @placeholder-color;
        }
      }
      .ivu-btn {
        width: 200px;
        margin-right: 32px;
        border-radius: 0;
      }
      .ckb {
        label {
          display: inline-block;
          margin-right: 16px;
        }
        margin-bottom: 32px;
        input {
          width: auto;
        }
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
