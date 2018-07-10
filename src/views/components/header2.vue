<template>
  <div class="header">
    <div class="container">
      <Row type="flex" justify="space-between" class="code-row-bg">
        <Col>
        <div class="logo">
          <a href="/"><img src="../../static/imgs/logo.png"></a>
        </div>
        <Button class="menu" type="text">交易</Button>
        <router-link to="/paper">
          <Button class="menu" type="text">ET</Button>
        </router-link>
        <Button class="menu" type="text">白皮书</Button>

        <Button class="menu" type="text">资产透明</Button>
        <a target="_blank" href="https://support.exchain.com/hc/zh-cn">
          <Button class="menu" type="text">公告</Button>
        </a>
        <router-link to="/partner">
          <Button class="menu" type="text">合伙人计划</Button>
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
          <Button type="primary" size="large" shape="circle" @click="login()">登陆</Button>
          <Button size="large" shape="circle">注册</Button>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header2',
  methods: {
    login() {
      // this.$router.push({ path: '/bonus' })
      this.$router.push('/bonus')
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
@fontsize: 1em;
@fontcolor: aliceblue;
@lineheight: 90px;

.header {
  height: @lineheight;
  border-bottom: 1px solid #000000;
  background-color: #131418;
  z-index: 99999;
}
.header .container {
  width: 1200px;
  margin: 0 auto;
}
.logo {
  float: left;
  // margin-left: 30px;
  margin-right: 3em;
}
.header .logo a {
  display: block;
  line-height: @lineheight;
}
.header .logo a img {
  height: 35px;
  vertical-align: middle;
}
.ivu-dropdown-item {
  font-size: @fontsize;
}
.lan-item {
  font-size: @fontsize;
}
/* .ivu-menu-light {
  background: transparent;
} */
.ivu-btn {
  font-size: @fontsize;
  border-radius: 0px;
  border: none;
  // line-height: @lineheight;
  // margin-top: 35px;
  padding: 0 1em;
}
.menu {
  margin-top: 35px;
}
.ivu-btn,
.ivu-btn:active,
.ivu-btn:focus {
  outline-style: none;
}
.ivu-btn-text {
  color: aliceblue;
}
.tools .ivu-dropdown {
  margin-right: 1em;
}
.tools .ivu-btn {
  //   display: inline-block;
  //   margin-bottom: 0;
  //   font-weight: 400;
  //   text-align: center;
  //   vertical-align: middle;
  //   border-radius: 32px;
  //   -ms-touch-action: manipulation;
  //   touch-action: manipulation;
  //   cursor: pointer;
  //   background-image: none;
  //   border: 1px solid transparent;
  //   white-space: nowrap;
  //   // line-height: 1.5;
  margin-left: 1em;
  height: 35px;
  width: 90px;
}
.tools {
  margin-right: 1em;
  font-size: @fontsize;
  // line-height: @lineheight;

  padding: 35px 1em;
}
.tools a {
  color: lightgrey;
}
.ivu-select-dropdown {
  border-radius: 0px !important;
}
/* .ivu-select-dropdown {
  width: inherit;
  max-height: 200px;
  overflow: auto;
  margin: 5px 0;
  padding: 5px 0;
  background-color: aliceblue;
  box-sizing: border-box;
  border-radius: 0px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 900;
} */
</style>


