<template>
  <block class="index_content">
    <div slot="inner">

      <crd potColor="#50b08c">
        <span slot="title">{{ $t('index.markets.mainBoard.title') }}</span>

        <Table size="large" :columns="col1" :data="mainMarketPrice"></Table>
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
import { formatMarketPrecision } from '../../libs/utils/format.js'

let instance = null

export default {
  name: 'index_content',
  components: { block, crd },
  data() {
    var vu = this
    return {
      usdt: 0, //usdt汇率
      col1: [
        {
          title: this.$t('index.markets.rowName.name'),
          key: 'name'
        },
        {
          title: this.$t('index.markets.rowName.close'),
          key: 'closeshow',
          width: 250,
          render: (h, arg) => {
            return h('div', [
              h('span', {}, arg.row.close),
              h(
                'span',
                {
                  style: {
                    fontSize: '12px'
                  }
                },
                arg.row.closeshow
              )
            ])
          }
        },
        {
          title: this.$t('index.markets.rowName.priceChange'),
          key: 'priceChange'
        },
        {
          title: this.$t('index.markets.rowName.high'),
          key: 'high',
          render: function(h, arg) {
            return h(
              'span',
              {},
              formatMarketPrecision(arg.row.high, arg.row.name, 'price', instance) || '-'
            )
          }
        },
        {
          title: this.$t('index.markets.rowName.low'),
          key: 'low',
          render: function(h, arg) {
            return h(
              'span',
              {},
              formatMarketPrecision(arg.row.low, arg.row.name, 'price', instance ) || '-'
            )
          }
        },
        {
          title: this.$t('index.markets.rowName.volume'),
          key: 'volume',
          render: function(h, arg) {
            return h(
              'span',
              {},
              formatMarketPrecision(
                arg.row.volume,
                arg.row.name,
                'amount',
                instance
              ) || '-'
            )
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
                    if (params.row.nameLowerCase) {
                      vu.toTrade(params.row.nameLowerCase)
                    }
                  }
                }
              })
            ])
          }
        }
      ],
      initMainMarketPrice: [],
      mainMarketPrice: [
        {
          name: 'BTC/USDT', // 交易对
          nameLowerCase: 'btc_usdt', // 交易对
          close: '-', // 最新价
          closeshow: '', // 最新价
          priceChange: '-', // 24小时波动
          high: '-', // 最高价
          low: '-', // 最低价
          volume: '-', // 交易量
          LastDayPrice: '' // 昨天收盘价
        },
        {
          name: 'ETH/USDT', // 交易对
          nameLowerCase: 'eth_usdt', // 交易对
          close: '-', // 最新价
          closeshow: '', // 最新价
          priceChange: '-', // 24小时波动
          high: '-', // 最高价
          low: '-', // 最低价
          volume: '-', // 交易量
          LastDayPrice: '' // 昨天收盘价
        },
        {
          name: 'BCH/USDT', // 交易对
          nameLowerCase: 'bch_usdt', // 交易对
          close: '-', // 最新价
          closeshow: '', // 最新价
          priceChange: '-', // 24小时波动
          high: '-', // 最高价
          low: '-', // 最低价
          volume: '-', // 交易量
          LastDayPrice: '' // 昨天收盘价
        },
        {
          name: 'ETH/BTC', // 交易对
          nameLowerCase: 'eth_btc', // 交易对
          close: '-', // 最新价
          closeshow: '', // 最新价
          priceChange: '-', // 24小时波动
          high: '-', // 最高价
          low: '-', // 最低价
          volume: '-', // 交易量
          LastDayPrice: '' // 昨天收盘价
        },
        {
          name: 'BCH/BTC', // 交易对
          nameLowerCase: 'bch_btc', // 交易对
          close: '-', // 最新价
          closeshow: '', // 最新价
          priceChange: '-', // 24小时波动
          high: '-', // 最高价
          low: '-', // 最低价
          volume: '-', // 交易量
          LastDayPrice: '' // 昨天收盘价
        }
      ],
      data2: [],
      data3: [],
      data4: [],
      wsData: [],
      amountPrecision: ''
    }
  },
  computed: {},
  created() {
    instance = this
    var vu = this
    ax
      .get(config.url.user + '/api/quotation/getUSDCNY', getHeader)
      .then(res => {
        if (res.status == '200' && res.data.errorCode == 0) {
          vu.usdt = res.data.result
          window.localStorage.setItem('exchange-usdt', vu.usdt)
          console.log('usdt 汇率:' + vu.usdt)
        } else {
          apiError(vu, res)
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

    for (let i = 0; i < this.mainMarketPrice.length; i++) {
      var arr = this.mainMarketPrice[i].name.split('/')
      this.mainMarketPrice[i].nameLowerCase = arr.join('_').toLowerCase()
    }
    var list = [...this.mainMarketPrice, ...this.data2, ...this.data3, ...this.data4]
    console.log(list)
    for (var i in list) {
      var arr = list[i].name.split('/')
      list[i].parm = arr.join('').toLowerCase()
      list[i].nameLowerCase = arr.join('_').toLowerCase()
      console.log(list[i].parm)
      list[i].cur = list[i].name.split('/')[1]
      //订阅
      console.log('huobi.market.' + list[i].parm + '.kline.1day')
      subQuo(list[i].parm)
    }
    let vu = this
    bus.$on('wsUpdate', data => {
      let info = [
        ...this.mainMarketPrice,
        ...this.data2,
        ...this.data3,
        ...this.data4
      ].filter(p => 'huobi.market.' + p.parm + '.kline.1day' == data.channel)[0]

      if (info) {
        this.wsData.push(data)
        this.calculate(this.wsData)
      }
    })

    util.toggleTableHeaderLang(vu.col1, 6, 'index.markets.rowName.', vu)
    bus.$on('langChange', () => {
      this.calculate(this.wsData)
      util.toggleTableHeaderLang(vu.col1, 6, 'index.markets.rowName.', vu)
    })
  },
  methods: {
    /**
     * 获取主区交易价格
     */
    getMainMarketPrice () {
      ax
        .get(config.url.user + '/api/v1-b/market/price_change?markets=BTC/USDT,ETH/USDT,BCH/USDT,ETH/BTC,BCH/BTC', getHeader)
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            this.initMainMarketPrice = res.data.result;
            let mainMarketPrice = res.data.result;

            // */USDT 交易对的价格
            let usdtArr = [];
            for (var i = 0; i < mainMarketPrice.length; i++) {
              if (mainMarketPrice[i].name.index('/USDT') !== -1) {
                usdtArr[mainMarketPrice[i].name] = mainMarketPrice[i].close;
              }
            }

            // 法币价格
            for (i = 0; i < mainMarketPrice.length; i++) {
              let legalMoney = info.close
              if (mainMarketPrice[i].name.index('/USDT') === -1) {
                legalMoney = legalMoney * usdtArr[mainMarketPrice[i].name]
              }
              let sub = new Decimal(mainMarketPrice[i].close).sub(new Decimal(mainMarketPrice[i].LastDayPrice))
              let wave = new Decimal(sub).div(new Decimal(mainMarketPrice[i].LastDayPrice)).toNumber();
              info.priceChange = wave ? (wave * 100).toFixed(2) + '%' : '-'
            }

            // 非 */USDT 的交易对，价格需转换成美元价格
          
          if (info.cur != 'USDT') {
            legalMoney *= infoCur ? infoCur.price : 1 // 此处的price？
          }

          // 中英文模式价格显示
          // if (this.$t('common.lang') === 'cn') {
          //   legalMoney = parseFloat(legalMoney * vu.usdt).toFixed(2)
          // } else {
          //   legalMoney = parseFloat(legalMoney).toFixed(2)
          // }

          // info.close = formatMarketPrecision(info.close, info.name, 'price', vu)
          // info.closeshow = legalMoney
          //   ? ' ≈ ' + this.$t('common.legalMoney') + legalMoney
          //   : ''
          //   }
          //   // this.mainMarketPrice = ;
          // } else {
          //   apiError(vu, res)
          // }
        });
    },
    // 重新计算各交易对价格信息
    calculate(dataArr) {
      let vu = this
      let info = null
      let data = null
      let list = [...this.mainMarketPrice, ...this.data2, ...this.data3, ...this.data4]

      for (var i = 0; i < dataArr.length; i++) {
        data = dataArr[i]
        info = list.filter(
          // p => 'huobi.market.' + p.parm + '.trade.detail' == data.channel
          p => 'huobi.market.' + p.parm + '.kline.1day' == data.channel
        )[0]

        if (info) {
          info.high = data.data[0][2] ? data.data[0][2] : '-'; // 高
          info.low = data.data[0][3]; //低
          info.close = data.data[0][4] ? data.data[0][4] : '-' // 最新价

          let openPrice = data.data[0][1]; // 开盘价

          let sub = new Decimal(info.close).sub(new Decimal(openPrice))
          let wave = new Decimal(sub).div(new Decimal(openPrice)).toNumber()
          info.priceChange = wave ? (wave * 100).toFixed(2) + '%' : '-'
          info.volume = data.data[0][5] ? data.data[0][5] : '-' // 成交量

          var infoCur = list.filter(
            c => info.cur.toLowerCase() + 'usdt' == c.parm
          )[0]

          // 非 */USDT 的交易对，价格需转换成美元价格
          let legalMoney = info.close
          if (info.cur != 'USDT') {
            legalMoney *= infoCur ? infoCur.price : 1 // 此处的price？
          }

          // 中英文模式价格显示
          if (this.$t('common.lang') === 'cn') {
            legalMoney = parseFloat(legalMoney * vu.usdt).toFixed(2)
          } else {
            legalMoney = parseFloat(legalMoney).toFixed(2)
          }

          info.close = formatMarketPrecision(info.close, info.name, 'price', vu)
          info.closeshow = legalMoney
            ? ' ≈ ' + this.$t('common.legalMoney') + legalMoney
            : ''
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
