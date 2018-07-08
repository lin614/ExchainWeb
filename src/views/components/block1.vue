<template>
    <div class="container">
        <div class="block1" :class="{backimg:mode2}">

            <Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
                <CarouselItem>
                    <div class="demo-carousel">
                        <Row>
                            <Col span="17">
                            <div class="info">
                                <h2>收入与合作伙伴共享，收益与交易货币共享</h2>
                                <hr/>
                                <p>Exchain是全球首家共享型交易平台，不仅将合作交易费的50%支付给<br/>超级合伙伙伴，还将交易平台100%的收入每日分配给Exchain Token（ET）持有者，<br/>全免费交易计时开始。</p>
                            </div>
                            </Col>
                            <Col span="7">
                            <div class="notice" v-show="!mode2">
                                <Card icon="compose" :bordered="false">
                                    <p slot="title">

                                        公告</p>
                                    <ul>
                                        <li>

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
                                        </li>
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

            <!-- <div class="fee">
                <Row>
                    <Col span="8">
                    <div class="sec border-left">
                        <p>
                            <span class="fee_info">昨日待分配收入累积折合：</span>
                            <span class="fee_num">
                                <Icon type="social-bitcoin"></Icon>0</span>
                        </p>
                        <p>
                            <span class="fee_info">昨日合伙人待分配收入：</span>
                            <span class="fee_num">
                                [查看合伙人模式说明]</span>
                        </p>
                        <p>
                            <span class="fee_info">ET总流通量：</span>
                            <span class="fee_num">
                                [查看ET释放说明]</span>
                        </p>
                    </div>
                    </Col>
                    <Col span="8">
                    <div class="sec border-left border-right ">
                        <p>
                            <span class="fee_info">今日待分配收入累积折合：</span>

                        </p>
                        <p>
                            <span class="fee_num2">
                                <Icon type="social-bitcoin"></Icon>0</span>
                        </p>
                        <p>
                            <span class="fee_info">其中合伙人模式待分配收入：</span>
                            <span class="fee_num">
                                <Icon type="social-bitcoin"></Icon>0</span>
                        </p>
                    </div>
                    </Col>
                    <Col span="8">
                    <div class="sec border-right">
                        <p>
                            <span class="fee_info">新闻：</span>
                        </p>
                        <p>
                            <span class="fee_num">
                                张建在团队博客发文【引入“交易即挖矿”机制，创造一个符合中本聪初心的比特币】</span>
                        </p>

                    </div>
                    </Col>
                </Row>
            </div> -->
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
  background-color: #111216;
}
.block1 {
  width: 1200px;
  margin: 0 auto;
  height: 450px-@padding-space*2;
  text-align: left;
  font-size: @fontsize;
}
.backimg {
  background: url(../../static/imgs/bbg.png);
  background-repeat: no-repeat;
  background-position: top right;
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


