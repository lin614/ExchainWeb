<template>
  <block class="headr">
    <Row type="flex" justify="space-between" slot="inner">
      <Col>
      <div class="logo">
        <a href="/"><img src="../../static/imgs/logo.png"></a>
      </div>
      <Button class="menu" type="text">交易</Button>
      <router-link to="/et">
        <Button class="menu" type="text">ET</Button>
      </router-link>
      <router-link to="/paper">
        <Button class="menu" type="text">白皮书</Button>
      </router-link>

      <a target="_blank" href="https://support.exchain.com/hc/zh-cn">
        <Button class="menu" type="text">公告</Button>
      </a>

      <router-link to="/partner">
        <!-- <Tooltip :always="true" :transfer="true" placement="top-end" content="HOT!" :style="{ minWidth:0}"> -->
        <Button class="menu" type="text">合作伙伴计划</Button>
        <!-- <div slot="content">

              HOT!
            </div> -->
        <!-- </Tooltip> -->
      </router-link>

      </Col>
      <Col>
      <div class="tools">

        <a v-if="!isLogin">
          <Button type="text" id="btnLogin" @click="login()">登录</Button>
        </a>
        <!-- <router-link to="/login" v-if="!isLogin">
          <Button type="text" id="btnLogin">登录</Button>
        </router-link> -->
        <router-link to="/reg" v-if="!isLogin">
          <Button type="text" id="btnReg">注册</Button>
        </router-link>
        <router-link to="/usercenter/asset" v-if="isLogin">
          <Button type="text">我的资产</Button>
        </router-link>
        <Dropdown class="lan" v-if="isLogin">
          <router-link to="/usercenter">
            <Button type="text">
              <Icon type="person"></Icon>
              {{email}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
          </router-link>
          <Dropdown class="lan" <DropdownMenu slot="list">
            <DropdownItem>
              <router-link to="/usercenter">
                <span class="lan-item">个人中心</span>
              </router-link>
            </DropdownItem>
            <DropdownItem>
              <router-link to="/usercenter/entrust">
                <span class="lan-item">委托管理</span>
              </router-link>
            </DropdownItem>
            <DropdownItem>
              <router-link to="/bonus">
                <span class="lan-item">合作伙伴</span>
              </router-link>
            </DropdownItem>
            <DropdownItem>
              <a @click="logout()">
                <span class="lan-item">登出</span>
              </a>
            </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown class="lan">
            <a href="javascript:void(0)">
              <Icon type="earth"></Icon>
              简体中文
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>
                <span class="lan-item">简体中文</span>
              </DropdownItem>
              <DropdownItem>English</DropdownItem>
            </DropdownMenu>
          </Dropdown>
      </div>
      </Col>
    </Row>
    <Modal
      v-model="showLogin"
      class-name="login-model"
      :closable="false"
      @on-cancel="handleCloseLoginModal">
      <crd potColor="#4399e9">
        <span slot="title">登录 Exchain</span>
        <div class="form-box">
          <Form ref="loginForm" :rules="rules" :model="loginModal" label-position="top">
            <FormItem label="邮箱" prop="email">
              <Input v-model="loginModal.email"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
              <Input type="password" v-model="loginModal.password"></Input>
            </FormItem>
          </Form>
        </div>
      </crd>
      <div slot="footer">
        <div class="login-model-footer clearfix">
          <span class="model-btn model-btn-active fl" @click="handleLogin"><Spin v-if="loginLoading" size="small"></Spin>登录</span>
          <span class="model-btn fr" @click="handleCloseLoginModal">取消</span>
        </div>
      </div>
    </Modal>
  </block>

</template>

<script>
import block from './block'
import crd from "../components/crd.vue"
import ax from 'axios'
import config from '../../config/config.js'
import cookie from 'js-cookie'
import md5 from 'md5'
export default {
  name: 'headr',
  components: { block,crd },
  computed: {
    isLogin() {
      return cookie.get('pn')
    },
    email() {
      var info = sessionStorage.getItem('email')
      return info ? (info.length > 5 ? info.slice(0, 5) + '...' : info) : ''
    }
  },
  data () {
    return {
      showLogin: false,
      loginLoading: false,
      loginModal: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login () {
      this.showLogin = true
    },
    handleCloseLoginModal () {
      console.log(this.$refs['loginForm'])
      this.$refs['loginForm'].resetFields()
      this.showLogin = false
    },
    handleLogin () {
      var vu = this
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          ax
            .post(
              config.url.user + '/api/user/login',
              {
                email: vu.loginModal.email,
                password: md5(vu.loginModal.password)
              },
              {
                withcredentials: true
              }
            )
            .then(function(res) {
              console.log(1)
              console.log(res.data)
              if (res.status == '200' && res.data.errorCode == 0) {
                vu.$refs['loginForm'].resetFields()
                vu.showLogin = false
                sessionStorage.setItem('uid', res.data.result.id)
                sessionStorage.setItem('email', res.data.result.email)
                sessionStorage.setItem('pn', res.data.result.pn)
                cookie.set('pn', res.data.result.pn)
                vu.$router.push('/userCenter')
              } else {
                vu.$Message.error({ content: '登录失败:' + res.data.errorMsg })
              }
            })
            .catch(function(error) {
              console.log(error)
              vu.$Message.error({ content: '登录失败:' + error })
            })
        } else {
          this.$Message.error('验证失败!')
        }
      })
    },
    logout() {
      sessionStorage.clear()
      cookie.remove('pn')
      this.$router.push({ path: '/login' })
    }
  },
  destroyed () {
    console.log('header destroyed!')
  }
}
</script>

<style lang="less">
@import url(../style/config.less);
.headr {
  background-color: @header-bg-color;
  border-bottom: @header-bottom;
  font-size: @header-font-menu;
  height: 80px;
  display: flex;
  align-items: center;
  .logo {
    float: left;
    margin-right: 30px;
    a {
      display: block;
      img {
        height: 35px;
        vertical-align: middle;
      }
    }
  }
  .ivu-btn {
    font-size: @header-font-menu;
    color: @header-font-color;
  }
  .lan {
    margin-left: 15px;
  }
  .ivu-select-dropdown {
    border-radius: 0px;
  }
  .ivu-dropdown-item {
    font-size: 14px !important;
  }
  .tools {
    // .ivu-btn {
    //   margin-left: 10px;
    //   padding: 6px 30px;
    // }
    // #btnReg {
    //   color: #2d8cf0;
    // }
  }
}
</style>
