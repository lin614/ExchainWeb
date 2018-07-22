<template>
  <page>
    <div class="asset-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content">
        <crd potColor="#4399e9">
          <span slot="title">我的资产</span>
          <div class="card-main clearfix">
            <div class="asset-amount">
              <span class="asset-amount-title">我的资产</span>
              <span>当前估值：</span>
              <span class="total-amount">0.00000BTC / ￥0.00 CNY</span>
            </div>
            <Table :columns="columns1" :data="data1" :disabled-hover="true"></Table>
          </div>
        </crd>
      </div>
    </div>
  </page>
</template>

<script>
import page from "../components/page"
import crd from "../components/crd.vue"
import ax from 'axios'
import config from '../../config/config.js'
import encharge from './encharge'
import getCash from './getCash'
import manageAddr from './manageAddr'
export default {
  name: 'asset',
  components: {
    crd,
    page,
    encharge,
    getCash,
    manageAddr
  },
  data () {
    return {
      pageHeight: 0,
      showExType: '',
      columns1: [
        {
          title: '币种',
          key: 'token'
        },
        {
          title: '总额',
          key: 'amount'
        },
        {
          title: '可用余额',
          key: 'amount_available'
        },
        {
          title: '冻结',
          key: 'exchange_freeze'
        },
        {
          title: '主账户',
          key: 'main_account'
        },
        {
          title: ' ',
          key: 'opera',
          minWidth: 250,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                   color: '#419cf6',
                  cursor: 'pointer',
                  marginRight: '30px'
                },
                on: {
                  click: () => {
                    this.handleOpera(params.index, 'encharge')
                  }
                }
              }, '充值'),
              h('span', {
                style: {
                  cursor: 'pointer',
                  marginRight: '30px'
                },
                on: {
                  click: () => {
                    this.handleOpera(params.index, 'getCash')
                  }
                }
              }, '提现'),
              h('span', {
                style: {
                  cursor: 'pointer',
                  marginRight: '40px'
                }
              }, '划转'),
              h('span', {
                style: {
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.handleOpera(params.index, 'manageAddr')
                  }
                }
              }, '提现地址管理')
            ]);
          }
        },
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h('div', {
              style: {
                width: '100%',
                minHeight: '200px',
                backgroundColor: '#f5f5f5' 
              }
            }, [
              h(encharge, {})
            ])
          }
        },  
      ],
      data1: [
        {
          token: 'BTC',
          amount: '20000',
          amount_available: '1000',
          exchange_freeze: '19000',
          main_account: '0.000',
          _expanded: false
        },
        {
          token: 'ETH',
          amount: '20000',
          amount_available: '1000',
          exchange_freeze: '19000',
          main_account: '0.000',
          _expanded: false
        },
        {
          token: 'ETC',
          amount: '20000',
          amount_available: '1000',
          exchange_freeze: '19000',
          main_account: '0.000',
          _expanded: false
        }
      ]
    }
  },
  methods: {
    handleWindowResize () {
      this.pageHeight = window.innerHeight - 360
    },
    /**
     * 获取我的资产列表
     */
    // getMyAsset () {
    //   ax.get('/api/account/assetsList', {
    //     headers: {
    //       "pn": sessionStorage.pn
    //     }
    //   }).then(res => {
    //     if (res.status == '200' && res.data.errorCode == 0) {
    //       this.data1 = res.data.result.data;
    //     }
    //   });
    // }
    handleOpera (index, exType) {
      //request
      this.data1.forEach((value, index) => {
        value._expanded = false
      })
      console.log(this.data1)
      this.data1[index]._expanded = true
      this.showExType = exType
      console.log(this.showExType)
      this.$set(this.data1, index, this.data1[index])
    }
  },
  created () {
    // this.getMyAsset();
    this.pageHeight = window.innerHeight - 360
    window.addEventListener('resize', this.handleWindowResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style lang="less">
  .asset-cont {
    padding-top: 40px;
    font-size: 14px;
    .crd {
      margin-bottom: 0;
      .ivu-card {
        &:hover {
          transform: none;
          box-shadow: none;
        }
      }
      .card-main {
        padding: 55px 60px 0;
        .asset-amount {
          padding-bottom: 45px;
          line-height: 1.5;
          border-bottom: 1px solid #e9eaec;
          .asset-amount-title {
            padding-right: 120px;
          }
          .total-amount {
            font-size: 24px;
            line-height: 24px;
            color: #4b96e6;
          }
        }
      }
    }
    .ivu-table-wrapper {
      border: none;
      padding-top: 55px;
      padding-bottom: 25px;
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
      .ivu-table th:last-child {
        width: 250px;
      }
      .ivu-table td{
        border-bottom: none;
      }
      .ivu-table td:last-child {
        width: 250px;
      }
      td.ivu-table-expanded-cell {
        padding: 0;
      }
    }
  }
</style>
