<template>
  <block class="index_content">
    <div slot="inner">

      <crd potColor="#50b08c">
        <span slot="title">{{ $t('index.markets.mainBoard.title') }}</span>

        <Table size="large" :columns="col1" :data="data1"></Table>
      </crd>

      <!-- <crd potColor="#5999e5">
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
      </crd> -->

      <!-- <crd potColor="#f4c058">
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
      </crd> -->
      <!-- <crd potColor="#e13737">
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
      </crd> -->
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
import { Decimal } from 'decimal.js'
import { formatMarketPrecision } from '../../libs/utils/format.js';

let instance = null;

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
          width: 250,
          render: (h, arg) => {
            return h('div', [
              h('span', {}, arg.row.price),
              h('span', {
                style: {
                  fontSize: '12px'
                },
              }, arg.row.priceshow)
          ])}
        },
        {
          title: this.$t('index.markets.rowName.p24'),
          key: 'p24'
        },
        {
          title: this.$t('index.markets.rowName.h24'),
          key: 'h24',
          render: function(h, arg) {
            return h('span', {}, formatMarketPrecision(arg.row.h24, arg.row.pair, 'price', instance) || '-')
          }
        },
        {
          title: this.$t('index.markets.rowName.l24'),
          key: 'l24',
          render: function(h, arg) {
            return h('span', {}, formatMarketPrecision(arg.row.l24, arg.row.pair, 'price', instance) || '-')
          }
        },
        {
          title: this.$t('index.markets.rowName.v24'),
          key: 'v24',
          render: function(h, arg) {
            return h('span', {}, formatMarketPrecision(arg.row.v24, arg.row.pair, 'amount', instance) || '-')
          }
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
          price: '-',
          priceshow: '',
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-',
          parm_: 'btc_usdt'
        },
        {
          pair: 'ETH/USDT',
          price: '-',
          priceshow: '',
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-',
          parm_: 'eth_usdt'
        },
        {
          pair: 'BCH/USDT',
          price: '-',
          priceshow: '',
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-',
          parm_: 'bch_usdt'
        },
        {
          pair: 'ETH/BTC',
          price: '-',
          priceshow: '',
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-',
          parm_: 'eth_btc'
        },
        {
          pair: 'BCH/BTC',
          price: '-',
          priceshow: '',
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-',
          parm_: 'bch_btc'
        }
      ],
      data2: [],
      data3: [],
      data4: [],
      wsData: [],
      amountPrecision: '',
    }
  },
  computed: {
  },
  created() {
    instance = this;
    var vu = this
    ax
      .get(config.url.user + '/api/quotation/getUSDCNY', getHeader)
      .then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          vu.usdt = res.data.result
          window.localStorage.setItem('exchange-usdt', vu.usdt)
          console.log('usdt 汇率:' + vu.usdt)
        } else {
          apiError(vu, res);
        }
      })
  },
  mounted() {
    var subQuo = pair =>
      ws.postData({
        event: 'sub',
        // channel: 'huobi.market.' + pair + '.trade.detail'
        channel: 'huobi.market.' + pair + '.kline.1day'
        // channel: 'test'
      })
      
    for (let i = 0; i < this.data1.length; i++) {
      var arr = this.data1[i].pair.split('/')
      this.data1[i].parm_ = arr.join('_').toLowerCase()
    }
    var list = [...this.data1, ...this.data2, ...this.data3, ...this.data4]
    console.log(list)
    for (var i in list) {
      var arr = list[i].pair.split('/')
      list[i].parm = arr.join('').toLowerCase()
      list[i].parm_ = arr.join('_').toLowerCase()
      console.log(list[i].parm)
      list[i].cur = list[i].pair.split('/')[1]
      //订阅
      console.log('huobi.market.' + list[i].parm + '.kline.1day')
      subQuo(list[i].parm)
    }
    let vu = this
    bus.$on('wsUpdate', data => {
      let info = [...this.data1, ...this.data2, ...this.data3, ...this.data4].filter(
        p => 'huobi.market.' + p.parm + '.kline.1day' == data.channel
      )[0];

      if (info) {
        this.wsData.push(data);
        this.calculate(this.wsData);
      }
    })

    util.toggleTableHeaderLang(vu.col1, 6, 'index.markets.rowName.', vu)
    bus.$on('langChange', () => {
      this.calculate(this.wsData);
      util.toggleTableHeaderLang(vu.col1, 6, 'index.markets.rowName.', vu)
    })
  },
  methods: {
    // 重新计算各交易对价格信息
    calculate (dataArr) {
      let vu = this;
      let info = null;
      let data = null;
      let list = [...this.data1, ...this.data2, ...this.data3, ...this.data4];

      for (var i = 0; i < dataArr.length; i++) {
        data = dataArr[i];
        info = list.filter(
          // p => 'huobi.market.' + p.parm + '.trade.detail' == data.channel
          p => 'huobi.market.' + p.parm + '.kline.1day' == data.channel
        )[0]

        if (info) {
          info.l24 = data.data[0][4]
          info.h24 = data.data[0][2] ? data.data[0][2] : '-'
          info.price = data.data[0][4] ? data.data[0][4] : '-'

          let sub = new Decimal(info.h24).sub(new Decimal(info.l24));
          let wave = new Decimal(sub).div(new Decimal(info.l24)).toNumber();
          info.p24 = wave ? ((wave * 100).toFixed(2) + '%') : '-' ;
          info.v24 = data.data[0][5] ? data.data[0][5] : '-' // 成交量

          var infoCur = list.filter(
            c => info.cur.toLowerCase() + 'usdt' == c.parm
          )[0]

          // 非 */USDT 的交易对，价格需转换成美元价格
          let legalMoney = info.price
          if (info.cur != 'USDT') {
            legalMoney *= infoCur ? infoCur.price : 1
          }

          // 中英文模式价格显示
          if (this.$t('common.lang') === 'cn') {
            legalMoney = parseFloat(legalMoney * vu.usdt).toFixed(2)
          } else {
            legalMoney = parseFloat(legalMoney).toFixed(2)
          }

          info.price = formatMarketPrecision(info.price, info.pair, 'price', vu);
          info.priceshow = ' ≈ ' + this.$t('common.legalMoney') + legalMoney;
        }
      }
    }
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
