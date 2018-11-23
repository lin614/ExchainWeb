<template>
  <page class="page_content-padding">
    <div class="entrust-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main clearfix">
        <crd potColor="#4399e9">
          <span slot="title">{{ $t('userCenter.entrust.title') }}</span>
          <div class="entrust-tab">
            <div class="entrust-tab-item fl" @click="handleTabClick('current')" :class="currentTab === 'current' ? 'tab-active' : ''">{{ $t('userCenter.entrust.currentOrder') }}</div>
            <div class="entrust-tab-item fl" @click="handleTabClick('history')" :class="currentTab === 'history' ? 'tab-active' : ''">{{ $t('userCenter.entrust.historyOrder') }}</div>
            <div class="entrust-tab-item fl" @click="handleTabClick('historyRecord')" :class="currentTab === 'historyRecord' ? 'tab-active' : ''">{{ $t('userCenter.entrust.historyRecord') }}</div>

            <div class="fl search" v-if="currentTab !== 'current'">
              <span>{{ $t('userCenter.entrust.selectMonth') }}：</span>
              <DatePicker :value="month" @on-change="handleChange" type="month" :placeholder="$t('userCenter.entrust.selectMonth')" :options="options4" style="width: 200px"></DatePicker>
              <Button type="primary" @click="searchData">{{ $t('common.search') }}</Button>
            </div>
          </div>

          <Table v-if="currentTab === 'current'" :columns="columns1" :data="curData"></Table>
          <Table v-if="currentTab === 'history'" :columns="columns2" :data="hisData"></Table>
          <Table v-if="currentTab === 'historyRecord'" :columns="columns3" :data="hisRecData"></Table>

          <div v-if="page.show" class="page-wrap">
            <Page @on-change="changePage" :page-size="page.size" :total="page.total"></Page>
          </div>
          
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
import tradeDetail from './entrust-detail'
import { formatMarketPrecision } from '../../libs/utils/format.js'

