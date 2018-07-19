
<template>
  <page>
    <div class="invite">
      <block>
        <crd slot="inner">
          <span slot="title">邀请记录</span>
          <!-- <router-link to="/bonus" slot="extra">
                        <<返回 </router-link> -->
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
        </crd>
      </block>
    </div>
  </page>

</template>

<script>
import page from './components/page'
import block from './components/block'
import crd from './components/crd'
import ax from 'axios'
import config from '../config/config.js'
export default {
  name: 'invite',
  components: { page, block, crd },
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

<style lang="less">
.invite {
  min-height: 800px;
  line-height: 40px;
  .content {
    padding: 16px;
  }
}
</style>
