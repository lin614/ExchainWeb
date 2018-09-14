<template>
  <page class="page_content-padding">
    <div class="finance-record" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main clearfix">
        <crd potColor="#4399e9">
          <span slot="title">{{ $t('userCenter.financeRecord.title') }}</span>
          <div class="entrust-tab">
            <div class="entrust-tab-item fl" @click="handleTabClick('current')" :class="currentTab === 'current' ? 'tab-active' : ''">{{ $t('userCenter.financeRecord.depositHistory') }}</div>
            <div class="entrust-tab-item fl" @click="handleTabClick('history')" :class="currentTab === 'history' ? 'tab-active' : ''">{{ $t('userCenter.financeRecord.withdrawHistory') }}</div>
            <Dropdown class="finance-record-dropdown" placement="bottom-start" @on-visible-change="handleArrowDownFlag" @on-click="clickDropdown">
              <span>
                {{coin}}
                <Icon v-show="!arrowDownFlag" type="arrow-down-b"></Icon>
                <Icon v-show="arrowDownFlag" type="arrow-up-b"></Icon>
              </span>
              <DropdownMenu slot="list">
                <DropdownItem v-for="(item, index) in coins" :key="index" :name="item.name">{{item.label}}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <Table v-if="currentTab === 'current'" :columns="rechargeColumns" :data="rechargeData"></Table>
          <Page v-if="(currentTab === 'current') && showRechargePage" @on-change="handleRechargePageChange" :page-size="rechargeParam.size" :total="rechargeParamTotal"></Page>
          <Table v-if="currentTab === 'history'" :columns="withdrawColumns" :data="withdrawData"></Table>
          <Page v-if="(currentTab === 'history') && showWithdrawPage" @on-change="handleWithdrawPageChange" :page-size="withdrawParam.size" :total="withdrawParamTotal"></Page>
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
import rechargeDetail from './financeRecord-rechargeDetail'
import withdrawDetail from './financeRecord-withdrawDetail'

