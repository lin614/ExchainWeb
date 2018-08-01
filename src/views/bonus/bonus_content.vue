<template>
  <div class="bonus_content">
    <block>
      <div slot="inner">
        <crd :hideTitle="true">
          <!-- <span slot="title">{{levelName}} <img src="../../static/imgs/l1.png" v-show="level==1" /><img src="../../static/imgs/l2.png" v-show="level==2" /></span> -->
          <div :class="'lv'+level">

          </div>
          <div class="lv-name">
            <h2>{{$t('bonus.currentLevel')}}
              <span>{{levelName}} </span>
            </h2>
          </div>
          <div class="content">
            <div class="lv-fee">
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
            </div>
            <div class="lv-text">
              <h3>{{$t('bonus.superPartner')}}
              </h3>
              <p>{{$t('bonus.notice1')}}
              </p>
              <h3>{{$t('bonus.partner')}}
              </h3>
              <p>{{$t('bonus.notice2')}}
              </p>
              <h3>{{$t('bonus.tradeUser')}}
              </h3>
              <p>{{$t('bonus.notice3')}}
              </p>
              <h3>{{$t('bonus.normalUser')}}
              </h3>
              <p>{{$t('bonus.notice4')}}
              </p>
            </div>
          </div>
        </crd>
        <crd>
          <span slot="title">
            {{$t('bonus.inviteType')}}
          </span>
          <div class="content">
            <Row type="flex" :gutter="16">
              <Col span="8">
              <div class="invistyle">
                <p>{{$t('bonus.inviteCode')}}</p>
                <div>
                  <input id="foo" :value="code">
                  <!-- <span>{{code}}</span> -->
                  <a type="text" id="btnCode" data-clipboard-target="#foo">{{$t('bonus.copyInviteCode')}}</a>

                </div>
              </div>
              </Col>
              <Col span="16">
              <div class="invistyle">
                <p>{{$t('bonus.inviteLink')}}</p>
                <div>
                  <input id="foo2" :value="link">
                  <!-- <span> {{link}} </span> -->
                  <a type="text" id="btnLink" data-clipboard-target="#foo2">{{$t('bonus.copyInviteCode')}}</a>

                </div>
              </div>
              </Col>
            </Row>
          </div>
        </crd>
        <crd>
          <span slot="title">
            {{$t('bonus.inviteRecord')}}

          </span>
          <!-- <router-link target="_blank" to="/invite" slot="extra">

            更多>>
          </router-link> -->
          <div class="content ">

            <div class="lv-text">
              {{$t('bonus.invited')}}{{n_all}}{{$t('bonus.inviteUnit')}} {{$t('bonus.traded')}}{{n_act}}{{$t('bonus.inviteUnit')}}
            </div>
            <Row type="flex" :gutter="16">
              <Col span="8">
              <p class="earn">
                <b>{{$t('bonus.account')}}</b>
              </p>
              </Col>
              <Col span="8">
              <p class="earn">
                <b>{{$t('bonus.time')}}</b>
              </p>

              </Col>
              <Col span="8">
              <p class="earn">
                <b>{{$t('bonus.status')}}</b>
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
              <p class="earn"> {{p.isActive ? $t('bonus.traded') : $t('bonus.untrade')}}</p>

              </Col>
            </Row>

          </div>
          <router-link class="to-more" target="_blank" to="/invite">{{$t('bonus.toMore')}}</router-link>
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
export default {
  name: 'bonus_content',
  components: { block, crd },
  data() {
    return {
      level: 0,
      levelName: '交易伙伴',
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
    console.log('c_pn', cookie.get('PN'))
    console.log('uid', uid)
    ax.defaults.headers.post['X-EXCHAIN-PN'] = cookie.get('PN', {
      domain: config.url.domain
    })
    ax
      .all([
        ax.post(config.url.invite + '/api/invite/getInvitedCode', {
          userId: uid
        }),
        ax.post(config.url.invite + '/api/invite/invitedList', {
          userId: uid
        }),
        ax.post(config.url.fee + '/api/exet/stats/userBouns', {
          userId: uid
        })
      ])
      .then(
        ax.spread(function(res1, res2, res3) {
          //   this.$Loading.finish()
          if (
            res1.status == '200' &&
            res1.data.meta.code == '0' &&
            res2.status == '200' &&
            res2.data.meta.code == '0' &&
            res3.status == '200' &&
            res3.data.meta.code == '0'
          ) {
            obj.code = res1.data.data.code
            obj.link = 'http://www.exchain.com/reg/' + obj.code

            obj.list = res2.data.data.inviteList.slice(0, 10)
            var num = res2.data.data.activeCount
            obj.level = num == 0 ? '0' : num > 50 ? '2' : '1'
            obj.levelName =
              num == 0 ? '交易伙伴' : num > 50 ? '超级合作伙伴' : '普通合作伙伴'
            obj.n_all = res2.data.data.inviteList.length
            obj.n_act = res2.data.data.inviteList.filter(function(p) {
              return p.isActive
            }).length
            console.log('邀请人数:', num)

            obj.fee1 = res3.data.data.inviteesBonus
            obj.fee2 = res3.data.data.totalInviteesBonus
            obj.et1 = res3.data.data.holderBonus
            obj.et2 = res3.data.data.totalHolderBonus
          }
        })
      )
  },
  mounted() {
    new ClipboardJS('#btnCode')
    new ClipboardJS('#btnLink')
  }
}
</script>

<style lang="less">
@import url(../style/config.less);
.bonus_content {
  margin-top: 16px;
  line-height: 40px;
  //   .pa-c {
  .lv {
    height: 80px;
    background-position: top center;
    background-repeat: no-repeat;
    font-size: @font-title;
  }
  .lv0 {
    background: url(../../static/imgs/l0.png);
    .lv;
  }
  .lv1 {
    background: url(../../static/imgs/l1.png);
    .lv;
  }
  .lv3 {
    background: url(../../static/imgs/l2.png);
    .lv;
  }
  .lv-name {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    h2 {
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

    background: @text-bg-color;
    h3 {
      font-size: 14px;
      //   font-weight: normal;
    }
    p {
      font-size: 12px;
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
