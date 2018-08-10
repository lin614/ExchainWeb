<template>
  <block class="index_content">
    <div slot="inner">

      <crd potColor="#50b08c">
        <span slot="title">{{ $t('index.markets.mainBoard.title') }}</span>

        <Table size="large" :columns="col1" :data="data1"></Table>
      </crd>

      <crd potColor="#5999e5">
        <span slot="title">
          {{ $t('index.markets.innovationBoard.title') }}
          <Poptip class="poptip-markets" width="300" placement="right" trigger="hover" :title="$t('index.markets.innovationBoard.title')" content="content">
            <Button size="small" shape="circle" icon="information"></Button>
            <div slot="content">
              <div>{{ $t('index.markets.innovationBoard.tip') }}</div>
            </div>
          </Poptip>
        </span>

        <Table size="large" :columns="col1" :data="data2"></Table>
      </crd>

      <crd potColor="#f4c058">
        <span slot="title">
          {{ $t('index.markets.ventureCapitalBoard.title') }}
          <Poptip class="poptip-markets" width="300" placement="right" trigger="hover" :title="$t('index.markets.ventureCapitalBoard.title')" content="content">
            <Button size="small" shape="circle" icon="information"></Button>
            <div slot="content">
              <div>{{ $t('index.markets.ventureCapitalBoard.tip') }}</div>

            </div>
          </Poptip>
        </span>
        <Table size="large" :columns="col1" :data="data3"></Table>
      </crd>
      <crd potColor="#e13737">
        <span slot="title">
          {{ $t('index.markets.angelInvestmentBoard.title') }}
          <Poptip class="poptip-markets" width="300" placement="right" trigger="hover" :title="$t('index.markets.angelInvestmentBoard.title')" content="content">
            <Button size="small" shape="circle" icon="information"></Button>
            <div slot="content">
              <div>{{ $t('index.markets.angelInvestmentBoard.tip') }}</div>
            </div>
          </Poptip>
        </span>
        <Table size="large" :columns="col1" :data="data4"></Table>
      </crd>
    </div>
  </block>
</template>

<script>
import block from '../components/block'
import crd from '../components/crd'
import io from 'socket.io-client'
import config from '../../config/config.js'
import ax from 'axios'
import util from '../../libs/util.js'
export default {
  name: 'index_content',
  components: { block, crd },
  data() {
    var vu = this
    return {
      usdt: 0, //usdt汇率
      col1: [
        {
          title: this.$t('index.markets.rowName.pair'),
          key: 'pair'
        },
        {
          title: this.$t('index.markets.rowName.priceshow'),
          key: 'priceshow',
          width: 250
        },
        {
          title: this.$t('index.markets.rowName.p24'),
          key: 'p24'
        },
        {
          title: this.$t('index.markets.rowName.h24'),
          key: 'h24'
        },
        {
          title: this.$t('index.markets.rowName.l24'),
          key: 'l24'
        },
        {
          title: this.$t('index.markets.rowName.v24'),
          key: 'v24'
        },
        {
          title: this.$t('index.markets.rowName.action'),
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  shape: 'circle',
                  icon: 'arrow-swap'
                  // type: 'primary',
                  // size: 'small'
                },
                style: {
                  //   marginRight: '5px',
                  //   color: 'blue',
                  //   border: ' 1px solid blue'
                },
                on: {
                  click: () => {
                    console.log(params)
                    if (params.row.parm_) {
                      vu.toTrade(params.row.parm_)
                    }
                  }
                }
              })
            ])
          }
        }
      ],
      data1: [
        // {
        //   pair: 'ET/USDT',
        //   price: '0.386837/￥2.56',
        //   p24: '-2.82%',
        //   h24: '0.415474',
        //   l24: '0.380150',
        //   v24: '70836959.04'
        // },
        // {
        //   pair: 'ET/USDT',
        //   price: 0,
        //   p24: '-',
        //   h24: '-',
        //   l24: '-',
        //   v24: '-'
        // },
        // {
        //   pair: 'ET/ETH',
        //   price: 0,
        //   p24: '-',
        //   h24: '-',
        //   l24: '-',
        //   v24: '-'
        // },
        // {
        //   pair: 'ET/BTC',
        //   price: 0,
        //   p24: '-',
        //   h24: '-',
        //   l24: '-',
        //   v24: '-'
        // },
        {
          pair: 'BTC/USDT',
          price: 0,
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-'
        },
        {
          pair: 'ETH/USDT',
          price: 0,
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-'
        },
        {
          pair: 'BCH/USDT',
          price: 0,
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-'
        }
      ],
      data2: [],
      data3: [],
      data4: []
    }
  },
  created() {
    var vu = this
    ax.get(config.url.user+'/api/quotation/getUSDCNY',getHeader).then(res => {
      if (res.status == '200' && res.data.errorCode == 0) {
        vu.usdt = res.data.result
        window.localStorage.setItem('exchange-usdt', vu.usdt)
        console.log('usdt 汇率:' + vu.usdt)
      }
    })
  },
  mounted() {
    var subQuo = pair =>
      ws.postData({
        event: 'sub',
        // channel: 'huobi.market.' + pair + '.trade.detail'
        channel: 'huobi.market.' + pair + '.kline.1min'
        // channel: 'test'
      })
    var list = [...this.data1, ...this.data2, ...this.data3, ...this.data4]
    console.log(list)
    for (var i in list) {
      var arr = list[i].pair.split('/')
      list[i].parm = arr.join('').toLowerCase()
      list[i].parm_ = arr.join('_').toLowerCase()
      console.log(list[i].parm)
      list[i].cur = list[i].pair.split('/')[1]
      //订阅
      console.log('huobi.market.' + list[i].parm + '.kline.1min')
      subQuo(list[i].parm)
    }
    let vu = this
    bus.$on('wsUpdate', data => {
      var info = list.filter(
        // p => 'huobi.market.' + p.parm + '.trade.detail' == data.channel
        p => 'huobi.market.' + p.parm + '.kline.1min' == data.channel
      )[0]
      if (info) {
        info.price = data.data[0][1]

        info.h24 = data.data[0][2]
        info.l24 = data.data[0][3]
        info.p24 = 0 //(data.data[0][4] - data.data[0][1]) / data.data[0][1]
        info.v24 = data.data[0][5]

        var infoCur = list.filter(
          c => info.cur.toLowerCase() + 'usdt' == c.parm
        )[0]
        // console.log(infoCur)
        var money = info.price
        if (info.cur != 'USDT') {
          money *= infoCur ? infoCur.price : 0
        }
        info.money = (money * vu.usdt).toFixed(2)

        info.priceshow = info.price + '/≈' + info.money + '元'
      }
    })

    util.toggleTableHeaderLang(vu.col1, 6, 'index.markets.rowName.', vu)
    bus.$on('langChange', () => {
      util.toggleTableHeaderLang(vu.col1, 6, 'index.markets.rowName.', vu)
    })
  }
}
</script>

<style lang="less">
@import url(../style/config.less);
.index_content {
  .ivu-table-wrapper {
    border: none;
  }
  .ivu-table th {
    background-color: @table-th-color; // transparent; // #f8f8f9;
  }
  .poptip-markets .ivu-poptip-inner {
    white-space: inherit;
  }
}
</style>
