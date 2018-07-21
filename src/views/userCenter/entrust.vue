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
          <Table v-if="currentTab === 'current'" :columns="columns1" :data="curData"></Table>
          <Table v-if="currentTab === 'history'" :columns="columns1" :data="hisData"></Table>
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
          key: 'ctime'
        },
        {
          title: '市场',
          key: 'market'
        },
        {
          title: '类型',
          key: 'side',
          render: function (h, params) {
            return h('div', this.row.side === 1 ? '买' : '卖');
          }
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '数量',
          key: 'amount'
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
      curData: [
        {
          ctime: '2018-0710 18:21:36',
          market: 'FTUSDT',
          side: 1,
          price: '0.260000',
          amount: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        },
        {
          ctime: '2018-0710 18:21:36',
          market: 'FTUSDT',
          side: 2,
          price: '0.260000',
          amount: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        },
        {
          ctime: '2018-0710 18:21:36',
          market: 'FTUSDT',
          side: 1,
          price: '0.260000',
          amount: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        },
        {
          ctime: '2018-0710 18:21:36',
          market: 'FTUSDT',
          side: 2,
          price: '0.260000',
          amount: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        },
        {
          ctime: '2018-0710 18:21:36',
          market: 'FTUSDT',
          side: 2,
          price: '0.260000',
          amount: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        },
        {
          ctime: '2018-0710 18:21:36',
          market: 'FTUSDT',
          side: 2,
          price: '0.260000',
          amount: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        },
        {
          ctime: '2018-0710 18:21:36',
          market: 'FTUSDT',
          side: 1,
          price: '0.260000',
          amount: '5.35',
          closeRate: '50.3%',
          averPrice: '0.260000',
          opera: '详情'
        }
      ],
      hisData: []
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
      if (type === 'current') {
        this.getCurData();
      } else {
        this.getHisData();
      }
    },
    getCurData () {
      let params = {
        status: 1,
        method: 'active',
        t: new Date().getTime()
      }
      ax.get(config.url.user + '/api/order/lists', {params}).then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          this.curData = res.data.result.data;
          for (let i = 0; i < this.curData.length; i++) {
            this.curData[i].closeRate = this.curData[i].amount_deal / this.curData[i].amount 
          }
        } else {
          this.$Modal.error(res.data.errorMsg);
        }
      });
    },
    getHisData () {
      let params = {
        status: 2,
        method: 'history',
        t: new Date().getTime()
      }
      ax.get(config.url.user + '/api/order/lists', {params}).then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          this.hisData = res.data.result.data;
          for (let i = 0; i < this.hisData.length; i++) {
            this.hisData[i].closeRate = this.hisData[i].amount_deal / this.hisData[i].amount 
          }
        } else {
          this.$Modal.error(res.data.errorMsg);
        }
      });
    }
  },
  created () {
    this.pageHeight = window.innerHeight - 360
    window.addEventListener('resize', this.handleWindowResize)
    this.getCurData();
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
