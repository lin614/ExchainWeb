<template>
  <div class="block2">
    <div class="cards">
      <Row type="flex" justify="space-between" :gutter="16">
        <Col span="8">
        <Card :padding="0" :bordered="false">
          <div class="linecard1"></div>
          <div class="cardshow1">
            <p>当日总成交额</p>
            <p>
              <Icon type="social-bitcoin"></Icon>&nbsp {{valume}}</p>

          </div>
        </Card>
        </Col>

        <Col span="8">
        <Card :padding="0" :bordered="false">
          <div class="linecard3"></div>
          <div class="cardshow3">
            <p>ET总市值</p>
            <p>
              <Icon type="social-bitcoin"></Icon>&nbsp {{etvalue}}</p>
            <p>ET总流通量
              <span>
                {{etnum}}
              </span>
            </p>
          </div>
        </Card>
        </Col>
        <Col span="8">
        <Card :padding="0" :bordered="false">
          <div class="linecard2"></div>
          <div class="cardshow2">
            <p>限时免费期</p>
            <p>
              180天</p>

          </div>
        </Card>
        </Col>
      </Row>

    </div>

  </div>
</template>

<script>
import ax from 'axios'
import config from '../../config/config.js'
export default {
  name: 'block2',
  data() {
    return {
      // m1: '0', //今日待分配收入
      // p1: '0', //今日合伙人模式待分配收入
      // m2: '0', //昨日待分配收入
      // p2: '0', //昨日合伙人模式待分配收入
      // et: '0' //ET总流通量
      valume: '0', // 当日总成交额
      etvalue: '0', //ET总市值
      etnum: '0' //ET总流通量
    }
  },
  created() {
    // ax.get(config.url.fee + '/api/exet/stats/feeReturn').then(res => {
    //   if (res.status == 200 && res.data.meta.code == '0') {
    //     // console.log(res)
    //     this.m1 = res.data.data.StandardTotal
    //     this.p1 = res.data.data.inviteesBonusTotal
    //     this.m2 = res.data.data.yesStandardTotal
    //     this.p2 = res.data.data.yesInviteesBonusTotal
    //   }
    // })
    //当日交易额
    ax.get(config.url.fee + '/api/exet/stats/dengesAmount').then(res => {
      if (res.status == 200 && res.data.meta.code == '0') {
        // console.log(res)
        this.valume = res.data.data.dengesAmount
      }
    })
    //ET总市值
    ax.get(config.url.fee + '/api/exet/stats/etStandardCirculate').then(res => {
      if (res.status == 200 && res.data.meta.code == '0') {
        // console.log(res)
        this.etvalue = res.data.data.etCirculate
      }
    })
    //et总流通量
    ax.get(config.url.fee + '/api/exet/stats/etCirculate').then(res => {
      if (res.status == 200 && res.data.meta.code == '0') {
        // console.log(res)
        this.etnum = res.data.data.etCirculate
      }
    })
  }
}
</script>
<style lang="less" scoped>
@fontsize: 1em;
@cardpad: 16px;
@color1: #439aea;
@color2: #13b385;
@color3: #f5162b;
.block2 {
  background: transparent;
  width: 1200px;
  margin: 0 auto;
  // height: 200px;
  text-align: left;
  margin-top: @fontsize;
  font-size: @fontsize;
}

.block2 .tbs_head {
  display: flex;
  height: 60px;
  text-align: left;
  align-items: center;
  justify-content: flex-start;
}
.linecard(@color) {
  background-color: @color;
  height: 5px;
  width: 100%;
  .ivu-card-body {
    padding: 0px;
  }
}
.block2 .linecard1 {
  .linecard(@color1);
  .ivu-card-body {
    padding: 0px;
  }
}
.linecard2 {
  .linecard(@color2);
}
.ivu-card-body {
  padding: 0px;
}
.linecard3 {
  .linecard(@color3);
}
.cardshow(@color) {
  padding: @cardpad;
  p:nth-child(1) {
    font-size: @fontsize*1.2;
    color: @color;
  }
  p:nth-child(2) {
    font-size: @fontsize*2.5;
    line-height: @fontsize*2;
  }
}
.cardshow1 {
  .cardshow(@color1);
}
.cardshow2 {
  .cardshow(@color2);
}
.cardshow3 {
  .cardshow(@color3);
}

.fee_info {
  color: darkgrey;
  font-size: @fontsize;
  line-height: @fontsize*2;
  padding: @cardpad;
}
.fee_num {
  color: rgb(155, 155, 243);
  font-size: @fontsize;
  padding: @cardpad;
}
fee_num2 {
  color: rgb(155, 155, 243);
  font-size: @fontsize*2;
  padding: @cardpad;
}
</style>


