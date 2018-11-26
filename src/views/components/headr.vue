<template>
  <block class="headr">
    <Row type="flex" justify="space-between" slot="inner">
      <Col>
      <div class="logo">
        <router-link to="/"><img src="https://d3bcj1iwrh8aaw.cloudfront.net/imgs/logo.png"></router-link>
      </div>
      <router-link to="/otc" v-if="activeLang=='cn'">
        <Button class="menu" type="text">法币</Button>
      </router-link>
      <Button class="menu" type="text" @click="toTrade()">{{ $t("header.exchange") }}</Button>
      <router-link to="/et">
        <Button class="menu" type="text">{{ $t("header.et") }}</Button>
      </router-link>
      <router-link to="/paper">
        <Button class="menu" type="text">{{ $t("header.whitepaper") }}</Button>
      </router-link>

      <!-- <a target="_blank" href="https://support.exchain.com/hc/zh-cn">
        <Button class="menu" type="text">{{ $t("header.announcement") }}</Button>
      </a> -->

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

        <Dropdown @on-visible-change="handleUserShowChange" class="lan" v-if="isLogin" @on-click="toLink">
          <Button type="text">
            <Icon type="person"></Icon>
            {{email}}
            <Icon v-show="!showUserCenter" type="arrow-down-b"></Icon>
            <Icon v-show="showUserCenter" type="arrow-up-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="/usercenter">
              <span class="lan-item">{{ $t("header.userCenter") }}</span>
            </DropdownItem>
            <DropdownItem name="/usercenter/entrust">
              <span class="lan-item">{{ $t("header.promiseManage") }}</span>
            </DropdownItem>
            <DropdownItem name="/bonus">
              <span class="lan-item">{{ $t("header.partner") }}</span>
            </DropdownItem>
            <DropdownItem name="/api">
              <span class="lan-item">{{ $t("header.api") }}</span>
            </DropdownItem>
            <DropdownItem>
              <span class="lan-item">{{ $t("header.logout") }}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown @on-visible-change="handleLangShowChange" class="lan" @on-click="handleLangChange">
          <a href="javascript:void(0)">
            <Icon type="earth"></Icon>
            <span>{{activeLang === 'cn' ? '简体中文' : 'English'}}</span>
            <Icon v-show="!showLanguage" type="arrow-down-b"></Icon>
            <Icon v-show="showLanguage" type="arrow-up-b"></Icon>
          </a>

          <DropdownMenu slot="list">
            <DropdownItem name="cn"><span class="lan-item">简体中文</span></DropdownItem>
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
export default {
  name: 'headr',
  components: { block, crd },
  computed: {
    isLogin() {
      return cookie.get('PN', config.url.domain)
    },
    email() {
      var info = cookie.get('email', config.url.domain)
      if (!info) {
        this.isLogin = false
        return ''
      }
      var emailArr = info.split('@')
      if (emailArr[0].length > 4) {
        emailArr[0] = emailArr[0].slice(0, 4) + '...'
      }
      return emailArr[0] + '@' + emailArr[1]
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
      loginLoading: false,
      showUserCenter: false,
      showLanguage: false
    }
  },
  methods: {
    toLink(rout) {
      if (rout) {
        this.$router.push(rout)
      } else {
        this.logout()
      }
    },
    login() {
      this.showLogin = true
    },
    handleCloseLoginModal() {
      this.$refs['loginForm'].resetFields()
      this.showLogin = false
    },
    logout() {
      ax.get(config.url.user + '/api/user/logout', getHeader).then(res => {
        if (res.status === 200 && res.data.meta.code === 0) {
        } else {
          apiError(this, res)
        }
      })
      sessionStorage.clear()
      cookie.remove('PN')
      cookie.remove('PN', { domain: config.url.domain })

      this.$router.go({
        path: '/',
        force: true
      })
    },
    handleLangChange(name) {
      this.activeLang = name
      this.$i18n.locale = name

      cookie.set('exchain_language', name, {
        domain: config.url.domain,
        expires: 0.08
      })

      this.$store.commit('setActiveLang', name)
      bus.$emit('langChange')
    },
    handleUserShowChange(visible) {
      this.showUserCenter = visible
    },
    handleLangShowChange(visible) {
      this.showLanguage = visible
    }
  },
  mounted() {}
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
        width: 156px;
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
