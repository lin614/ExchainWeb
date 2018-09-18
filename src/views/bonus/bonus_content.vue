<template>
  <div class="bonus_content">
    <block>
      <div slot="inner">
        <crd class="user-level" :hideTitle="true">
          <!-- <span slot="title">{{levelName}} <img src="../../static/imgs/l1.png" v-show="level==1" /><img src="../../static/imgs/l2.png" v-show="level==2" /></span> -->
          <div :class="'lv lv' + level + '-' + $t('common.imgLang')"></div>

          <div class="lv-name">
            <h2>{{$t('bonus.currentLevel')}}
              <span>{{$t('bonus.' + levelName + 'Partner')}} </span>
            </h2>
          </div>
          <div class="content">
            <!-- <div class="lv-fee">
              <Row type="flex" :gutter="16">
                <Col span="8">
                <p class="earn">{{$t('bonus.yesterdayFeeRet')}}
                  <Icon type="social-bitcoin"></Icon> {{fee1}}</p>
                <p class="earn">{{$t('bonus.yesterdayETRet')}}
                  <Icon type="social-bitcoin"></Icon> {{et1}}</p>
                </Col>
                <Col span="16">
                <p class="earn"> {{$t('bonus.accumulateFeeRet')}}
                  <Icon type="social-bitcoin"></Icon> {{fee2}}</p>
                <p class="earn">{{$t('bonus.accumulateETRet')}}
                  <Icon type="social-bitcoin"></Icon> {{et2}}</p>
                </Col>
              </Row>
            </div> -->
            <div class="lv-text">
              <h3>{{$t('bonus.superPartner')}}: </h3>
              <p>{{$t('bonus.notice1')}}</p>

              <h3>{{$t('bonus.generalPartner')}}: </h3>
              <p>{{$t('bonus.notice2')}}</p>

              <h3>{{$t('bonus.tradePartner')}}: </h3>
              <p>{{$t('bonus.notice3')}}</p>

              <h3>{{$t('bonus.userPartner')}}: </h3>
              <p>{{$t('bonus.notice4')}}</p>
            </div>

            <div class="lv-contact">
              <span>{{$t('bonus.wechat')}}: Exchain5</span>
              <span class="telegram">{{$t('bonus.telegram')}}: https://t.me/Exchain_cn</span>
            </div>
          </div>
        </crd>

        <crd class="invite-type" potColor="#50b08c">
          <span slot="title">{{$t('bonus.inviteType')}}</span>

          <div class="content">
            <Row type="flex" :gutter="16">
              <Col span="8">
              <div class="invistyle">
                <p>{{$t('bonus.inviteCode')}}</p>
                <div>
                  <input id="foo" :value="code" disabled>
                  <!-- <span>{{code}}</span> -->
                  <a type="text" id="btnCode" :data-clipboard-text="code" @click="handleCopy('#btnCode')">{{$t('bonus.copyInviteCode')}}</a>
                </div>
              </div>
              </Col>

              <Col span="16">
              <div class="invistyle">
                <p>{{$t('bonus.inviteLink')}}</p>
                <div>
                  <input id="foo2" :value="link" disabled>
                  <!-- <span> {{link}} </span> -->
                  <a type="text" id="btnLink" :data-clipboard-text="link" @click="handleCopy('#btnLink')">{{$t('bonus.copyInviteLink')}}</a>
                </div>
              </div>
              </Col>
            </Row>
          </div>
        </crd>

        <crd class="ranking-list">
          <span class="ranking-list-title" slot="title">{{$t('bonus.inviteRankingList.title')}}</span>
          <router-link class="more" slot="more" target="_blank" to="/ranking">{{$t('bonus.inviteRankingList.more')}} >></router-link>
          
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

        <crd>
          <span slot="title" style="width: 1000px;">{{$t('bonus.inviteRecord')}}</span>
          <router-link v-if="showMore" slot="more" target="_blank" class="more" to="/invite">{{$t('bonus.toMore')}} >></router-link>
          
          <div class="content ">
            <div class="lv-text">
              {{$t('bonus.invited')}} {{n_all}} {{$t('bonus.inviteUnit')}}, {{$t('bonus.madeTrades')}} {{n_act}} {{$t('bonus.inviteUnit')}}
            </div>

            <Row type="flex" :gutter="16">
              <Col span="8"><p class="earn"><b>{{$t('bonus.account')}}</b></p></Col>
              <Col span="8"><p class="earn"><b>{{$t('bonus.time')}}</b></p></Col>
              <Col span="8"><p class="earn"><b>{{$t('bonus.status')}}</b></p></Col>
            </Row>

            <Row type="flex" :gutter="16" v-for="(p, index) in list" :key="index">
              <Col span="8"><p class="earn">{{p.email}}</p></Col>
              <Col span="8"><p class="earn"> {{p.createTime}}</p></Col>
              <Col span="8"><p class="earn"> {{p.isActive ? $t('bonus.traded') : $t('bonus.untrade')}}</p></Col>
            </Row>

            <div v-if="list.length === 0" style="color: #999; text-align:center;">{{inviteRecordMsg}}</div>
          </div>
        </crd>

        <div class="my-reward-wrap">
          <div class="my-reward">
            <div class="pa-top"></div>
            <div class="pa-bottom"></div>
            <div class="pa-left"></div>
            <div class="pa-right"></div>
            <p class="tit">{{$t('bonus.usdtReward.title')}} 
              <Tooltip placement="top" max-width="360">
                <span class="tip">?</span>
                <div slot="content" style="white-space: normal;">
                  <p class="tooltip1-tit">{{$t('bonus.usdtReward.table.sumary')}}</p>
                  <ul class="tooltip1-group">
                    <li class="tooltip1-item">
                      <span :class="'pt30 pt22 ' + $t('common.lang')">{{$t('bonus.usdtReward.table.traderUsreNum')}}</span><span class="pt30">{{$t('bonus.usdtReward.table.rewards')}} (USDT)</span><span :class="'pt30 pt22 ' + $t('common.lang')">{{$t('bonus.usdtReward.table.rewards2')}} (USDT)</span><span :class="'feesReward ' + $t('common.lang')">{{$t('bonus.usdtReward.table.feesReward')}}</span><span>{{$t('bonus.usdtReward.table.inviteesRewards')}} (USDT)</span>
                    </li>
                    <li class="tooltip1-item cnt h62">
                      <span>0-50</span><span>1/{{$t('bonus.usdtReward.table.user')}}</span><span :class="'pt10 ' + $t('common.lang')">{{$t('bonus.usdtReward.table.traderUsreNum')}}*1</span><span>20%</span><span>1/{{$t('bonus.usdtReward.table.user')}}</span>
                    </li>
                    <li class="tooltip1-item cnt">
                      <span class="pt30">51-500</span><span class="pt30">2/{{$t('bonus.usdtReward.table.user')}}</span><span :class="'pt10 ' + $t('common.lang')">50+ ({{$t('bonus.usdtReward.table.traderUsreNum')}}-50)*2</span><span class="pt30">50%</span><span class="pt30">1/{{$t('bonus.usdtReward.table.user')}}</span>
                    </li>
                    <li class="tooltip1-item cnt">
                      <span class="pt30">>500</span><span class="pt30">3/{{$t('bonus.usdtReward.table.user')}}</span><span :class="'pt10 ' + $t('common.lang')">950+ ({{$t('bonus.usdtReward.table.traderUsreNum')}}-500)*3</span><span class="pt30">50%</span><span class="pt30">1/{{$t('bonus.usdtReward.table.user')}}</span>
                    </li>
                  </ul>
                </div>
              </Tooltip>
            </p>

            <ul class="detail-group">
              <li class="detail-item">
                <label>{{$t('bonus.usdtReward.inviteRegisterCount')}}：</label>
                <span>{{userUSDT.inviteRegisterCount}}</span>
              </li>

              <li class="detail-item">
                <label>{{$t('bonus.usdtReward.usdtReward')}}：</label>
                <span>{{userUSDT.usdt}}</span>
              </li>

              <li class="detail-item">
                <label>{{$t('bonus.usdtReward.inviteKycCount')}}：</label>
                <span>{{userUSDT.inviteKycCount}}</span>
              </li>

              <li class="detail-item">
                <label>{{$t('bonus.usdtReward.maxUsdt')}}
                  <Tooltip placement="top" max-width="360">
                    <strong>?</strong>
                    <div slot="content" style="white-space: normal;">
                      <p>{{$t('bonus.usdtReward.maxUsdtMsg')}}</p>
                    </div>
                  </Tooltip>
                  ：
                  </label>
                <span>{{userUSDT.usdtCount}}</span>
              </li>
            </ul>

            <ul class="untrade-user">
              <li class="untrade-user-tit">
                <span>{{$t('bonus.usdtReward.regUntradeUserEmail')}}</span>
                <span>{{$t('bonus.usdtReward.regUntradeUserTime')}}</span>
              </li>
              <li v-for="(item, index) in userUSDT.list" :key="index">
                <span>{{item.email}}</span>
                <span>{{item.createTime}}</span>
              </li>
              <li v-if="userUSDT.list.length === 0" style="margin-left: 390px; color: #999; line-height: 100px;">{{userUSDTMsg}}</li>
            </ul>
          </div>
        </div>

      </div>
    </block>
  </div>
