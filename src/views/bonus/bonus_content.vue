<template>
    <div class="bonus_content">
        <block>
            <div slot="inner">
                <crd>
                    <span slot="title">{{levelName}} <img src="../../static/imgs/l1.png" v-show="level==1" /><img src="../../static/imgs/l2.png" v-show="level==2" /></span>
                    <div class="content">
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
                                <span class="mark">50人以上（含50人）</span> 注册且所有被邀请人均产生1笔交易（金额不限）即可成为
                                <span class="mark">超级合作伙伴</span>。永久分享被推荐人相关交易费50%的回报， 交易所上线前期超级合作伙伴还有额外好礼相送，具体细节，请联系
                                <span class="mark"> partner@exchain.com</span> 。
                            </p>
                            </Col>

                        </Row>
                        <Row type="flex" :gutter="16" :style="{marginTop:'20px'}">
                            <Col>
                            <p class="earn">普通合作伙伴：
                            </p>
                            <p class="earn">邀请
                                <span class="mark2">1人注册并产生1笔交易（金额不限）</span> （金额不限）
                                <span class="mark2">普通合作伙伴</span> 。永久分享被推荐人相关交易费20%的回报。
                            </p>
                            </Col>

                        </Row>
                    </div>
                </crd>
                <crd>
                    <span slot="title">
                        邀请方式
                    </span>
                    <div class="content">
                        <Row type="flex" :gutter="16">
                            <Col span="8">
                            <div class="invite">
                                <p>邀请码：</p>
                                <div>
                                    <input id="foo" :value="code">
                                    <!-- <span>{{code}}</span> -->
                                    <a type="text" id="btnCode" data-clipboard-target="#foo">复制邀请码</a>

                                </div>
                            </div>
                            </Col>
                            <Col span="16">
                            <div class="invite">
                                <p>邀请链接：</p>
                                <div>
                                    <input id="foo2" :value="link">
                                    <!-- <span> {{link}} </span> -->
                                    <a type="text" id="btnLink" data-clipboard-target="#foo2">复制邀请码</a>

                                </div>
                            </div>
                            </Col>
                        </Row>
                    </div>
                </crd>
                <crd>
                    <span slot="title">
                        邀请记录

                    </span>
                    <router-link to="/invite" slot="extra">

                        更多>>
                    </router-link>
                    <div class="content ">

                        <div class="stat">
                            已邀请{{n_all}}人，已完成交易{{n_act}}人
                        </div>
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
          var num = res.data.data.activeCount
          this.level = num == 0 ? '0' : num > 50 ? '2' : '1'
          this.levelName =
            num == 0 ? '交易伙伴' : num > 50 ? '超级合作伙伴' : '普通合作伙伴'
          this.n_all = res.data.data.inviteList.length
          this.n_act = res.data.data.inviteList.filter(function(p) {
            return p.isActive
          }).length
          console.log('邀请人数:', num)
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
  },
  mounted() {
    new ClipboardJS('#btnCode')
    new ClipboardJS('#btnLink')
  }
}
</script>

<style lang="less">
.bonus_content {
  margin-top: 16px;
  //   .pa-c {

  .content {
    background: url(../../static/imgs/pa-bg.png);
    background-repeat: no-repeat;
    background-position: bottom right;
    padding: 16px;
    .earn {
      line-height: 40px;
      //   font-size: @fontsize*1.1;
      .mark {
        color: #ffcf82;
      }
      .mark2 {
        color: #b4b4b4;
      }
    }
    .invite {
      // p {
      //   font-size: @fontsize*1.1;
      // }
      div {
        margin: 1em 0;
        background: #f2f3f7;
        // width: 90%;
        height: 50px;
        span {
          line-height: 50px;
          padding-left: 20px;
        }
        input {
          line-height: 50px;
          padding-left: 20px;
          background: transparent;
          border: none;

          &:focus {
            outline: none;
          }
        }
        a {
          line-height: 50px;
          margin-right: 20px;
          float: right;
        }
      }
      #foo2 {
        width: 530px;
      }
    }
    .stat {
      border: 1px solid white;
      background: #f2f3f7;
      //   margin: 1em 2em 0 2em;
      padding: 16px;
    }
  }
}
</style>
