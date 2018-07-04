<template>
    <div class="header">
        <div class="logo">
            <a href="/"><img src="../../static/imgs/logo.png"></a>
        </div>
        <div class="menu-box">
            <a href="#" class="">交易</a>
            <a href="#" class="">ET</a>
            <a href="#" class="" target="_blank">白皮书</a>
        </div>
        <div class="notice-box"></div>
        <div class="navbar-nav">
            <div class="lang-box">
                <div class="select-box">
                    <div class="select-curr">
                        <i class="icon icon-lang"></i>
                        <span>简体中文</span>
                        <i class="icon icon-down"></i>
                    </div>
                    <div class="select-options" id="lang">
                        <div class="option" data-value="zh-cn">简体中文</div>
                        <div class="option" data-value="en-us">English</div>
                    </div>
                </div>

            </div>
            <div class="user-box">
                <a href="https://exchange.fcoin.com/u/login" class="login">登录</a>
                <a href="https://exchange.fcoin.com/u/register" class="register">注册</a>
            </div>
        </div>
        <div class="h5-menu">
            <div class="username">
                <a href="https://exchange.fcoin.com/u/login">登录</a>/
                <a href="https://exchange.fcoin.com/u/register">注册</a>
            </div>
            <i class="icon icon-menu" id="h5_menu"></i>
        </div>
    </div>
</template>

<script>
export default {
  name: 'header2',
  mounted() {}
}
</script>
<style scoped>
.header {
  height: 70px;
  border-bottom: 1px solid #444444;
  background-color: #222222;
  z-index: 99999;
}
.logo {
  float: left;
  margin-left: 30px;
}
.header .logo a {
  display: block;
  line-height: 70px;
}
.header .logo a img {
  height: 35px;
  vertical-align: middle;
}

.header .menu-box {
  float: left;
  margin-left: 40px;
  height: 70px;
  line-height: 70px;
  /* font-size: 0; */
}
.header .menu-box a {
  font-size: 14px;
  margin-right: 40px;
}
a {
  color: #efefef;
  text-decoration: none;
}

.header .navbar-nav {
  line-height: 60px;
  float: right;
  margin-right: 30px;
}
</style>


