<template>
  <block class="headr">
    <Row type="flex" justify="space-between" slot="inner">
      <Col>
      <div class="logo">
        <router-link to="/"><img src="../../static/imgs/logo.png"></router-link>
      </div>
      <Button class="menu" type="text" @click="toTrade()">{{ $t("header.exchange") }}</Button>
      <router-link to="/et">
        <Button class="menu" type="text">{{ $t("header.et") }}</Button>
      </router-link>
      <router-link to="/paper">
        <Button class="menu" type="text">{{ $t("header.whitepaper") }}</Button>
      </router-link>

      <a target="_blank" href="https://support.exchain.com/hc/zh-cn">
        <Button class="menu" type="text">{{ $t("header.announcement") }}</Button>
      </a>

      <router-link to="/partner">
        <!-- <Tooltip :always="true" :transfer="true" placement="top-end" content="HOT!" :style="{ minWidth:0}"> -->
        <Button class="menu" type="text">{{ $t("header.partnerProject") }}</Button>
        <!-- <div slot="content">

              HOT!
            </div> -->
        <!-- </Tooltip> -->
      </router-link>

      </Col>
      <Col>
      <div class="tools">

        <!-- <a v-if="!isLogin">
          <Button type="text" id="btnLogin" @click="login()">登录</Button>
        </a> -->
        <router-link to="/login" v-if="!isLogin">
          <Button type="text" id="btnLogin">{{ $t("header.login") }}</Button>
        </router-link>
        <router-link to="/reg" v-if="!isLogin">
          <Button type="text" id="btnReg">{{ $t("header.register") }}</Button>
        </router-link>
        <router-link to="/usercenter/asset" v-if="isLogin">
          <Button type="text">{{ $t("header.myAsset") }}</Button>
        </router-link>
        <Dropdown class="lan" v-if="isLogin">
          <!-- <router-link to="/usercenter">
            <Button type="text">
              <Icon type="person"></Icon>
              {{email}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
          </router-link> -->
          <Button type="text">
            <Icon type="person"></Icon>
            {{email}}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <Dropdown class="lan" <DropdownMenu slot="list">
            <DropdownItem>
              <router-link to="/usercenter">
                <span class="lan-item">{{ $t("header.userCenter") }}</span>
              </router-link>
            </DropdownItem>
            <DropdownItem>
              <router-link to="/usercenter/entrust">
                <span class="lan-item">{{ $t("header.promiseManage") }}</span>
              </router-link>
            </DropdownItem>
            <DropdownItem>
              <router-link to="/bonus">
                <span class="lan-item">{{ $t("header.partner") }}</span>
              </router-link>
            </DropdownItem>
            <DropdownItem>
              <a @click="logout()">
                <span class="lan-item">{{ $t("header.logout") }}</span>
              </a>
            </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown class="lan" @on-click="handleLangChange">
            <a href="javascript:void(0)">
              <Icon type="earth"></Icon>
              <span>{{activeLang === 'cn' ? '简体中文' : 'English'}}</span>
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="zh">
                <span class="lan-item">简体中文</span>
              </DropdownItem>
              <DropdownItem name="en">English</DropdownItem>
            </DropdownMenu>
          </Dropdown>
      </div>
      </Col>
    </Row>
  </block>

</template>

<script>
import block from './block'
import crd from '../components/crd.vue'
import ax from 'axios'
import config from '../../config/config.js'
import cookie from 'js-cookie'
import md5 from 'crypto-md5'
// import bus from '../../bus.js'
export default {
  name: 'headr',
  components: { block, crd },
  computed: {
    isLogin() {
      return cookie.get('PN', config.url.domain)
    },
    email() {
      var info = sessionStorage.getItem('email')
      return info ? (info.length > 5 ? info.slice(0, 5) + '...' : info) : ''
    },
    activeLang: {
      get: function() {
        if (this.$store.state.activeLang !== '') {
          return this.$store.state.activeLang
        } else {
          return 'cn'
        }
      },
      set: function() {}
    }
  },
  data() {
    return {
      showLogin: false,
      loginLoading: false
    }
  },
  methods: {
    login() {
      this.showLogin = true
    },
    handleCloseLoginModal() {
      console.log(this.$refs['loginForm'])
      this.$refs['loginForm'].resetFields()
      this.showLogin = false
    },
    logout() {
      sessionStorage.clear()
      cookie.remove('PN')
      cookie.remove('PN', { domain: config.url.domain })
      
      ax.get('/api/user/logout').then(res => {
        console.log('登出')
      })
      console.log(this.$router)
      this.$router.go({
        path: '/',
        force: true
      })
    },
    handleLangChange(name) {
      this.activeLang = name
      this.$i18n.locale = name
      this.$store.commit('setActiveLang', name)
      // if (name === 'cn') {
      //   document.title = ''
      // } else if (name === 'en') {
      //   document.title = ''
      // }
    }
  },
  mounted() {
    // console.log(this.isLogin)
    // let vu = this
    // bus.$on('login', function() {
    //   console.log('login happen')
    //   vu.isLogin = true
    // })
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
