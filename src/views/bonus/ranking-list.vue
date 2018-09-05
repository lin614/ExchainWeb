<template>
  <page class="page_content-padding">
    <div class="bonus_content" :style="'minHeight:' + pageHeight + 'px'">
      <block>
        <div slot="inner">
          <crd class="ranking-list">
            <span class="ranking-list-title" slot="title">{{$t('bonus.inviteRankingList.title')}}</span>
            
            <div class="content ec-table">
              <Row type="flex" :gutter="16">
                <Col span="8"><p class="tit"><b>{{$t('bonus.inviteRankingList.ranking')}}</b></p></Col>
                <Col span="8"><p class="tit"><b>{{$t('bonus.inviteRankingList.username')}}</b></p></Col>
                <Col span="8"><p class="tit"><b>{{$t('bonus.inviteRankingList.partnerNum')}}</b></p></Col>
              </Row>

              <Row type="flex" :gutter="16" v-for="(item, index) in inviteRankingList" :key="index">
                <Col span="8"><p class="cnt"><span :class="'ranking ranking' + item.top">{{item.top}}</span></p></Col>
                <Col span="8"><p class="cnt"> {{item.email}}</p></Col>
                <Col span="8"><p class="cnt"> {{item.activeCount}}</p></Col>
              </Row>
            </div>
          </crd>
        </div>
      </block>
    </div>
  </page>
</template>

<script>
import page from '../components/page'
import block from '../components/block'
import crd from '../components/crd'
import ClipboardJS from 'clipboard'
import ax from 'axios'
import config from '../../config/config.js'
import cookie from 'js-cookie'

ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
  domain: config.url.domain
})

export default {
  name: 'bonus_content',
  components: { page, block, crd },
  data() {
    return {
      level: '',
      levelName: '',
      showMore: false, //是否显示更多邀请记录，小于 10 条不显示按钮
      code: '', //邀请码
      link: '', //邀请链接
      fee1: '0', //昨日手续费
      et1: '0', //昨日获得ET返还量
      fee2: '0', //被邀请人手续费累积返还
      et2: '0', //累积ET返还量,
      list: [], //邀请记录
      n_all: 0, //已邀请人数
      n_act: 0, //已激活人数,
      inviteRankingMore: false,
      inviteRankingList: []
    }
  },
  created() {
    // ;[].slice(0, 10)
    // this.$Loading.start()
    // this.$Loading.start()
    this.pageHeight = window.innerHeight - 360
    var obj = this
    var uid = cookie.get('uid', { domain: config.url.domain })
    ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
      domain: config.url.domain
    })
    this.getInviteRankingList();
  },

  methods: {
    /**
     * 获取邀请记录
     */
    getInviteRankingList () {
      let params = {
        pageNum: 1,
        pageSize: 50,
        totalPages: 0
      };
      ax
        .post(config.url.invite + '/api/invite/partnerTop', params)
        .then(res => {
          if (res.status === 200 && res.data.meta.code === 0) {
            if (res.data.data.totalPages > 1) {
              this.inviteRankingMore = true
            } else {
              this.inviteRankingMore = false
            }
            this.inviteRankingList = res.data.data.list
          }
        })
        .catch(err => {
          apiReqError(this, err);
        });
    },
  }
}
</script>