</template>

<script>
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
  components: { block, crd },
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
      inviteRankingList: [],
      userUSDT: {
        inviteKycCount: null,
        inviteRegisterCount: null,
        usdt: null,
        usdtCount: null,
        list: []
      },
      inviteRecordMsg: null,
      userUSDTMsg: null,
    }
  },
  created() {
    // ;[].slice(0, 10)
    // this.$Loading.start()
    // this.$Loading.start()
    var obj = this
    var uid = cookie.get('uid', { domain: config.url.domain })
    ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
      domain: config.url.domain
    })
    this.inviteRecordMsg = this.$t('name.loadingData');
    this.userUSDTMsg = this.$t('name.loadingData');
    this.getUserLevel();
    this.getInvitedCode();
    this.getInvitedList();
    this.getInviteRankingList();
    this.getUserUSDT();
  },
  mounted() {
    new ClipboardJS('#btnCode')
    new ClipboardJS('#btnLink')

    bus.$on('langChange', () => {
      this.inviteRecordMsg = this.$t('name.noData');
      this.userUSDTMsg = this.$t('name.noData');
    })
  },
  destroyed () {
    bus.$off('langChange');
  },
  methods: {
    /**
     * 获取用户等级
     */
    getUserLevel() {
      let uid = cookie.get('uid', { domain: config.url.domain })
      ax
        .post(config.url.invite + '/api/invite/userLevel', { userId: uid })
        .then(res => {
          if (res.status === 200 && res.data.meta.code === 0) {
            this.level = res.data.data.level
            this.levelName =
              this.level < 2
                ? this.level === 0 ? 'user' : 'trade'
                : this.level === 2 ? 'general' : 'super'
          } else {
            apiError(this, res)
          }
        })
        .catch(err => {
          apiReqError(this, err)
        })
    },

    /**
     * 获取邀请码
     */
    getInvitedCode() {
      let uid = cookie.get('uid', { domain: config.url.domain })
      ax
        .post(config.url.invite + '/api/invite/getInvitedCode', { userId: uid })
        .then(res => {
          if (res.status === 200 && res.data.meta.code === 0) {
            this.code = res.data.data.code
            this.link = location.protocol + '//www.exchain.com/reg/' + this.code
          }
        })
        .catch(err => {
          apiReqError(this, err)
        })
    },

    /**
     * 获取邀请记录
     */
    getInvitedList() {
      let uid = cookie.get('uid', { domain: config.url.domain })
      ax
        .post(config.url.invite + '/api/invite/invitedList', {userId: uid, pageNum: 1, pageSize: 10})
        .then(res => {
          if (res.status === 200 && res.data.meta.code === 0) {
            if (res.data.data.totalPages > 1) {
              this.showMore = true
            } else {
              this.showMore = false
            }
            this.list = res.data.data.inviteList || []
            this.inviteRecordMsg = this.$t('name.noData')
           
            this.n_all = res.data.data.inviteCount
            this.n_act = res.data.data.activeCount
            // this.n_act = res.data.data.inviteList.filter(function(p) {
            //   return p.isActive
            // }).length
          }
        })
        .catch(err => {
          apiReqError(this, err)
        })
    },

    /**
     * 获取用户奖励：昨日被邀请人手续费返还、被邀请人手续费累积返还、昨日获得ET返还量、累积ET返还量
     */
    getUserBouns() {
      ax
        .post(config.url.fee + '/api/exet/stats/userBouns', { userId: uid })
        .then(res => {
          if (res.status === 200 && res.data.meta.code === 0) {
            this.fee1 = res.data.data.inviteesBonus
            this.fee2 = res.data.data.totalInviteesBonus
            this.et1 = res.data.data.holderBonus
            this.et2 = res.data.data.totalHolderBonus
          }
        })
        .catch(error => {
          apiReqError(this, err)
        })
    },

    /**
     * 复制按钮
     */
    handleCopy(ele) {
      var vu = this
      var clipboard = new ClipboardJS(ele)
      clipboard.on('success', e => {
        vu.$Message.success(vu.$t('errorMsg.COPY_SUCCESS'))
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        vu.$Message.error(vu.$t('errorMsg.BROWSER_COPY_LIMIT'))
        clipboard.destroy()
      })
    },

    /**
     * 获取邀请记录
     */
    getInviteRankingList() {
      let params = {
        pageNum: 1,
        pageSize: 3,
        totalPages: 0
      }
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

    /**
     * getUserUSDT
     */
    getUserUSDT () {
      let params = {
        userId: cookie.get('uid', { domain: config.url.domain })
      };
      
      ax
        .post(config.url.invite + '/api/invite/activityInfo', params)
        .then(res => {
          if (res.status === 200 && res.data.meta.code === 0) {
            this.userUSDT = res.data.data;
            this.userUSDTMsg = this.$t('name.noData');
          }
        })
        .catch(err => {
          apiReqError(this, err);
        });
    }
  }
}
</script>

