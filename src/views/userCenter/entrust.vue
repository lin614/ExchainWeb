<template>
  <page>
    <div class="entrust-cont" :style="'minHeight:' + pageHeight + 'px'">
      <div class="content-body-main clearfix">
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
                },
                on: {
                  click: () => {
                    this.cancelOrder(params.row)
                  }
                }
              }, params.row.opera)
            ]);
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
    /**
     * 获取当前委托
     */
    getCurData () {
      let params = {
        status: 1,
        method: 'active',
        t: new Date().getTime()
      }
      ax.get('/api/order/lists', {params}).then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          let data = res.data.result.data;
          for (let i = 0; i < data.length; i++) {
            let amount_deal = parseFloat(data[i].amount_deal);
            let amount = parseFloat(data[i].amount);
            let rate = this.accMul(this.accDiv(amount_deal, amount), 100);
            data[i].closeRate = rate.toFixed(2);
            data[i].opera = '撤单';
            this.curData = data;
          }
        } else {
          this.$Modal.error({ content: res.data.errorMsg });
        }
      });
    },
    /**
     * 获取成交历史
     */
    getHisData () {
      let params = {
        status: 2,
        method: 'history',
        t: new Date().getTime()
      }
      ax.get('/api/order/lists', {params}).then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          let data = res.data.result.data;
          for (let i = 0; i < data.length; i++) {
            let amount_deal = parseFloat(data[i].amount_deal);
            let amount = parseFloat(data[i].amount);
            let rate = this.accMul(this.accDiv(amount_deal, amount), 100);
            data[i].closeRate = rate.toFixed(2);
            data[i].opera = '撤单';
            this.hisData = data;
          }
        } else {
          this.$Modal.error({ content: res.data.errorMsg });
        }
      });
    },
    /**
     * 除法
     * @param {number} arg1 减数
     * @param {number} arg2 被减数
     * @return {number} arg1-arg2 结果
     */
    accDiv (arg1, arg2) {
      let t1=0,t2=0,r1,r2;
      try {
        t1 = arg1.toString().split('.')[1].length
      } catch (e) {}

      try {
        t2 = arg2.toString().split('.')[1].length
      } catch (e) {}

      r1 = Number(arg1.toString().replace('.', ''))
      r2 = Number(arg2.toString().replace('.', ''))
      return (r1 / r2) * Math.pow(10, t2 - t1)
    },
    /**
     * 乘法
     * @param {number} arg1 乘数
     * @param {number} arg2 乘数
     * @return {number} arg1*arg2 结果
     */
    accMul (arg1, arg2) {
      var m=0,s1=arg1.toString(),s2=arg2.toString();
      try {
        m += s1.split('.')[1].length
      } catch (e) {}

      try {
        m += s2.split('.')[1].length
      } catch (e) {}

      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
    },
    /**
     * 取消订单
     * @param {object} row 订单记录
     */
    cancelOrder (row) {
      let params = {
        order_id: row.order_id,
      }
      ax.get('/api/exchange/orderCancel', {params}).then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          this.getCurData();
          this.$Message.success('撤单成功!')
        } else {
          this.$Modal.error({ content: res.data.errorMsg });
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
