<template>
  <div class="bonus_content">
    <block>
      <div slot="inner">
        <crd :hideTitle="true">
          <!-- <span slot="title">{{levelName}} <img src="../../static/imgs/l1.png" v-show="level==1" /><img src="../../static/imgs/l2.png" v-show="level==2" /></span> -->
          <div :class="'lv' + level + '-' + $t('common.imgLang')"></div>

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

        <crd potColor="#50b08c">
          <span slot="title">
            {{$t('bonus.inviteType')}}
          </span>
          <div class="content">
            <Row type="flex" :gutter="16">
              <Col span="8">
              <div class="invistyle">
                <p>{{$t('bonus.inviteCode')}}</p>
                <div>
                  <input id="foo" :value="code" disabled>
                  <!-- <span>{{code}}</span> -->
                  <a type="text" id="btnCode"
                     :data-clipboard-text="code"
                     @click="handleCopy('#btnCode')">{{$t('bonus.copyInviteCode')}}</a>
                </div>
              </div>
              </Col>

              <Col span="16">
              <div class="invistyle">
                <p>{{$t('bonus.inviteLink')}}</p>
                <div>
                  <input id="foo2" :value="link" disabled>
                  <!-- <span> {{link}} </span> -->
                  <a type="text" id="btnLink"
                     :data-clipboard-text="link"
                     @click="handleCopy('#btnLink')">{{$t('bonus.copyInviteLink')}}</a>
                </div>
              </div>
              </Col>
            </Row>
          </div>
        </crd>

        <crd>
          <span slot="title">{{$t('bonus.inviteRecord')}}</span>
          
          <div class="content ">
            <div class="lv-text">
              {{$t('bonus.invited')}} {{n_all}} {{$t('bonus.inviteUnit')}}, {{$t('bonus.madeTrades')}} {{n_act}} {{$t('bonus.inviteUnit')}}
            </div>

            <Row type="flex" :gutter="16">
              <Col span="8"><p class="earn"><b>{{$t('bonus.account')}}</b></p></Col>

              <Col span="8"><p class="earn"><b>{{$t('bonus.time')}}</b></p></Col>

              <Col span="8"><p class="earn"><b>{{$t('bonus.status')}}</b></p></Col>
            </Row>

            <Row type="flex" :gutter="16" v-for="(p, index) in list" :key="p.user">
              <Col span="8"><p class="earn">{{p.userId}}</p></Col>

              <Col span="8"><p class="earn"> {{p.createTime}}</p></Col>
              
              <Col span="8"><p class="earn"> {{p.isActive ? $t('bonus.traded') : $t('bonus.untrade')}}</p></Col>
            </Row>
          </div>

          <router-link v-if="showMore" target="_blank" class="to-more" to="/invite">{{$t('bonus.toMore')}}</router-link>
        </crd>

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
      n_act: 0 //已激活人数
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
    this.getUserLevel();
    this.getInvitedCode();
    this.getInvitedList();
  },
  mounted() {
    new ClipboardJS('#btnCode')
    new ClipboardJS('#btnLink')
  },

  methods: {
    /**
     * 获取用户等级
     */
    getUserLevel () {
      let uid = cookie.get('uid', { domain: config.url.domain })
       ax
        .post(config.url.invite + '/api/invite/userLevel', {userId: uid})
        .then(res => {
          if (res.status === 200 && res.data.meta.code === 0) {
            this.level = res.data.data.level
            this.levelName = this.level < 2 ? (this.level === 0 ? 'user' : 'trade') : (this.level === 2 ? 'general' : 'super');
          } else {
            apiError(this, res);
          }
        })
        .catch(err => {
          apiReqError(this, err);
        });
    },

    /**
     * 获取邀请码
     */
    getInvitedCode () {
      let uid = cookie.get('uid', { domain: config.url.domain })
      ax
        .post(config.url.invite + '/api/invite/getInvitedCode', {userId: uid})
        .then(res => {
          if (res.status === 200 && res.data.meta.code === 0) {
            this.code = res.data.data.code
            this.link = 'http://www.exchain.com/reg/' + this.code
          }
        })
        .catch(err => {
          apiReqError(this, err);
        });
    },

    /**
     * 获取邀请记录
     */
    getInvitedList () {
      let uid = cookie.get('uid', { domain: config.url.domain })
      ax
        .post(config.url.invite + '/api/invite/invitedList', {userId: uid})
        .then(res => {
          if (res.status === 200 && res.data.meta.code === 0) {
            if (res.data.data.totalPages > 1) {
              this.showMore = true
            } else {
              this.showMore = false
            }
            this.list = res.data.data.inviteList.slice(0, 10)
           
            this.n_all = res.data.data.inviteCount
            this.n_act = res.data.data.activeCount
            // this.n_act = res.data.data.inviteList.filter(function(p) {
            //   return p.isActive
            // }).length
          }
        })
        .catch(err => {
          apiReqError(this, err);
        });
    },

    /**
     * 获取用户奖励：昨日被邀请人手续费返还、被邀请人手续费累积返还、昨日获得ET返还量、累积ET返还量
     */
    getUserBouns () {
      ax
        .post(config.url.fee + '/api/exet/stats/userBouns', {userId: uid})
        .then(res => {
          if (res.status === 200 && res.data.meta.code === 0) {
            this.fee1 = res.data.data.inviteesBonus
            this.fee2 = res.data.data.totalInviteesBonus
            this.et1 = res.data.data.holderBonus
            this.et2 = res.data.data.totalHolderBonus
          }
        })
        .catch(error => {
          apiReqError(this, err);
        });
    },
    
    /**
     * 复制按钮
     */
    handleCopy (ele) {
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
    }
  }
}
</script>

<style lang="less">
@import url(../style/config.less);
.bonus_content {
  margin-top: 16px;
  line-height: 40px;
  padding-top: 40px;
  //   .pa-c {
  .lv {
    height: 80px;
    background-position: top center;
    background-repeat: no-repeat;
    font-size: @font-title;
  }
  .lv0-cn {
    background: url(../../static/imgs/l0-cn.png);
    .lv;
  }
  .lv1-cn {
    background: url(../../static/imgs/l1-cn.png);
    .lv;
  }
  .lv2-cn {
    background: url(../../static/imgs/l2-cn.png);
    .lv;
  }
  .lv3-cn {
    background: url(../../static/imgs/l3-cn.png);
    .lv;
  }
  .lv0-en {
    background: url(../../static/imgs/l0-en.png);
    .lv;
  }
  .lv1-en {
    background: url(../../static/imgs/l1-en.png);
    .lv;
  }
  .lv2-en {
    background: url(../../static/imgs/l2-en.png);
    .lv;
  }
  .lv3-en {
    background: url(../../static/imgs/l3-en.png);
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
    padding: 8px 16px;
    border-radius: 4px;
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
    // background: url(../../static/imgs/pa-bg.png);
    background-repeat: no-repeat;
    background-position: bottom right;
    padding: 32px;

    .invistyle {
      // p {
      //   font-size: @fontsize*1.1;
      // }
      div {
        margin: 1em 0;
        background: @text-bg-color;
        // width: 90%;
        height: 50px;
        border: 1px solid #ebebeb;
        border-radius: 4px;
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
}
.to-more {
  display: inline-block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #eee;
  text-align: center;
  color: @font-color-blue;
  cursor: pointer;
}
</style>
