<template>
  <index>
    <div class="bonus">
      <div class="tbs">
        <Card :padding="0" :bordered="false">
          <div slot="title" class="tbs_head">
            <div class="linepot1" />
            <span class="title">
              邀请记录
            </span>
          </div>
          <router-link to="/bonus" slot="extra">

            <<返回 </router-link>
              <div class=" content">
                <Row type="flex" :gutter="16">
                  <Col span="8">
                  <p class="earn">
                    <b>被邀请人账号</b>
                  </p>
                  </Col>
                  <Col span="8">
                  <p class="earn">
                    <b>时间</b>
                  </p>

                  </Col>
                  <Col span="8">
                  <p class="earn">
                    <b>状态</b>
                  </p>

                  </Col>
                </Row>
                <Row type="flex" :gutter="16" v-for="p in list" :key="p.user">
                  <Col span="8">
                  <p class="earn">{{p.userId}}
                  </p>
                  </Col>
                  <Col span="8">
                  <p class="earn"> {{p.createTime}}</p>

                  </Col>
                  <Col span="8">
                  <p class="earn"> {{p.isActive?'已交易':'未交易'}}</p>

                  </Col>
                </Row>
              </div>
        </Card>
      </div>
    </div>
  </index>

</template>

<script>
import ax from 'axios'
import config from '../../config/config.js'
import index from '../index'
export default {
  name: 'cont',
  components: {
    index
    // card2
  },
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
          this.list = res.data.data.inviteList
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
}
.content {
  padding: 1em 3em;
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


