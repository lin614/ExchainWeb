
<template>
  <page>
    <div class="login">
      <block>
        <crd slot="inner">
          <span slot="title">注册</span>
          <div class=" content">
            <h1>欢迎登录</h1>
            <hr/>

            <div class="form">

              <label>*邮箱</label>
              <input/>
              <label>*密码</label>
              <input />
              <br/>
              <Button type="primary" size="large">登录</Button>
            </div>

            <div class="info">
              <p>
                您还不是 Exchain 的用户<br/> 立即注册，在全球领先的数字交易平台开始交易。
                <br/>
                <router-link to="/reg">立即注册</router-link>
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
  name: 'login',
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
.login {
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
      }
      .ivu-btn {
        width: 200px;
        margin-right: 32px;
        border-radius: 0;
        margin-top: 48px;
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
