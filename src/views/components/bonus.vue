<template>
  <div class="bonus">
    <div class="tbs">
      <Card :padding="0" :bordered="false">
        <div slot="title" class="tbs_head">
          <div class="linepot1" />
          <span class="title">
            合伙人级别
          </span>
        </div>
        <div class="plevel content">普通合作伙伴</div>
      </Card>
      <Card :padding="0" class="region" :bordered="false">
        <div slot="title" class="tbs_head">
          <div class="linepot2" />
          <span class="title">
            邀请方式
          </span>
        </div>
        <div class="content">
          <Row type="flex" :gutter="16">
            <Col span="8">
            <div class="invite">
              <p>邀请码：</p>
              <div>
                <span>s5gk3658</span>
                <a href="#">复制邀请码</a>

              </div>
            </div>
            </Col>
            <Col span="16">
            <div class="invite">
              <p>邀请码：</p>
              <div>
                <span> http://www.baidu.com/s?cid=qaaaaa&utf-9&&www=%ksdfljdd </span>
                <a href="#">复制邀请码</a>

              </div>
            </div>
            </Col>
          </Row>
        </div>
      </Card>
      <Card :padding="0" class="region" :bordered="false">
        <div slot="title" class="tbs_head">
          <div class="linepot3" />
          <span class="title">
            合伙人收益
          </span>
        </div>
        <div class="content ">
          <Row type="flex" :gutter="16">
            <Col span="8">
            <p class="earn">昨日被邀请人手续费返还：
              <Icon type="social-bitcoin"></Icon> {{fee1}}</p>
            <p class="earn">昨日获得ET返还量：
              <Icon type="social-bitcoin"></Icon> {{fee1}}</p>
            </Col>
            <Col span="16">
            <p class="earn"> 被邀请人手续费累积返还
              <Icon type="social-bitcoin"></Icon> {{fee1}}</p>
            <p class="earn">累积ET返还量：
              <Icon type="social-bitcoin"></Icon> {{fee1}}</p>
            </Col>
          </Row>

        </div>
      </Card>
      <Card :padding="0" class="region" :bordered="false">
        <div slot="title" class="tbs_head">
          <div class="linepot4" />
          <span class="title">
            邀请记录

          </span>
        </div>
        <div class="content ">
          <Row type="flex" :gutter="16">
            <Col span="8">
            <p class="earn">
              <b>被邀请人账号</b>
            </p>
            </Col>
            <Col span="16">
            <p class="earn">
              <b>时间</b>
            </p>

            </Col>
          </Row>
          <Row type="flex" :gutter="16">
            <Col span="8">
            <p class="earn">张三
            </p>
            </Col>
            <Col span="16">
            <p class="earn"> 20180610 1:2:11</p>

            </Col>
          </Row>

        </div>
      </Card>

    </div>
  </div>
</template>

<script>
export default {
  name: 'bonus',
  data() {
    return {
      fee1: '0', //昨日手续费
      et1: '0', //昨日获得ET返还量
      fee2: '0', //被邀请人手续费累积返还
      et2: '0' //累积ET返还量
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
@fontsize: 1em;
.bonus {
  background: transparent;
  min-height: 600px;
  width: 1200px;
  margin: 0 auto;
  // height: 700px;
  text-align: left;
  font-size: @fontsize;
}

.bonus .tbs_head {
  display: flex;
  height: 60px;
  text-align: left;
  align-items: center;
  justify-content: flex-start;
}
// .ivu-card-body {
//   padding: 0;
// }
.tbs {
  margin-top: @fontsize;
}
.tbs .region {
  margin-top: @fontsize;
}
.region:last-of-type {
  margin-bottom: @fontsize*2;
}
.tbs .title {
  font-size: @fontsize*2;
  //   font-weight: bold;
  margin-left: @fontsize;
}
.linepot(@color) {
  width: 5px;
  height: @fontsize*2;
  margin-left: -16px;
  //   display: inline-block;
  background-color: @color;
}
.linepot1 {
  .linepot(#11b489);
}
.linepot2 {
  .linepot(#4399ee);
}
.linepot3 {
  .linepot(#fbc13c);
}
.linepot4 {
  .linepot(#e74747);
}

.ivu-table-wrapper {
  border: none;
}
.content {
  padding: 32px;
}
.plevel {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: @fontsize*1.2;
  padding: 2em;
}
.invite p {
  font-size: @fontsize*1.1;
}
.invite div {
  margin: 1em 0;
  background: #f2f3f7;
  width: 90%;
  height: 50px;
}
.invite div span {
  line-height: 50px;
  padding-left: 20px;
}
.invite div a {
  line-height: 50px;
  margin-right: 20px;
  float: right;
}
.earn {
  line-height: 40px;
  font-size: @fontsize*1.1;
}
</style>


