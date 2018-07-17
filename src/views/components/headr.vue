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

                <Dropdown>
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
                <Button id="btnLogin" type="primary" shape="circle" @click="login()">登录</Button>
                <Button id="btnReg" shape="circle">注册</Button>
            </div>
            </Col>
        </Row>
    </block>

</template>

<script>
import block from './block'
export default {
  name: 'headr',
  components: { block },
  methods: {
    login() {
      // this.$router.push({ path: '/bonus' })
      this.$router.push('/bonus')
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
  .ivu-select-dropdown {
    border-radius: 0px;
  }
  .ivu-dropdown-item {
    font-size: 14px !important;
  }
  .tools {
    .ivu-btn {
      margin-left: 20px;
      padding: 6px 30px;
    }
    #btnReg {
      color: #2d8cf0;
    }
  }
}
</style>
