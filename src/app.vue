<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>
<style lang="less">
@import url(./views/style/config.less);
body {
  background-color: @bg-color;
}
.clearfix::after {
  content: '';
  display: block;
  height: 0;
  clear: both;
}

.clearfix {
  *zoom: 1;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
* {
  margin: 0;
  padding: 0;
}
.ivu-input {
  border-radius: 0;
}
/**/
html,
body,
ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img {
  margin: 0;
  padding: 0;
}
/*main-cont*/
.content {
  width: 1180px;
  margin: 0 auto;
}
img,
input,
textarea {
  border: none;
  padding: 0;
  margin: 0;
  outline-style: none;
}

ul,
ol {
  list-style: none;
}

img {
  border: 0;
  display: block; /**/
}

i {
  font-style: normal;
}
.ivu-card {
  border-radius: 0px !important;
}
</style>
