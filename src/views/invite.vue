
<template>
  <page>
    <div class="invite">
      <block>
        <crd slot="inner">
          <span slot="title">{{ $t('userCenter.invite.title') }}</span>
          <!-- <router-link to="/bonus" slot="extra">
                        <<返回 </router-link> -->
          <div class=" content">
            <Row type="flex" :gutter="16">
              <Col span="8">
              <p class="earn">
                <b>{{ $t('userCenter.invite.invite') }}</b>
              </p>
              </Col>
              <Col span="8">
              <p class="earn">
                <b>{{ $t('userCenter.invite.time') }}</b>
              </p>

              </Col>
              <Col span="8">
              <p class="earn">
                <b>{{ $t('userCenter.invite.status') }}</b>
              </p>

              </Col>
            </Row>
            <Row type="flex" :gutter="16" v-for="p in list" :key="p.user">
              <Col span="8">
              <p class="earn">{{p.email}}
              </p>
              </Col>
              <Col span="8">
              <p class="earn"> {{p.createTime}}</p>

              </Col>
              <Col span="8">
              <p class="earn"> {{p.isActive ? $t('bonus.traded') : $t('bonus.untrade')}}</p>

              </Col>
            </Row>
            <Row v-if="noData" class="no-data" type="flex" :gutter="16">{{$t('errorMsg.NO_DATA')}}</Row>
            <Page @on-change="handlePageChange" v-if="showPage" :total="total"></Page>
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
import cookie from 'js-cookie'
ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
  domain: config.url.domain
})
export default {
  name: 'invite',
  components: { page, block, crd },
  data() {
    return {
      list: [], //邀请记录
      noData: false,
      showPage: false,
      page: 1,
      size: 10,
      total: 0
    }
  },
  methods: {
    handlePageChange (val) {
      this.page = val
      this.getData()
    },
    getData () {
      var uid = cookie.get('uid', { domain: config.url.domain })
      var vu = this
      ax
        .post(config.url.invite + '/api/invite/invitedList', {
          userId: uid,
          pageNum: vu.page,
          pageSize: vu.size
        })
        .then(res => {
          // console.log(res)
          if (res.status == '200' && res.data.meta.code == '0') {
            var data = res.data.data
            vu.list = data.inviteList
            vu.total = data.inviteCount
            vu.page = data.pageNum
            if (parseInt(data.totalPages) > 1) {
              this.showPage = true
            } else {
              this.showPage = false
            }
            if (vu.list.length === 0) {
              vu.noData = true
            } else {
              vu.noData = false
            }
          } else {
            apiError(vu, res);
          }
        })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less">
.invite {
  min-height: 800px;
  line-height: 40px;
  padding-top: 40px;
  .content {
    padding: 16px;
  }
  .no-data {
    justify-content: center;
  }
  .ivu-page {
    text-align: center;
  }
}
</style>
