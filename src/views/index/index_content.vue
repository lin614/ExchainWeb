<template>
  <block class="index_content">
    <div slot="inner">

      <crd potColor="#50b08c">
        <span slot="title">{{ $t('index.markets.mainBoard.title') }}</span>

        <Table size="large" :columns="col1" :data="mainMarket"></Table>
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

        <Table size="large" :columns="col1" :data="invMarket"></Table>
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
        <Table size="large" :columns="col1" :data="vcMarket"></Table>
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
        <Table size="large" :columns="col1" :data="gemMarket"></Table>
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
          key: 'close',
          width: 250,
          render: (h, arg) => {
            return h('div', [
              h('span', {}, formatMarketPrecision(arg.row.close, arg.row.name, 'price', instance) || '-'),
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
                    // console.log(params)
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
      // initmainMarket: [],
      invMarket: [],
      vcMarket: [],
      mainMarket: [
        // {
        //   name: 'BTC/USDT', // 交易对
        //   parm: 'btcusdt', // 交易对
        //   parm_: 'btc_usdt', // 交易对
        //   close: '-', // 最新价
        //   closeshow: '', // 最新价
        //   priceChange: '-', // 24小时波动
        //   high: '-', // 最高价
        //   low: '-', // 最低价
        //   volume: '-', // 交易量
        //   LastDayPrice: '' // 昨天收盘价
        // },
        // {
        //   name: 'ETH/USDT', // 交易对
        //   parm: 'ethusdt', // 交易对
        //   parm_: 'eth_usdt', // 交易对
        //   close: '-', // 最新价
        //   closeshow: '', // 最新价
        //   priceChange: '-', // 24小时波动
        //   high: '-', // 最高价
        //   low: '-', // 最低价
        //   volume: '-', // 交易量
        //   LastDayPrice: '' // 昨天收盘价
        // },
        // {
        //   name: 'BCH/USDT', // 交易对
        //   parm: 'bchusdt', // 交易对
        //   parm_: 'bch_usdt', // 交易对
        //   close: '-', // 最新价
        //   closeshow: '', // 最新价
        //   priceChange: '-', // 24小时波动
        //   high: '-', // 最高价
        //   low: '-', // 最低价
        //   volume: '-', // 交易量
        //   LastDayPrice: '' // 昨天收盘价
        // },
        // {
        //   name: 'ETH/BTC', // 交易对
        //   parm: 'ethbtc', // 交易对
        //   parm_: 'eth_btc', // 交易对
        //   close: '-', // 最新价
        //   closeshow: '', // 最新价
        //   priceChange: '-', // 24小时波动
        //   high: '-', // 最高价
        //   low: '-', // 最低价
        //   volume: '-', // 交易量
        //   LastDayPrice: '' // 昨天收盘价
        // },
        // {
        //   name: 'BCH/BTC', // 交易对
        //   parm: 'bchbtc', // 交易对
        //   parm_: 'bch_btc', // 交易对
        //   close: '-', // 最新价
        //   closeshow: '', // 最新价
        //   priceChange: '-', // 24小时波动
        //   high: '-', // 最高价
        //   low: '-', // 最低价
        //   volume: '-', // 交易量
        //   LastDayPrice: '' // 昨天收盘价
        // }
      ],
      vcMarket: [],
      gemMarket: [],
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
    this.getMainMarket();
      
    

        // 接收推送
    bus.$on('wsUpdate', data => {
      let info = [
        ...this.mainMarket,
        ...this.invMarket,
        ...this.vcMarket,
        ...this.gemMarket
      ].filter(p => 'huobi.market.' + p.parm + '.kline.1day' == data.channel)[0]

      if (info) {
        console.log('111111111', data);
        this.wsData.push(data)
        this.calculate(this.wsData)
      }
    })

   
    // 中英文
    bus.$on('langChange', () => {
      this.calculate(this.wsData)
      util.toggleTableHeaderLang(this.col1, 6, 'index.markets.rowName.', this)
    })
  },
  destroyed () {
    bus.$off('langChange');
  },
  methods: {
    /**
     * 订阅队列
     */
    subQuo (pair) {
      ws.postData({
        event: 'sub',
        // channel: 'test'
        // channel: 'huobi.market.' + pair + '.trade.detail'
        channel: 'huobi.market.' + pair + '.kline.1day'
      })
    },

    /**
     * 获取主区交易价格
     */
    getMainMarket () {
      ax
        .get(config.url.user + '/api/v1-b/market/price_change?markets=BTC/USDT,ETH/USDT,BCH/USDT,ETH/BTC,BCH/BTC', getHeader)
        .then(res => {
          if (res.status == '200' && res.data.errorCode == 0) {
            let resData = res.data.result;

            // USDT 交易对的价格
            let usdtArr = [];
            for (var i = 0; i < resData.length; i++) {
              if (resData[i].name.indexOf('/USDT') !== -1) {
                usdtArr[resData[i].name] = resData[i].close;
              }
            }

            // mainMarket
            for (i = 0; i < resData.length; i++) {
              // 增加字段
              let arr = resData[i].name.split('/');
              resData[i].parm = arr.join('').toLowerCase() // 类似btcusdt
              resData[i].parm_ = arr.join('_').toLowerCase() // 类似btc_usdt

              // 价格波动
              // let sub = new Decimal(resData[i].close).sub(new Decimal(resData[i].LastDayPrice))
              // let wave = new Decimal(sub).div(new Decimal(resData[i].LastDayPrice)).toNumber();
              // resData[i].priceChange = wave ? (wave * 100).toFixed(2) + '%' : '-';
              resData[i].priceChange = (resData[i].priceChange * 100).toFixed(2) + '%';

              // 法币计算
              // 非 [*/USDT] 的交易对，转换成按USDT计价
              let legalMoney = resData[i].close
              if (resData[i].name.split('/')[1] !== 'USDT') {
                legalMoney = legalMoney * usdtArr[resData[i].name.split('/')[1] + '/USDT'];
              }

              // 中英文模式价格显示
              if (this.$t('common.lang') === 'cn') {
                legalMoney = parseFloat(legalMoney * this.usdt).toFixed(2)
              } else {
                legalMoney = parseFloat(legalMoney).toFixed(2)
              }

              // 对应法币价格
              resData[i].closeshow = legalMoney ? ' ≈ ' + this.$t('common.legalMoney') + legalMoney : ''
            }

            for (var i = 0; i < resData.length; i++) {
              debugger
              // 主区
              if (resData[i].domain === 'main') {
                this.mainMarket.push(resData[i]);
              } else if (resData[i].domain === 'inv') {
                // 创新
                this.invMarket.push(resData[i]);
              } else if (resData[i].domain === 'vc') {
                // 风投
                this.vcMarket.push(resData[i]);
              } else if (resData[i].domain === 'gem') {
                // 天使轮
                this.gemMarket.push(resData[i]);
              }
            }

            //订阅
            var allMarket = [...this.mainMarket, ...this.invMarket, ...this.vcMarket, ...this.gemMarket]
            for (var i in allMarket) {
              this.subQuo(allMarket[i].parm)
            }

            
          } else {
            apiError(this, res)
          }
        });
    },

    /**
     * 重新计算各交易对价格信息
     */
    calculate(dataArr) {
      let info = null
      let market = null
      let allMarket = [...this.mainMarket, ...this.invMarket, ...this.vcMarket, ...this.gemMarket]
      
      // USDT 交易对的价格
      let usdtArr = [];
      for (var i = 0; i < allMarket.length; i++) {
        if (allMarket[i].name.indexOf('/USDT') !== -1) {
          usdtArr[allMarket[i].name] = allMarket[i].close;
        }
      }

      for (var i = 0; i < dataArr.length; i++) {
        market = dataArr[i]

        info = allMarket.filter(
          // p => 'huobi.market.' + p.parm + '.trade.detail' == data.channel
          p => 'huobi.market.' + p.parm + '.kline.1day' == market.channel
        )[0]

        if (info) {
          info.high = market.data[0][2] ? market.data[0][2] : '-'; // 高
          info.low = market.data[0][3]; //低
          info.close = market.data[0][4] ? market.data[0][4] : '-' // 最新价
          info.volume = market.data[0][5] ? market.data[0][5] : '-' // 成交量
          info.LastDayPrice = market.data[0][1]; // 昨天收盘价

          // 24h波动
          let sub = new Decimal(info.close).sub(new Decimal(info.LastDayPrice))
          let wave = new Decimal(sub).div(new Decimal(info.LastDayPrice)).toNumber()
          info.priceChange = wave ? (wave * 100).toFixed(2) + '%' : '-'
          // info.priceChange = (info.priceChange * 100).toFixed(2) + '%';

          // 法币计算
          // 非 [*/USDT] 的交易对，转换成按USDT计价
          let legalMoney = info.close
          if (info.name.split('/')[1] !== 'USDT') {
            legalMoney = legalMoney * usdtArr[info.name.split('/')[1] + '/USDT'];
          }

          // 中英文模式价格显示
          if (this.$t('common.lang') === 'cn') {
            legalMoney = parseFloat(legalMoney * this.usdt).toFixed(2)
          } else {
            legalMoney = parseFloat(legalMoney).toFixed(2)
          }

          // 对应法币价格
          info.closeshow = legalMoney ? ' ≈ ' + this.$t('common.legalMoney') + legalMoney : ''
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