<style lang="less">
@import url(../style/config.less);
.bonus_content {
  line-height: 40px;
  //   .pa-c {
  .lv {
    height: 80px;
    font-size: @font-title;
    background-repeat: no-repeat;
    background-position-x: center;
  }
  .lv-bg {
    background-position: top center;
    background-repeat: no-repeat;
  }
  .lv0-cn {
    background: url('https://d3bcj1iwrh8aaw.cloudfront.net/imgs/l0-cn.png');
    .lv;
  }
  .lv1-cn {
    background: url('https://d3bcj1iwrh8aaw.cloudfront.net/imgs/l1-cn.png');
    .lv;
  }
  .lv2-cn {
    background: url('https://d3bcj1iwrh8aaw.cloudfront.net/imgs/l2-cn.png');
    .lv;
  }
  .lv3-cn {
    background: url('https://d3bcj1iwrh8aaw.cloudfront.net/imgs/l3-cn.png');
    .lv;
  }
  .lv0-en {
    background: url('https://d3bcj1iwrh8aaw.cloudfront.net/imgs/l0-en.png');
    .lv;
  }
  .lv1-en {
    background: url('https://d3bcj1iwrh8aaw.cloudfront.net/imgs/l1-en.png');
    .lv;
  }
  .lv2-en {
    background: url('https://d3bcj1iwrh8aaw.cloudfront.net/imgs/l2-en.png');
    .lv;
  }
  .lv3-en {
    background: url('https://d3bcj1iwrh8aaw.cloudfront.net/imgs/l3-en.png');
    .lv;
  }
  .lv-name {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    h2 {
      font-size: 18px;
      span {
        color: gold;
      }
    }
  }
  .lv-fee {
    margin-bottom: 32px;
  }
  .lv-text {
    margin-bottom: 10px;
    padding: 8px 16px;
    border-radius: 0px;
    background: @text-bg-color;
    h3 {
      font-size: 14px;
      //   font-weight: normal;
    }
    p {
      font-size: 12px;
    }
  }
  .lv-contact {
    padding: 25px 16px 0px;
    .telegram {
      margin-left: 300px;
    }
  }
  .content {
    background-repeat: no-repeat;
    background-position: bottom right;
    padding: 32px;

    .invistyle {
      div {
        margin: 1em 0;
        background: @text-bg-color;
        // width: 90%;
        height: 50px;
        border: 1px solid #ebebeb;
        border-radius: 0px;
        span {
          line-height: 50px;
          padding-left: 16px;
        }
        input {
          line-height: 50px;
          padding-left: 16px;
          background: transparent;
          border: none;

          &:focus {
            outline: none;
          }
        }
        a {
          line-height: 50px;
          margin-right: 16px;
          float: right;
        }
      }
      #foo2 {
        width: 530px;
      }
    }
  }
  .ec-table .cnt {
    color: #999;
  }
  .user-level {
    height: 636px;
  }
  .invite-type {
    height: 243px;
  }
  .ranking-list {
    min-height: 311px;
    .content {
      padding: 20px 40px;
    }
    .ranking-list-title {
      width: 1000px;

    }
    .ranking {
      width: 24px;
      height: 24px;
      display: block;
      line-height: 24px;
      margin-top: 8px;
      text-align: center;
      border-radius: 50%;
      &.ranking1 {
        color: #fff;
        background: #f5c250;
        font-weight: 600;
      }
      &.ranking2 {
        color: #fff;
        background: #d8d8d8;
        font-weight: 600;
      }
      &.ranking3 {
        color: #fff;
        background: #d09455;
        font-weight: 600;
      }
    }
    .ivu-row-flex {
      margin: 10px -8px;
    }
  }
  .my-reward-wrap {
    padding: 10px;
    background: #c9a37d;
    border-radius: 10px;
  }
  .my-reward {
    position: relative;
    min-height: 640px;
    padding: 20px;
    background: #fdfcf7;
    border-radius: 10px;
    .pa-top {
      position: absolute;
      top: 20px;
      left: 50px;
      width: 1080px;
      height: 2px;
      background: #bfa68c;
      &::before{
        content: '';
        position: absolute;
        left: -26px;
        width: 10px;
        height: 10px;
        background: #bfa68c;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
      &::after{
        content: '';
        position: absolute;
        right: -26px;
        width: 10px;
        height: 10px;
        background: #bfa68c;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }
    .pa-bottom {
      position: absolute;
      left: 50px;
      bottom: 20px;
      width: 1080px;
      height: 2px;
      background: #bfa68c;
      &::before{
        content: '';
        position: absolute;
        bottom: 0px;
        left: -26px;
        width: 10px;
        height: 10px;
        background: #bfa68c;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
      &::after{
        content: '';
        position: absolute;
        bottom: 0px;
        right: -26px;
        width: 10px;
        height: 10px;
        background: #bfa68c;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }
    .pa-left {
      position: absolute;
      top: 40px;
      left: 21px;
      width: 2px;
      height: calc(100% - 80px);
      background: #bfa68c;
    }
    .pa-right {
      position: absolute;
      top: 40px;
      right: -21px;
      width: 2px;
      height: calc(100% - 80px);
      background: #bfa68c;
    }
    .tit {
      margin: 0px 20px;
      padding: 50px;
      font-size: 18px;
      text-align: center;
      color: #474543;
      border-bottom: 1px solid #ede1d2;
      .tip {
        display: inline-block;
        width: 18px;
        height: 18px;
        line-height: 19px;
        color: #fff;
        background: #c4a481;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        border-radius: 50%;
      }
      .ivu-tooltip-content {
        white-space: normal;
      }
      .ivu-tooltip-popper {
        // top: 1629px!important;
        // left: 1020px!important;
      }
      .ivu-tooltip-inner {
        width: 700px;
        max-width: none;
        padding: 0px;
        background: #f8f1e2;
        color: #b4997e;
        box-shadow: 0 1px 30px rgba(0,0,0,.1);
        border: 1px solid #ede1d2;
        border-bottom: 0px;
      }
      .ivu-tooltip-arrow {
        border-top-color: #c4a481;
        border-bottom-color: #c4a481; 
      }
      .tooltip1-tit{
        padding: 25px;
        font-size: 18px;
        color: #88684f;
        background: #f8f1e2;
      }
      .tooltip1-group {
        border-top: 1px solid #ede1d2;
        background: #fdf8e5;
      }
      .tooltip1-item span {
          display: inline-block;
          width: 20%;
          padding: 20px 6px;
          font-size: 14px;
          border-right: 1px solid #ede1d2;
          border-bottom: 1px solid #ede1d2;
          text-align: center;
          height: 83px;
          vertical-align: middle;
        &:last-child {
          border-right: 0px solid #ede1d2;
        }
      }
      .tooltip1-item.cnt span {
        color: #333;
      }
      .tooltip1-item.h62 span {
        height: 62px;
      }
      .tooltip1-item span.pt30 {
        padding-top: 30px;
      }
      .tooltip1-item span.en.pt10 {
        padding-top: 10px;
      }
      .tooltip1-item span.en.pt22 {
        padding-top: 22px;
      }
      .tooltip1-item span.en.feesReward {
        padding-top: 7px;
        font-size: 12px;
      }
    }

    .detail-group {
      margin: 0px 20px;
      border-bottom: 1px solid #ede1d2;
      padding: 45px 0px 45px 100px;
    }
    .detail-group .detail-item {
      width: 49.5%;
      display: inline-block;
    }
    .detail-group .detail-item .ivu-tooltip-inner {
      background: #f8f1e2;
      color: #b4997e;
      border: 1px solid #ede1d2;
      box-shadow: 0 1px 30px rgba(0,0,0,.1);
    }
    .detail-group .detail-item .ivu-tooltip-arrow {
      border-top-color: #c4a481;
      border-bottom-color: #c4a481;
    }
    .detail-group .detail-item label {
      color: #333;
    }
    .detail-group .detail-item span {
      color: #999;
    }
    .detail-group .detail-item strong {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin: 0px 5px;
      line-height: 19px;
      color: #fff;
      background: #c4a481;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      border-radius: 50%;
    }
    .untrade-user {
      margin: 0px 20px;
      padding: 45px 0px 45px 100px;
      span {
        width: 49.5%;
        display: inline-block;
        color: #999;
      }
      .untrade-user-tit span{
        color: #333;
      }
    }
  }
}



</style>
