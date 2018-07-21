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
            <Table :columns="columns1" :data="data1" disabled-hover="true"></Table>
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
export default {
  name: 'asset',
  data () {
    return {
      pageHeight: 0,
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
          title: ' ',
          key: 'opera',
          render: (h, params) => {
            return h('div', {
              style: {
                width: '250px'
              }
            }, [
              h('span', {
                style: {
                  color: '#419cf6',
                  cursor: 'pointer',
                  marginRight: '40px'
                }
              }, '充值'),
              h('span', {
                style: {
                  cursor: 'pointer',
                  marginRight: '40px'
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
      data1: []
    }
  },
  components: {
    crd,
    page
  },
  methods: {
    handleWindowResize () {
      this.pageHeight = window.innerHeight - 360
    },
    /**
     * 获取我的资产列表
     */
    getMyAsset () {
      ax.get(config.url.user + '/api/account/assetsList').then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          this.data1 = res.data.result.data;
        }
      });
    }
  },
  created () {
    this.getMyAsset();
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
    }
  }
</style>
