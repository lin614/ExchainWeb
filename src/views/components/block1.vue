<template>
    <div class="container " :class="{banbg1:banindex==1}">
        <div class="block1 " :class="{backimg:mode2}">
            <!-- <div class="block1 "> -->

            <Carousel @on-change='banner' v-model=" banindex" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
                <CarouselItem>
                    <div class="demo-carousel">
                        <Row>
                            <Col span="17">
                            <div class="info">
                                <h2>收入与合作伙伴共享，收益与交易伙伴共享</h2>
                                <hr/>
                                <p>Exchain是全球首家共享型交易平台，不仅将合作交易费的20%支付给合作伙伴，<br/>50%支付给超级合伙伙伴，还将交易平台100%的收入每日分配给Exchain Token（ET）持有者，<br/>全免费交易计时开始。</p>
                            </div>
                            </Col>
                            <Col span="7">
                            <div class="notice" v-show="!mode2">
                                <Card icon="compose" :bordered="false">
                                    <p slot="title">

                                        公告</p>
                                    <ul>
                                        <li>

                                            <a target="_blank" href="https://support.exchain.com/hc/zh-cn/articles/360006935231-Exchain%E8%B6%85%E7%BA%A7%E5%90%88%E4%BD%9C%E4%BC%99%E4%BC%B4%E8%AE%A1%E5%88%92%E5%BC%80%E5%90%AF">
                                                Exchain超级合作伙伴计划开启
                                                <Icon type="chevron-right"></Icon>
                                            </a>
                                        </li>

                                    </ul>
                                </Card>
                            </div>
                            </Col>
                        </Row>
                    </div>

                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <router-link to="/partner">
                            <Row>
                                <Col span="17">
                                <div class="info">
                                    <h2>Excahin内测即将开启，强拳重推合作伙伴计划</h2>
                                    <hr/>

                                    <p>Exchain全球首家共享型交易平台Exchain全新上线，并即将开启内测。<br/>先启动“合作伙伴计划”招募<br/>成为合作伙伴，享受交易费20%-50%回报+平台币(ET)奖励<br/>交易即挖矿，ET升值+平台收入奖励，收益+++<br/>限时全免，等你来！</p>
                                </div>
                                </Col>
                                <Col span="7">

                                </Col>
                            </Row>
                        </router-link>
                    </div>
                </CarouselItem>
            </Carousel>
        </div>
    </div>
</template>

<script>
export default {
  name: 'block1',
  props: {
    mode2: {
      default: false
    }
  },
  data() {
    return {
      banindex: 0,
      //  ban-index: 0,
      banbg: 'banbg0',
      setting: {
        autoplay: true,
        autoplaySpeed: 10000,
        dots: 'outside',
        radiusDot: false,
        trigger: 'hover',
        arrow: 'never'
      }
    }
  },
  methods: {
    banner(ov, v) {
      //   console.log(ov, v)
      this.banbg = 'banbg' + v
      console.log(this.banbg)
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
@color: #e9eaec; //aliceblue
@fontsize: 1em;
@padding-space: 40px; //空白的空间削减的高度
.container {
  width: 100%;
  background-color: #0e0f12; // #111216;
}
.block1 {
  width: 1200px;
  margin: 0 auto;
  height: 450px-@padding-space*2;
  text-align: left;
  font-size: @fontsize;
}
.backimg {
  background: url(../../static/imgs/bbg.jpg);
  background-repeat: no-repeat;
  background-position: bottom right;
}
.banbg0 {
}
.banbg1 {
  background-color: #3c3eb0;
  background: url(../../static/imgs/ban-bg.png);
  background-repeat: no-repeat;
  background-position: center center;
}
.info h2 {
  padding-top: 76px;
  font-size: @fontsize+1em;
  color: @color;
  line-height: @fontsize+1em;
  font-weight: normal;
}
.info hr {
  border: none;
  height: 2px;
  color: @color;
  background-color: @color;
  width: 80px;
  margin-top: 10px;
}
.info p {
  margin-top: 26px;
  line-height: @fontsize+1em;
  color: @color;
}
.notice {
  margin-top: 50px;
  height: 260px;
  width: 320px;
  //   height: 450px-@padding-space*2;
}
.notice ul {
  height: 300px-@padding-space*2;
  //   list-style: none;
}
.notice li {
  font-size: @fontsize;
  color: #4aa2e6;
  line-height: @fontsize*2;
  cursor: pointer;
}
.notice i {
  float: right;
  line-height: @fontsize*2;
}
</style>


