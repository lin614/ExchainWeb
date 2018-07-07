<template>
  <div class="block2">
    <div class="cards">
      <Row type="flex" justify="space-between" :gutter="16">
        <Col span="8">
        <Card :padding="0" :bordered="false">
          <div class="linecard1"></div>
          <div class="cardshow1">
            <p>今日待分配收入累积折合：</p>
            <p>
              <Icon type="social-bitcoin"></Icon>&nbsp 0</p>
            <p>其中合伙人模式待分配收入：
              <span>
                <Icon type="social-bitcoin"></Icon>&nbsp 0
              </span>
            </p>
          </div>
        </Card>
        </Col>

        <Col span="8">
        <Card :padding="0" :bordered="false">
          <div class="linecard3"></div>
          <div class="cardshow3">
            <p>昨日待分配收入累积折合：</p>
            <p>
              <Icon type="social-bitcoin"></Icon>&nbsp 0</p>
            <p>昨日待分配收入累积折合：
              <span>
                <Icon type="social-bitcoin"></Icon>&nbsp 0
              </span>
            </p>
          </div>
        </Card>
        </Col>
        <Col span="8">
        <Card :padding="0" :bordered="false">
          <div class="linecard2"></div>
          <div class="cardshow2">
            <p>ET总流通量</p>
            <p>
              0</p>

          </div>
        </Card>
        </Col>
      </Row>

    </div>

  </div>
</template>

<script>
export default {
  name: 'block2',
  data() {
    return {}
  },
  mounted() {}
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
    font-size: @fontsize*3;
    line-height: @fontsize*1.5;
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


