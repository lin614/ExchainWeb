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
            <Table :columns="columns1" :data="data1"></Table>
          </div>
        </crd>
      </div>
    </div>
  </page>
</template>

<script>
import page from "../components/page"
import crd from "../components/crd.vue"
export default {
  name: 'asset',
  data () {
    return {
      pageHeight: 0,
      columns1: [
        {
          title: '币种',
          key: 'time'
        },
        {
          title: '总额',
          key: 'market'
        },
        {
          title: '可用余额',
          key: 'type'
        },
        {
          title: '冻结',
          key: 'price'
        },
        {
          title: ' ',
          key: 'opera',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color: '#419cf6',
                  cursor: 'pointer',
                  paddingRight: '40px'
                }
              }, '充值'),
              h('span', {
                style: {
                  cursor: 'pointer',
                  paddingRight: '40px'
                }
              }, '提现'),
              h('span', {
                style: {
                  cursor: 'pointer'
                }
              }, '提现地址管理')
            ]);
          }
        }
      ],
      data1: [
        {
          time: '2018-0710 18:21:36',
          market: 'FTUSDT',
          type: '限价买入',
          price: '0.260000',
          count: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: ''
        },
      ]
    }
  },
  components: {
    crd,
    page
  },
  methods: {
    handleWindowResize () {
      this.pageHeight = window.innerHeight - 360
    }
  },
  created () {
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
    font-size: 16px;
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
        &:last-child {
          width: 250px;
        }
      }
      .ivu-table td{
        border-bottom: none;
        &:last-child {
          width: 250px;
        }
      }
    }
  }
</style>
