<template>
    <div class="container">
        <div class="block1" :class="{backimg:mode2}">

            <Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
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
                                        <!-- <li>

                                            <a href="#">
                                                [07-06] EXCHAIN 账户注册
                                                <Icon type="chevron-right"></Icon>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                [07-06] 提充币到账时间及限额
                                                <Icon type="chevron-right"></Icon>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                [07-06] DWS 临时停牌公告
                                                <Icon type="chevron-right"></Icon>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                [07-06] EXCHAIN 系统升级公告
                                                <Icon type="chevron-right"></Icon>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                [07-06]关于EXCHAIN 主板品牌升级
                                                <Icon type="chevron-right"></Icon>
                                            </a>
                                        </li> -->
                                    </ul>
                                </Card>
                            </div>
                            </Col>
                        </Row>
                    </div>

                </CarouselItem>
                <!-- <CarouselItem>
                </CarouselItem> -->
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
      value3: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: 'outside',
        radiusDot: false,
        trigger: 'hover',
        arrow: 'never'
      }
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


