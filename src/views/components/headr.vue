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

        <router-link to="/login" v-if="!isLogin">
          <Button type="text" id="btnLogin">登录</Button>
        </router-link>
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
  </block>

</template>

<script>
import block from './block'
import cookie from 'js-cookie'
import ax from 'axios'
import config from '../../config/config.js'

export default {
  name: 'headr',
  components: { block },
  computed: {
    isLogin() {
      return cookie.get('pn')
    },
    email() {
      var info = sessionStorage.getItem('email')
      return info ? (info.length > 5 ? info.slice(0, 5) + '...' : info) : ''
    }
  },
  methods: {
    logout() {
      sessionStorage.clear()
      cookie.remove('pn')
      this.$router.push({ path: '/login' })
      // ax.get(config.url.user + 'api/user/logout').then(function(res) {
      //   console.log(res.data)
      //   if (res.status == '200' && res.data.errorCode == 0) {

      //   }
      // })
    }
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
