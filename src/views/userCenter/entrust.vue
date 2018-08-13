<template>
  <page>
    <div class="entrust-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main clearfix">
        <crd potColor="#4399e9">
          <span slot="title">{{ $t('userCenter.entrust.title') }}</span>
          <div class="entrust-tab">
            <div class="entrust-tab-item fl" @click="handleTabClick('current')" :class="currentTab === 'current' ? 'tab-active' : ''">{{ $t('userCenter.entrust.currentOrder') }}</div>
            <div class="entrust-tab-item fl" @click="handleTabClick('history')" :class="currentTab === 'history' ? 'tab-active' : ''">{{ $t('userCenter.entrust.historyOrder') }}</div>
          </div>
          <Table v-if="currentTab === 'current'" :columns="columns1" :data="curData"></Table>
          <Page v-if="(currentTab === 'current') && showCurPage" @on-change="handleCurPageChange" :total="curTotal"></Page>
          <Table v-if="currentTab === 'history'" :columns="columns2" :data="hisData"></Table>
          <Page v-if="(currentTab === 'history') && showHisPage" @on-change="handleHisPageChange" :total="hisTotal"></Page>
        </crd>
      </div>
    </div>
  </page>
</template>

<script>
import page from '../components/page'
import crd from '../components/crd.vue'
import ax from 'axios'
import config from '../../config/config.js'
import util from '../../libs/util.js'
import cookie from 'js-cookie'
export default {
  name: 'entrust',
  data() {
    var vu = this
    return {
      pageHeight: 0,
      currentTab: 'current',
      showCurPage: false,
      showHisPage: false,
      curPage: 1,
      curSize: 10,
      curTotal: 0,
      hisPage: 1,
      hisSize: 10,
      hisTotal: 0,
      columns1: [
        {
          title: this.$t('userCenter.entrust.ctime'),
          key: 'ctime',
          width: 200
        },
        {
          title: this.$t('userCenter.entrust.market'),
          key: 'market'
        },
        {
          title: this.$t('userCenter.entrust.side'),
          key: 'side',
          width: 100,
          render: function(h, params) {
            // var vu = this
            console.log(vu)
            return h(
              'div',
              {
                style: {
                  color: ((params.row.side + '') === '1') ? 'green' : 'red'
                }
              },
              ((params.row.side + '') === '1')
                ? vu.$t('userCenter.entrust.buy')
                : vu.$t('userCenter.entrust.sell')
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.price'),
          key: 'price'
        },
        {
          title: this.$t('userCenter.entrust.amount'),
          key: 'amount'
        },
        {
          title: this.$t('userCenter.entrust.closeRate'),
          key: 'closeRate'
        },
        {
          title: this.$t('userCenter.entrust.averPrice'),
          key: 'averPrice'
        },
        {
          title: this.$t('userCenter.entrust.opera'),
          key: 'opera',
          render: (h, params) => {
            return h(
              'span',
              {
                style: {
                  cursor: 'pointer'
                }
              },
              [
                h(
                  'strong',
                  {
                    style: {
                      color: '#419cf6'
                    },
                    on: {
                      click: () => {
                        this.cancelOrder(params.row)
                      }
                    }
                  },
                  this.$t('userCenter.entrust.cancelOrder')
                )
              ]
            )
          }
        }
      ],
      columns2: [
        {
          title: this.$t('userCenter.entrust.ctime'),
          key: 'ctime',
          width: 200
        },
        {
          title: this.$t('userCenter.entrust.market'),
          key: 'market'
        },
        {
          title: this.$t('userCenter.entrust.side'),
          key: 'side',
          width: 100,
          render: function(h, params) {
            // var vu = this
            console.log(vu)
            return h(
              'div',
              {
                style: {
                  color: ((params.row.side + '') === '1') ? 'green' : 'red'
                }
              },
              ((params.row.side + '') === '1')
                ? vu.$t('userCenter.entrust.buy')
                : vu.$t('userCenter.entrust.sell')
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.price'),
          key: 'price'
        },
        {
          title: this.$t('userCenter.entrust.amount'),
          key: 'amount'
        },
        {
          title: this.$t('userCenter.entrust.closeRate'),
          key: 'closeRate'
        },
        {
          title: this.$t('userCenter.entrust.averPrice'),
          key: 'averPrice'
        },
        {
          title: this.$t('userCenter.entrust.opera'),
          key: 'opera',
          render: (h, params) => {
            return h(
              'span',
              {
                style: {
                  cursor: 'pointer'
                }
              },
              [
                h(
                  'strong',
                  {
                    style: {
                      color: '#419cf6'
                    },
                    on: {
                      click: () => {
                        this.cancelOrder(params.row)
                      }
                    }
                  },
                  ''
                )
              ]
            )
          }
        }
      ],
      curData: [],
      hisData: []
    }
  },
  components: {
    crd,
    page
  },
  methods: {
    handleWindowResize() {
      this.pageHeight = window.innerHeight - 360
    },
    handleTabClick(type) {
      this.currentTab = type
      if (type === 'current') {
        this.getCurData()
      } else {
        this.getHisData()
      }
    },
    /**
     * 获取当前委托
     */
    getCurData() {
      var vu = this
      ax
        .get(
          config.url.user +
            '/api/order/lists?status=1&method=active&t' +
            new Date().getTime() + '&page=' + vu.curPage + '&size=' + vu.curSize,
          getHeader
        )
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            let data = res.data.result.data
            for (let i = 0; i < data.length; i++) {
              let amount_deal = parseFloat(data[i].amount_deal)
              let amount = parseFloat(data[i].amount)
              let rate = vu.accMul(vu.accDiv(amount_deal, amount), 100)
              data[i].closeRate = rate.toFixed(2)
              vu.curData = data
            }
            vu.curTotal = res.data.result.total * 1
            if (Math.ceil(vu.curTotal / vu.curSize) > 1) {
              this.showCurPage = true
            } else {
              this.showCurPage = false
            }
            if (data.length === 0) {
              vu.curData = []
            }
          } else {
            vu.$Message.error({ content: res.data.errorMsg })
          }
        })
    },
    /**
     * 获取成交历史
     */
    getHisData() {
      let params = {
        status: 2,
        method: 'history',
        t: new Date().getTime()
      }
      var vu = this
      ax
        .get(
          config.url.user +
            '/api/order/lists?status=2&method=history&t' +
            new Date().getTime() + '&page=' + vu.hisPage + '&size=' + vu.hisSize,
          getHeader
        )
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            let data = res.data.result.data
            for (let i = 0; i < data.length; i++) {
              let amount_deal = parseFloat(data[i].amount_deal)
              let amount = parseFloat(data[i].amount)
              let rate = vu.accMul(vu.accDiv(amount_deal, amount), 100)
              data[i].closeRate = rate.toFixed(2)
              vu.hisData = data
            }
            vu.hisTotal = res.data.result.total * 1
            if (Math.ceil(vu.hisTotal / vu.hisSize) > 1) {
              this.showHisPage = true
            } else {
              this.showHisPage = false
            }
          } else {
            vu.$Message.error({ content: res.data.errorMsg })
          }
        })
    },
    /**
     * 除法
     * @param {number} arg1 减数
     * @param {number} arg2 被减数
     * @return {number} arg1-arg2 结果
     */
    accDiv(arg1, arg2) {
      let t1 = 0,
        t2 = 0,
        r1,
        r2
      try {
        t1 = arg1.toString().split('.')[1].length
      } catch (e) {}

      try {
        t2 = arg2.toString().split('.')[1].length
      } catch (e) {}

      r1 = Number(arg1.toString().replace('.', ''))
      r2 = Number(arg2.toString().replace('.', ''))
      return r1 / r2 * Math.pow(10, t2 - t1)
    },
    /**
     * 乘法
     * @param {number} arg1 乘数
     * @param {number} arg2 乘数
     * @return {number} arg1*arg2 结果
     */
    accMul(arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString()
      try {
        m += s1.split('.')[1].length
      } catch (e) {}

      try {
        m += s2.split('.')[1].length
      } catch (e) {}

      return (
        Number(s1.replace('.', '')) *
        Number(s2.replace('.', '')) /
        Math.pow(10, m)
      )
    },
    /**
     * 取消订单
     * @param {object} row 订单记录
     */
    cancelOrder(row) {
      var vu = this
      ax
        .get(
          config.url.user + '/api/exchange/orderCancel?order_id=' + row.order_id + '&market=' + row.market,
          getHeader
        )
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            vu.getCurData()
            vu.$Message.success(vu.$t('errorMsg.SUCCESS'))
          } else {
            vu.$Message.error({ content: res.data.errorMsg })
          }
        })
    },
    /**
     * 当前委托页码改变
     */
    handleCurPageChange (e) {
      this.curPage = e
      this.getCurData()
    },
    /**
     * 成交历史页码改变
     */
    handleHisPageChange(e) {
      this.hisPage = e
      this.getHisData()
    }
  },
  mounted() {
    var vu = this
    util.toggleTableHeaderLang(vu.columns1, 7, 'userCenter.entrust.', vu)
    util.toggleTableHeaderLang(vu.columns2, 7, 'userCenter.entrust.', vu)
    bus.$on('langChange', () => {
      util.toggleTableHeaderLang(vu.columns1, 7, 'userCenter.entrust.', vu)
      util.toggleTableHeaderLang(vu.columns2, 7, 'userCenter.entrust.', vu)
    })
    console.log(getHeader)
  },
  created() {
    global.getHeader = (() => {
        return {
            headers: {
                'X-EXCHAIN-PN': cookie.get('PN', {
                    domain: config.url.domain
                })
            }
        }
    })()
    this.pageHeight = window.innerHeight - 360
    window.addEventListener('resize', this.handleWindowResize)
    this.getCurData()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style lang="less">
.entrust-cont {
  div {
    box-sizing: border-box;
  }
  .mainContent {
    padding-bottom: 20px;
  }
  box-sizing: border-box;
  width: 100%;
  padding-top: 40px;
  background-color: #f6f6f6;
  .crd {
    margin-bottom: 0;
    .ivu-card {
      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  }
  .entrust-tab {
    height: 50px;
    padding-left: 30px;
    background-color: #f9fafc;
    border-top: 1px solid #e9eaec;
    border-bottom: 1px solid #e9eaec;
    .entrust-tab-item {
      width: 130px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      cursor: pointer;
    }
    .tab-active {
      position: relative;
      border-right: 1px solid #e9eaec;
      border-left: 1px solid #e9eaec;
      background-color: #fff;
      color: #419cf6;
      &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 2px;
        top: -1px;
        left: 0;
        background-color: #419cf6;
      }
      &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        bottom: -1px;
        left: 0;
        background-color: #fff;
      }
    }
  }
  .ivu-table-wrapper {
    border: none;
    .ivu-table::after {
      width: 0;
    }
    .ivu-table::before {
      width: 0;
    }
    .ivu-table tr {
      height: 41px;
      line-height: 41px;
    }
    .ivu-table th {
      background-color: transparent;
    }
    .ivu-table td {
      border-bottom: none;
    }
  }
  .ivu-page {
    text-align: center;
  }
}
</style>
