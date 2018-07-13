
<template>
  <div class="index">
    <header2></header2>
    <div class="content2">
      <slot>
        <block1></block1>
        <block2></block2>
        <block3></block3>
      </slot>
    </div>
    <footer2></footer2>

  </div>
</template>
<script>
import header2 from './components/header2'
// import content2 from './components/content2'
import block1 from './components/block1'
import block2 from './components/block2'
import block3 from './components/block3'
import footer2 from './components/footer2'
export default {
  components: {
    header2,
    block1,
    block2,
    block3,
    footer2
  },
  methods: {}
}
</script>
<style lang="less">
@padding-space: 40px; //空白的空间削减的高度
.index {
  width: 100%;
  min-width: 1200px;
  // position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: rgb(231, 240, 240);
  // font-family: HelveticaNeue, Helvetica, Arial, 'Microsoft YaHei', sans-serif;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-size: 1.3em;
  // height: 750px-@padding-space*2;
}
.index .ivu-card {
  border-radius: 0px;
  min-height: 150px;
  //   background:
}
ul {
  list-style: none;
}
.content2 {
  min-height: 800px;
}
</style>
