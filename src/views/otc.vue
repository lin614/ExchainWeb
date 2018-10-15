<template>
    <page class="page_content-padding">
        <div class="otc">
            <block>
                <crd slot="inner">
                    <span slot="title">USDT法币充值</span>
                    <div class=" content">

                        <div class=" progress">
                            <h3></h3>
                            <div class="team" style="display:flex;">
                                <div class="block">
                                    <div class="flag">
                                        <h3>加商家</h3>
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="flag">
                                        <h3> 查价格</h3>
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="flag">
                                        <h3>付款</h3>
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="flag">
                                        <h3>发账号</h3>
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="flag">
                                        <h3> 查到账</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="team" style="display:flex;">
                                <div class="block">
                                    <div class="circ ">
                                        <div class="item ">扫描二维码<br />添加商家微信</div>
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="circ">
                                        <div class="item ">发送"USDT"<br />获取当前价格</div>
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="circ">
                                        <div class="item ">转账欲购买金额<br />(如:1000CNY)</div>
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="circ">
                                        <div class="item ">发送交易所账号<br />(如:***@qq.com)</div>
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="item ">商家放币后<br />确认账户到账</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </crd>
            </block>
            <block>
                <crd slot="inner">
                    <span slot="title">认证商家 (10:00 —— 17:00)</span>
                    <div class=" content">
                        <div class="lv-text">
                            <Row>
                                <Col span="8">
                                <div class="wxB">
                                    <img class="wx1" src="../static/imgs/wx1.png" />
                                </div>
                                </Col>
                                <Col span="16">
                                <div class="info">
                                    <h3>说明: </h3>
                                    <p>1、当前平台仅支持法币购买USDT，<br />
                                        2、如果遇到充值不到账的情况，请联系客服，客服微信: Exchain5<br />
                                        3、请勿在非交易时间内付款，否则无法充值到账<br />
                                        4、单笔交易限额不得小于100CNY，否则无法充值到账<br />
                                        5、请勿在转账时添加任何备注
                                    </p>
                                </div>
                                </Col>

                            </Row>

                        </div>
                        <!-- <Row>
                            <Col span="8">
                            <div class="lv-text">
                                <div class="wxB">
                                    <img class="wx1" src="../static/imgs/wx1.png" />
                                </div>
                            </div>
                            </Col>
                            <Col span="16">
                            <div class="lv-text">
                                <h3>说明: </h3>
                                <p>1、当前平台仅支持法币购买USDT，<br />
                                    2、如果遇到充值不到账的情况，请联系客服，客服微信: Exchain5<br />
                                    3、请勿在非交易时间内付款，否则无法充值到账<br />
                                    4、单笔交易限额不得小于100CNY，否则无法充值到账<br />
                                    5、请勿在转账时添加任何备注
                                </p>
                            </div>
                            </Col>
                        </Row> -->

                    </div>
                </crd>
            </block>
            <!-- <block>
                <crd slot="inner">
                    <span slot="title">说明</span>
                    <div class=" content">

                        <div class="lv-text">
                            <p>1、当前平台仅支持法币购买USDT，<br />
                                2、如果遇到充值不到账的情况，请联系客服，客服微信: Exchain5<br />
                                3、请勿在非交易时间内付款，否则无法充值到账<br />
                                4、单笔交易限额不得小于100CNY，否则无法充值到账<br />
                                5、请勿在转账时添加任何备注</p>

                        </div>
                    </div>
                </crd>
            </block> -->
        </div>
    </page>
</template>

<script>
import page from './components/page'
import block from './components/block'
import crd from './components/crd'
export default {
  name: 'otc',
  components: { page, block, crd },
  mounted() {}
}
</script>

<style lang="less">
@import url(./style/config.less);
.otc {
  .content {
    // min-height: 600px;
    padding: 32px 0;
  }
  .lv-text {
    margin: 0 32px;
    line-height: 40px;
    margin-bottom: 10px;
    padding: 8px 16px;
    border-radius: 0px;
    .info {
      padding: 16px;
      //   width: 800px;
      //   background: @text-bg-color;
    }
    h3 {
      font-size: 14px;
      //   font-weight: normal;
    }
    p {
      font-size: 12px;
    }
  }
  .progress {
    // padding: 20px 0;
    .team {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .block {
      min-width: 220px;
      max-width: 220px;
      margin-bottom: 32px;
    }

    .flag {
      width: 100px;
      height: 50px;
      background-image: url(../static/imgs/flag.png);
      background-position: left;
      background-size: 100%;
      background-repeat: no-repeat;
      text-align: center;
      padding-top: 10px;
      margin-bottom: -16px;
      margin-left: 15px;
      color: #fff;
    }

    .circ {
      width: 100%;
      background-image: url(../static/imgs/line2.png);
      background-position: 100px;
      background-size: 100px;
      background-repeat: no-repeat;
    }

    .item {
      width: 130px;
      height: 130px;
      padding: 10px;
      //   background-color: #2fa7fe;
      background-color: #2fa7fe;
      border-radius: 50%;
      color: white;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .current {
      background-color: #2fa7fe;
      box-shadow: 0px 0px 30px black;
    }

    .future {
      background-color: #75787a;
    }
  }
  .wxB {
    margin: 0 32px;
    width: 200px;
    height: 250px;
    img {
      width: 190px;
      height: 250px;
    }
  }
}
</style>
