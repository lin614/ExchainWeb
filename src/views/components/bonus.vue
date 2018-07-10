<template>
  <div class="bonus">
    <div class="tbs">
      <Card :padding="0" :bordered="false">
        <div slot="title" class="tbs_head">
          <div class="linepot1" />
          <span class="title">
            {{level}} <img src="../../static/imgs/level.png" :class="{}" />
          </span>
        </div>
        <div class=" content">
          <Row type="flex" :gutter="16">
            <Col span="8">
            <p class="earn">昨日被邀请人手续费返还：
              <Icon type="social-bitcoin"></Icon> {{fee1}}</p>
            <p class="earn">昨日获得ET返还量：
              <Icon type="social-bitcoin"></Icon> {{et1}}</p>
            </Col>
            <Col span="16">
            <p class="earn"> 被邀请人手续费累积返还
              <Icon type="social-bitcoin"></Icon> {{fee2}}</p>
            <p class="earn">累积ET返还量：
              <Icon type="social-bitcoin"></Icon> {{et2}}</p>
            </Col>
          </Row>
          <Row type="flex" :gutter="16" :style="{marginTop:'30px'}">
            <Col>
            <p class="earn">超级合作伙伴：
            </p>
            <p class="earn">邀请
              <span class="mark">50人以上（含50人）</span> 注册切所有被邀请人均产生1笔交易（金额不限）即可成为
              <span class="mark">超级合作伙伴</span>
            </p>
            </Col>

          </Row>
          <Row type="flex" :gutter="16" :style="{marginTop:'20px'}">
            <Col>
            <p class="earn">普通合作伙伴：
            </p>
            <p class="earn">邀请
              <span class="mark2">1人注册并产生1笔交易</span> （金额不限）
              <span class="mark2">普通合作伙伴</span>
            </p>
            </Col>

          </Row>
        </div>
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
                <span>{{code}}</span>
                <a href="#">复制邀请码</a>

              </div>
            </div>
            </Col>
            <Col span="16">
            <div class="invite">
              <p>邀请链接：</p>
              <div>
                <span> {{link}} </span>
                <a href="#">复制邀请码</a>

              </div>
            </div>
            </Col>
          </Row>
        </div>
      </Card>
      <!-- <Card :padding="0" class="region" :bordered="false">
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
              <Icon type="social-bitcoin"></Icon> {{et1}}</p>
            </Col>
            <Col span="16">
            <p class="earn"> 被邀请人手续费累积返还
              <Icon type="social-bitcoin"></Icon> {{fee2}}</p>
            <p class="earn">累积ET返还量：
              <Icon type="social-bitcoin"></Icon> {{et2}}</p>
            </Col>
          </Row>

        </div>
      </Card> -->
      <Card :padding="0" class="region" :bordered="false">
        <div slot="title" class="tbs_head">
          <div class="linepot4" />
          <span class="title">
            邀请记录

          </span>

        </div>
        <router-link to="/invite" slot="extra">

          更多>>
        </router-link>
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
          <Row type="flex" :gutter="16" v-for="p in list" :key="p.user">
            <Col span="8">
            <p class="earn">{{p.userId}}
            </p>
            </Col>
            <Col span="16">
            <p class="earn"> {{p.createTime}}</p>

            </Col>
          </Row>

        </div>
      </Card>

    </div>
  </div>
</template>

<script>
import ax from 'axios'
import config from '../../config/config.js'
export default {
  name: 'bonus',
  data() {
    return {
      level: '',
      code: '', //邀请码
      link: '', //邀请链接
      fee1: '0', //昨日手续费
      et1: '0', //昨日获得ET返还量
      fee2: '0', //被邀请人手续费累积返还
      et2: '0', //累积ET返还量,
      list: [] //邀请记录
    }
  },
  created() {
    // ;[].slice(0, 10)
    ax
      .post(config.url.invite + '/api/invite/getInvitedCode', {
        userId: config.userid
      })
      .then(res => {
        // console.log(res)
        if (res.status == '200' && res.data.meta.code == '0') {
          this.code = res.data.data.code
          this.link =
            'http://www.exchain.com/invite?userid=' +
            config.userid +
            '&code=' +
            this.code
        }
      })
    ax
      .post(config.url.invite + '/api/invite/invitedList', {
        userId: config.userid
      })
      .then(res => {
        // console.log(res)
        if (res.status == '200' && res.data.meta.code == '0') {
          this.list = res.data.data.inviteList.slice(0, 10)

          this.level =
            res.data.data.activeCount >= 50 ? '超级合伙人' : '普通合伙人'
        }
      })
    ax
      .get(config.url.fee + '/api/exet/stats/userBouns?userId=' + config.userid)
      .then(res => {
        console.log(res)
        if (res.status == '200' && res.data.meta.code == '0') {
          this.fee1 = res.data.data.inviteesBonus
          this.fee2 = res.data.data.totalInviteesBonus
          this.et1 = res.data.data.holderBonus
          this.et2 = res.data.data.totalHolderBonus
        }
      })
  }
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
  height: 30px;
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
  font-size: @fontsize*1.5;
  //   font-weight: bold;
  margin-left: @fontsize;
  // .more {
  //   float: right;
  // }
}
.linepot(@color) {
  width: 5px;
  height: @fontsize*1.5;
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
  .mark {
    color: #ffcf82;
  }
  .mark2 {
    color: #b4b4b4;
  }
}
</style>