export default {
  name: 'entrust',
  data() {
    var vu = this
    return {
      month: null,
      pageHeight: 0,
      currentTab: 'current',
      page: {
        cur: 1,
        size: 10,
        total: 0,
        show: false
      },
      options4: {
        disabledDate (date) {
          return date && date.valueOf() < 1538323200000 || date.valueOf() > Date.now();
        }
      },
      columns1: [
        {
          title: this.$t('userCenter.entrust.createTime'),
          key: 'ctime',
          width: 135
        },
        {
          title: this.$t('userCenter.entrust.txType'),
          key: 'txType',
          width: 100,
          render: function(h, params) {
            return h(
              'span',
              vu.$t('userCenter.entrust.coinTxType')
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.market'),
          key: 'market',
          width: 100
        },
        {
          title: this.$t('userCenter.entrust.side'),
          key: 'side',
          width: 50,
          render: function(h, params) {
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
          key: 'price',
          width: 125,
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.price,
                params.row.market,
                'price',
                vu
              )
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.entrustNum'),
          key: 'entrustNum',
          width: 125,
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.amount,
                params.row.market,
                'amount',
                vu
              )
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.entrustSumAmount'),
          width: 130,
          key: 'entrustSumAmount',
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.price * params.row.amount,
                params.row.market,
                'special',
                vu
              )
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.transactionNumed'),
          width: 130,
          key: 'transactionNumed',
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.transactionNumed,
                params.row.market,
                'amount',
                vu
              )
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.unTransactionNum'),
          width: 130,
          key: 'unTransactionNum',
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.unTransactionNum,
                params.row.market,
                'amount',
                vu
              )
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.closeRate'),
          key: 'closeRate',
          width: 80
        },
        {
          title: this.$t('userCenter.entrust.opera'),
          key: 'opera',
          width: 60,
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
                      color: '#419cf6',
                      cursor: params.row.cancelOrderLoading ? 'not-allowed' : 'pointer',
                    },
                    on: {
                      click: () => {
                        this.cancelOrder(params.index, params.row)
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
          width: 135
        },
        {
          title: this.$t('userCenter.entrust.txType'),
          key: 'txType',
          width: 100,
          render: function(h, params) {
            return h(
              'span',
              vu.$t('userCenter.entrust.coinTxType')
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.market'),
          key: 'market',
          width: 100,
        },
        {
          title: this.$t('userCenter.entrust.side'),
          key: 'side',
          width: 50,
          render: function(h, params) {
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
          key: 'price',
          width: 125,
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.price,
                params.row.market,
                'price',
                vu
              )
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.entrustNum'),
          key: 'entrustNum',
          width: 140,
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.amount,
                params.row.market,
                'amount',
                vu
              )
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.transactionNumed'),
          key: 'transactionNumed',
          width: 185,
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.amount_deal,
                params.row.market,
                'amount',
                vu
              )
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.closeRate'),
          key: 'closeRate'
        },
        {
          title: this.$t('userCenter.entrust.status.status'),
          key: 'status.status',
          render: function(h, params) {
            return h(
              'span',
              params.row.status == 2 ? vu.$t('userCenter.entrust.status.close') : vu.$t('userCenter.entrust.status.cancel')
            )
          }
        },
        // {
        //   title: this.$t('userCenter.entrust.closeRate'),
        //   key: 'closeRate'
        // },
        // {
        //   title: this.$t('userCenter.entrust.averPrice'),
        //   key: 'averPrice'
        // },
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
                        this.handleOpera(params.index, params.row, 'tradeDetail')
                      }
                    }
                  },
                  this.$t('userCenter.entrust.detail')
                )
              ]
            )
          }
        },
        {
          type: 'expand',
          width: 1,
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  width: '100%',
                  backgroundColor: 'rgb(247, 247, 247)'
                }
              },
              [
                h(tradeDetail, {
                  props: {
                    showCharge: this.showCharge,
                    order_id: params.row.order_id,
                    params: params.row
                  }
                })
              ]
            )
          }
        }
      ],
      columns3: [
        {
          title: this.$t('userCenter.entrust.transactionTime'),
          key: 'transactionTime',
          width: 200,
          render: function(h, params) {
            return h(
              'span',
              params.row.time
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.txType'),
          key: 'txType',
          width: 100,
          render: function(h, params) {
            return h(
              'span',
              vu.$t('userCenter.entrust.coinTxType')
            )
          }
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
          key: 'price',
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.price,
                params.row.market,
                'price',
                vu
              )
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.transactionNum'),
          key: 'transactionNum',
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.amount,
                params.row.market,
                'amount',
                vu
              )
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.transactionAmount'),
          key: 'transactionAmount',
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.price * params.row.amount,
                params.row.market,
                'special',
                vu
              )
            )
          }
        },
        {
          title: this.$t('userCenter.entrust.fee'),
          key: 'fee',
          render: function(h, params) {
            return h(
              'div',
              formatMarketPrecision(
                params.row.fee,
                params.row.market,
                'price',
                vu
              )
            )
          }
        }
      ],
      curData: [],
      hisData: [],
      hisRecData: []
    }
  },
  components: {
    crd,
    page
  },
  methods: {
    /**
     * 充值和提现点击操作
     */
    handleOpera(index, params, exType) {
      if (this.hisData[index]._expanded) {
        this.hisData[index]._expanded = false
      } else {
        for (var i = 0; i < this.hisData.length; i++) {
          this.hisData[i]._expanded = false
        }
        this.hisData[index]._expanded = true
      }
      this.$set(this.hisData, index, this.hisData[index])
    },
    searchData() {
      this.page = {
        cur: 1,
        size: 10,
        total: 0,
        show: false
      }
      if (this.currentTab === 'history') {
        this.getHisData()
      } else {
        this.getHistoryRecord()
      }
    },
    handleChange (date) {
      if (date === '') {
        this.month = null
      } else {
        var data = date.split('-');
        data[1] = data[1].length === 1 ? '0' + data[1] : data[1]
        this.month = data[0] + data[1];
      }
    },
    handleWindowResize() {
      this.pageHeight = window.innerHeight - 360
    },
    handleTabClick(type) {
      this.month = null
      this.page = {
        cur: 1,
        size: 10,
        total: 0,
        show: false
      }
      this.currentTab = type
      if (type === 'current') {
        this.getCurData()
      } else if (type === 'history') {
        this.getHisData()
      } else {
        this.getHistoryRecord()
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
            new Date().getTime() + '&page=' + vu.page.cur + '&size=' + vu.page.size,
          getHeader
        )
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            let data = res.data.result.data
            for (let i = 0; i < data.length; i++) {
              let amount_deal = parseFloat(data[i].amount_deal)
              let amount = parseFloat(data[i].amount)
              let rate = vu.accMul(vu.accDiv(amount_deal, amount), 100)
              data[i].closeRate = rate.toFixed(2) + '%'
              data[i].cancelOrderLoading = false;
              data[i].transactionNumed = data[i].amount_deal
              data[i].unTransactionNum = data[i].amount_no_deal
            }
            vu.curData = data
            vu.page.total = res.data.result.total * 1
            if (Math.ceil(vu.page.total / vu.page.size) > 1) {
              this.page.show = true
            } else {
              this.page.show = false
            }
            if (data.length === 0) {
              vu.curData = []
            }
          } else {
            apiError(vu, res);
          }
        })
    },
    /**
     * 获取成交历史
     */
    getHisData() {
      var vu = this
      var params = this.month ? '&month=' + this.month : ''
      ax
        .get(
          config.url.user +
            '/api/order/lists?method=history&t' +
            new Date().getTime() + '&page=' + vu.page.cur + '&size=' + vu.page.size + params,
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
              data[i]._expanded = false
            }
            vu.hisData = data
            vu.page.total = res.data.result.total * 1
            if (Math.ceil(vu.page.total / vu.page.size) > 1) {
              this.page.show = true
            } else {
              this.page.show = false
            }
          } else {
            apiError(vu, res);
          }
        })
    },
    /**
     * 获取历史委托
     */
    getHistoryRecord() {
      var vu = this
      var params = this.month ? '&month=' + this.month : ''
      ax
        .get(
          config.url.user +
            '/api/order/dealDetailLists?&t' +
            new Date().getTime() + '&page=' + vu.page.cur + '&size=' + vu.page.size + params,
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
              data[i]._expanded = false
            }
            vu.hisRecData = data
            vu.page.total = res.data.result.total * 1
            if (Math.ceil(vu.page.total / vu.page.size) > 1) {
              this.page.show = true
            } else {
              this.page.show = false
            }
          } else {
            apiError(vu, res);
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
    cancelOrder(index, row) {
      if (row.cancelOrderLoading) {
        return
      }

      var vu = this
      row.cancelOrderLoading = true
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
            row.cancelOrderLoading = false
            apiError(vu, res);
          }
        })
    },
    /**
     * 分页
     */
    changePage (e) {
      this.page.cur = e
      if (this.currentTab === 'current') {
        this.getCurData()
      } else if (this.currentTab === 'history') {
        this.getHisData()
      } else {
        this.getHistoryRecord()
      }
    }
  },

  mounted() {
    var vu = this
    util.toggleTableHeaderLang(vu.columns1, 10, 'userCenter.entrust.', vu)
    util.toggleTableHeaderLang(vu.columns2, 9, 'userCenter.entrust.', vu)
    util.toggleTableHeaderLang(vu.columns3, 7, 'userCenter.entrust.', vu)
    bus.$on('langChange', () => {
      util.toggleTableHeaderLang(vu.columns1, 10, 'userCenter.entrust.', vu)
      util.toggleTableHeaderLang(vu.columns2, 9, 'userCenter.entrust.', vu)
      util.toggleTableHeaderLang(vu.columns3, 7, 'userCenter.entrust.', vu)
    })
    this.getCurData()
  },
  created() {
    ax.get(config.url.user + '/api/exchange/getMarketInfo').then(res => {
      if (res.data.errorCode === 0) {
        let data = res.data.result
        this.$store.commit('setMarketPrecision', data)
      }
    });
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
  },
  destroyed() {
    bus.$off('langChange');
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style lang="less" scoped>

.entrust-cont {
  div {
    box-sizing: border-box;
  }
  .mainContent {
    padding-bottom: 20px;
  }
  box-sizing: border-box;
  width: 100%;
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
    // border-top: 1px solid #e9eaec;
    border-bottom: 1px solid #e9eaec;
    .entrust-tab-item {
      padding: 0px 20px;
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
      border-bottom: none;
    }
    .ivu-table td {
      border-bottom: none;
    }
  }
  .ivu-page {
    text-align: center;
  }
  .search {
    margin: 5px 100px;
  }
}
</style>