export default {
  name: 'entrust',

  components: {
    rechargeDetail,
    withdrawDetail
  },

  data() {
    var vu = this
    return {
      coin: null,
      pageHeight: 0,
      currentTab: 'current',
      arrowDownFlag: false,
      showRechargePage: false,
      showWithdrawPage: false,
      curPage: 1,
      curSize: 10,
      hisPage: 1,
      hisSize: 10,
      rechargeParamTotal: 0,
      withdrawParamTotal: 0,
      rechargeData: [],
      withdrawData: [],
      rechargeParam: {
        type: null,
        ways: 'recharge', // recharge 表充币、withdraw表示提币
        start: 0,
        size: 10,
        dateStart: '2018-07-01',
        dateEnd: '2020-12-31'
      },
      withdrawParam: {
        type: null,
        ways: 'withdraw', // recharge 表充币、withdraw表示提币
        start: 0,
        size: 10,
        dateStart: '2018-07-01',
        dateEnd: '2020-12-31'
      },
      oldOpenName: null,
      oldOpenIndex: null
    }
  },
  computed: {
    rechargeStatus() {
      return [{
        name: 0,
        label: this.$t('userCenter.financeRecord.depositStatus.toppingUp') // 0等待完善
      },
      {
        name: 1,
        label: this.$t('userCenter.financeRecord.depositStatus.toppingUp') // 1等待确认
      },
      {
        name: 2,
        label: this.$t('userCenter.financeRecord.depositStatus.topUpCompleted') // 2完成确认
      }]
    },
    withdrawStatus() {
      return [{
        name: 1,
        label: this.$t('userCenter.financeRecord.withdrawStatus.pending') // 1提交
      },
      {
        name: 2,
        label: this.$t('userCenter.financeRecord.withdrawStatus.passed') //2同意
      },
      {
        name: 3,
        label: this.$t('userCenter.financeRecord.withdrawStatus.rejected') // 3驳回
      },
      {
        name: 4,
        label: this.$t('common.lang') === 'cn' ? '处理中' : 'All' // 4处理中
      },
      {
        name: 5,
        label: this.$t('common.lang') === 'cn' ? '处理完成' : 'All' // 5处理完成
      },
      {
        name: 6,
        label: this.$t('common.lang') === 'cn' ? '处理失败' : 'All' // 6处理失败
      }];
    },
    coins() {
      return [{
        name: this.$t('common.lang') === 'cn' ? '全部' : 'All',
        label: this.$t('common.lang') === 'cn' ? '全部' : 'All'
      },
      {
        name: 'USDT',
        label: 'USDT'
      },
      {
        name: 'BTC',
        label: 'BTC'
      },
      {
        name: 'ETH',
        label: 'ETH'
      },
      {
        name: 'BCH',
        label: 'BCH'
      },
      {
        name: 'ET',
        label: 'ET'
      }];
    },
    columns() {
      let vu = this;
      return [
        {
          title: this.$t('userCenter.financeRecord.table.ctime'),
          key: 'ctime',
          width: 200
        },
        {
          title: this.$t('userCenter.financeRecord.table.market'),
          key: 'type',
          width: 200
        },
        {
          title: this.$t('userCenter.financeRecord.table.side'),
          key: 'side',
          width: 200,
          render: (h, params) => {
            return h('span', params.row.name === 'recharge' ? this.$t('userCenter.financeRecord.table.recharge') : this.$t('userCenter.financeRecord.table.withdraw'));
          }
        },
        {
          title: this.$t('userCenter.financeRecord.table.amount'),
          key: 'balance',
          width: 200,
          render: (h, params) => {
            return h('span', parseFloat(params.row.balance).toFixed(8));
          }
        },
        {
          title: this.$t('userCenter.financeRecord.table.status'),
          key: 'status',
          width: 160,
          render: (h, params) => {
            return h('span', this.showStatus(params));
          }
        },
        {
          title: this.$t('userCenter.financeRecord.table.opera'),
          key: 'opera',
          width: 158,
          align: 'right',
          className: 'opera',
          renderHeader: (h, params) => {
            return h(
              'span',
              {
                style: {
                  marginRight: '12px'
                }
              },
              this.$t('userCenter.financeRecord.table.opera')
            );
          },
          render: (h, params) => {
            return h(
              'span',
              {
                style: {
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.handleOpera(params)
                  }
                }
              },
              [
                h(
                  'strong',
                  {
                    style: {
                      color: '#419cf6'
                    }
                  },
                  this.$t('userCenter.financeRecord.table.detail')
                ),
                h('Icon', {
                  props: {
                    type: params.row._expanded ? 'arrow-up-b' : 'arrow-down-b'
                  },
                  style: {
                    color: '#c8c8c8',
                    marginLeft: '4px'
                  }
                })
              ]
            )
          }
        }
      ]
    },
    rechargeColumns() {
      return [
        ...this.columns,
        {
          type: 'expand',
          width: 1,
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  width: '100%',
                  padding: '5px 20px',
                  border: '1px solid #ebebeb',
                  borderRadius: '4px',
                  backgroundColor: '#fafafa'
                }
              },
              [
                h(rechargeDetail, {
                  props: {
                    detail: params.row
                  }
                }),
              ]
            )
          }
        }
      ]
    },
    withdrawColumns() {
      return [
        ...this.columns,
        {
          type: 'expand',
          width: 1,
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  width: '100%',
                  padding: '5px 20px',
                  border: '1px solid #ebebeb',
                  borderRadius: '4px',
                  backgroundColor: '#fafafa'
                }
              },
              [
                h(withdrawDetail, {
                  props: {
                    detail: params.row
                  }
                }),
              ]
            )
          }
        }
      ]
    }
  },
  components: {
    crd,
    page
  },
  methods: {
    handleArrowDownFlag(visible) {
      this.arrowDownFlag = visible
    },
    showStatus(params) {
      if (params.row.name === 'recharge') {
        for (var i = 0; i < this.rechargeStatus.length; i++) {
          if(this.rechargeStatus[i].name == params.row.status) {
            return this.rechargeStatus[i].label
          }
        }
      } else {
        for (var i = 0; i < this.withdrawStatus.length; i++) {
          if(this.withdrawStatus[i].name == params.row.status) {
            return this.withdrawStatus[i].label
          }
        }
      }
    },
    clickDropdown(value) {
      if (this.coin === value) {
        return;
      }

      this.coin = value;

      if (this.currentTab === 'current') {
        this.getRecharge();
      } else {
        this.getWithdraw();
      }
    },
    handleWindowResize() {
      this.pageHeight = window.innerHeight - 360
    },
    handleTabClick(type) {
      this.currentTab = type
      this.coin = this.$t('common.lang') === 'cn' ? '全部' : 'All';
      if (type === 'current') {
        this.getRecharge()
      } else {
        this.getWithdraw()
      }
    },
    /**
     * 操作
     */
    handleOpera(row) {
      // 点击同一列两次关闭
      if (this.oldOpenName === row.row.name && this.oldOpenIndex === row.index) {
        this.oldOpenName = null
        this.oldOpenIndex = null
        if (row.row.name === 'recharge') {
          this.rechargeData.forEach((value, index) => {
            value._expanded = false
          })
        } else {
          this.withdrawData.forEach((value, index) => {
            value._expanded = false
          })
        }
      } else {
        this.oldOpenName = row.row.name
        this.oldOpenIndex = row.index
        if (row.row.name === 'recharge') {
          this.rechargeData.forEach((value, index) => {
            value._expanded = false
          })
          this.rechargeData[row.index]._expanded = true
        } else {
          this.withdrawData.forEach((value, index) => {
            value._expanded = false
          })
          this.withdrawData[row.index]._expanded = true
        }
      }
    },
    /**
     * 获取提币记录
     */
    getRecharge() {
      this.rechargeParam.type = (this.coin === '全部' || this.coin === 'All') ? null : this.coin;

      ax
        .post(config.url.user + '/api/account/getHistory', this.rechargeParam, getHeader)
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            let data = res.data.result.data
            
            for (var i = 0; i < data.length; i++) {
              data[i]._expanded = false
              data[i].side = '普通币种';
            }
            
            this.rechargeData = data;
            
            // 分页是否显示
            this.rechargeParamTotal = res.data.result.total * 1
            if (Math.ceil(this.rechargeParamTotal / this.rechargeParam.size) > 1) {
              this.showRechargePage = true
            } else {
              this.showRechargePage = false
            }
          } else {
            apiError(this, res);
          }
        })
    },
    /**
     * 获取成交历史
     */
    getWithdraw() {
      this.withdrawParam
      this.withdrawParam.type = (this.coin === '全部' || this.coin === 'All') ? null : this.coin;
      ax
        .post(config.url.user + '/api/account/getHistory', this.withdrawParam, getHeader)
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            let data = res.data.result.data
            
            for (var i = 0; i < data.length; i++) {
              data[i]._expanded = false
              data[i].side = '普通币种';
            }
            
            this.withdrawData = data;
            
            // 分页是否显示
            this.withdrawParamTotal = res.data.result.total * 1
            if (Math.ceil(this.withdrawParamTotal / this.withdrawParam.size) > 1) {
              this.showWithdrawPage = true
            } else {
              this.showWithdrawPage = false
            }
          } else {
            apiError(this, res);
          }
        })
    },
    /**
     * 当前委托页码改变
     */
    handleRechargePageChange (e) {
      this.rechargeParam.start = (e - 1) * this.rechargeParam.size
      this.getRecharge()
    },
    /**
     * 成交历史页码改变
     */
    handleWithdrawPageChange (e) {
      this.withdrawParam.start = (e - 1) * this.withdrawParam.size
      this.getWithdraw()
    }
  },
  mounted() {
    this.coin = this.$t('common.lang') === 'cn' ? '全部' : 'All';
    bus.$on('langChange', () => {
      if (this.coin === '全部' || this.coin === 'All') {
        this.coin = this.$t('common.lang') === 'cn' ? '全部' : 'All';
      }
    })
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
    this.getRecharge()
  },
  destroyed() {
    bus.$off('langChange');
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style lang="less">
.finance-record {
  .finance-record-dropdown{
    float: right;
    margin-top: 14px;
    margin-right: 30px;
  }
  .finance-record-dropdown span{
    color: #333;
    cursor: pointer;
  }
  .finance-record-dropdown span .ivu-icon{
    color: #c8c8c8;
  }
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
    height: 49px;
    margin-bottom: 15px;
    padding-left: 30px;
    background-color: #f9fafc;
    // border-top: 1px solid #e9eaec;
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
    padding: 0px 30px;
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
