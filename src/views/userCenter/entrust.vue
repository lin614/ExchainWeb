<template>
  <page>
    <div class="entrust-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content clearfix">
        <crd potColor="#4399e9">
          <span slot="title">委托管理</span>
          <div class="entrust-tab">
            <div class="entrust-tab-item fl"
                 @click="handleTabClick('current')"
                 :class="currentTab === 'current' ? 'tab-active' : ''">当前委托</div>
            <div class="entrust-tab-item fl"
                 @click="handleTabClick('history')"
                 :class="currentTab === 'history' ? 'tab-active' : ''">成交历史</div>
          </div>
          <Table :columns="columns1" :data="data1"></Table>
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
  name: 'entrust',
  data () {
    return {
      pageHeight: 0,
      currentTab: 'current',
      columns1: [
        {
          title: '时间',
          key: 'time'
        },
        {
          title: '市场',
          key: 'market'
        },
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '数量',
          key: 'count'
        },
        {
          title: '成交率%',
          key: 'closeRate'
        },
        {
          title: '成交均价',
          key: 'averPrice'
        },
        {
          title: '操作',
          key: 'opera',
          render: (h, params) => {
            return h('span', {
              style: {
                cursor: 'pointer'
              }
            }, [
              h('strong', {
                style: {
                  color: '#419cf6'
                }
              }, params.row.opera),
                h('Icon', {
                  props: {
                    type: 'arrow-down-b'
                  },
                  style: {
                    color: '#419cf6',
                    marginLeft: '4px'
                  }
                })
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
          opera: '详情'
        },
        {
          time: '2018-0710 18:21:36',
          market: 'FTUSDT',
          type: '限价买入',
          price: '0.260000',
          count: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        },
        {
          time: '2018-0710 18:21:36',
          market: 'FTUSDT',
          type: '限价买入',
          price: '0.260000',
          count: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        },
        {
          time: '2018-0710 18:21:36',
          market: 'FTUSDT',
          type: '限价买入',
          price: '0.260000',
          count: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        },
        {
          time: '2018-0710 18:21:36',
          market: 'FTUSDT',
          type: '限价买入',
          price: '0.260000',
          count: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        },
        {
          time: '2018-0710 18:21:36',
          market: 'FTUSDT',
          type: '限价买入',
          price: '0.260000',
          count: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        },
        {
          time: '2018-0710 18:21:36',
          market: 'FTUSDT',
          type: '限价买入',
          price: '0.260000',
          count: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        }
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
    },
    handleTabClick (type) {
      this.currentTab = type
    },
    getCurEntrust () {
      ax.get(config.url.user + '/api/order/list', {}).then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          this.data1 = res.data.result.data;
        } else {
          this.$Modal.error(res.data.errorMsg);
        }
      });
    }
  },
  created () {
    this.pageHeight = window.innerHeight - 360
    window.addEventListener('resize', this.handleWindowResize)
    this.getCurEntrust();
  },
  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>

<style lang="less">
  .entrust-cont {
    div {
      box-sizing: border-box;
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
      .ivu-table td{
        border-bottom: none;
      }
    }
  }
  
</style>
