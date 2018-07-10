
<template>
  <index>
    <div class="paper">
      <div class="container">
        <div class="panel">
          <div class="title">
            <img src="../static/imgs/et-t.png" />
          </div>
          <div class="info">
            <div class="menu">
              <Row type="flex" justify="space-between">
                <Col span="8">
                <p :class="{active:index==0}" @mouseover="index=0">什么是ET？</p>
                </Col>
                <Col span="8">
                <p :class="{active:index==1}" @mouseover="index=1">ET持有者权利</p>
                </Col>
                <Col span="8">
                <p :class="{active:index==2}" @mouseover="index=2">获取ET的方法</p>
                </Col>
              </Row>
            </div>

          </div>
          <div class="content">
            <div class="sec" v-show="index==0">
              <h3>什么是ET？</h3>
              <p>ET是Exchain交易平台本身的权益证明，发行总量恒定100亿，将平均分10年全部发给交易用户和伙伴以及投资者，技术团队，并且永不增发，<br/>Exchain将全部收入分配给ET持有者</p>
              <img src="../static/imgs/et-t-1.png" id='et' />
            </div>
            <div class="sec" v-show="index==1">
              <h3>收益分配</h3>
              <p>Exchain会将全部100%的交易收入分配给ET的持有者。详情请见白皮书。</p>
              <h3>参与决策</h3>
              <p>Exchain致力于打造一个共享，自治，全面透明的社区，所有ET持有者可通过民主投票的形式<br/>参与Exchain社区各类决策</p>

            </div>
            <div class="sec" v-show="index==2">
              <h3>通过“交易即挖矿”获得ET</h3>
              <p>1, 只要产生交易，即可按交易量占比100%返还ET的方式获取。<br/>2，通过“合作伙伴”模式，通过邀请好友注册并交易的方式获取。</p>
              <h3>交易购买ET</h3>
              <p>用户可以通过币币交易的形式，购买并持有ET。</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  </index>
</template>
<script>
import index from './index'
export default {
  name: 'paper',
  data() {
    return {
      index: 0
    }
  },
  components: {
    index
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.paper {
  width: 100%;
  background: #6600cc;
}
.paper .container {
  width: 100%;
  min-width: 1200px;
  min-height: 100vw * (882/1200);
  margin: 0 auto;
  background: url(../static/imgs/et-bg.png);
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 1100px;
}
.container .panel {
  .title {
    img {
      margin: 5vh;
      width: 20%;
    }
  }
}
.panel .info {
  width: 100%;
  color: aliceblue;
  background-color: rgba(98, 96, 107, 0.1);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.8);
  margin-top: 2em;
}
.panel .info .menu {
  width: 1200px;
  font-size: 1.5em;
  // padding: 2em 0;
  margin: 0 auto;
}
.active {
  // border: 1px solid blue;
  background-color: rgba(114, 114, 247, 0.3);
}
.panel .info .menu p {
  height: 100%;
  padding: 1.5em 0;
  cursor: pointer;
}
.panel .info .menu p:hover {
  .active;
}
.panel .content {
  display: flex;
  align-items: top;
  justify-content: center;
  flex-direction: column;
  padding: 50px;
  // min-height: 400px;
  .sec {
    color: aliceblue;
    h3 {
      font-size: 24px;
      margin-bottom: 35px;
    }
    p {
      line-height: 30px;
      margin-bottom: 100px;
    }
  }
  #et {
    width: 500px;
  }
}
</style>


