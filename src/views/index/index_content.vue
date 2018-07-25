<template>
  <block class="index_content">
    <div slot="inner">
      <crd potColor="#683c40">
        <span slot="title">主区</span>
        <Table size="large" :columns="col1" :data="data1"></Table>
      </crd>
      <crd potColor="#419aea">
        <span slot="title">
          创新区
          <Poptip placement="right" trigger="hover" title="创新区" content="content">
            <Button size="small" shape="circle" icon="information"></Button>
            <div slot="content">
              <div>创新区数字资产属于新型投资产品，有一定投资风险。<br/> 在投资前，我们希望您能充分了解目标数字资产，<br/> 合理判断您自己的投资能力，并认真做出投资决策。<br/></div>

            </div>
          </Poptip>

        </span>
        <Table size="large" :columns="col1" :data="data2"></Table>
      </crd>
      <crd potColor="#febd3d">
        <span slot="title">
          创投区
          <Poptip placement="right" trigger="hover" title="创投区" content="content">
            <Button size="small" shape="circle" icon="information"></Button>
            <div slot="content">
              <div>相对于创新区的区块链项目，创投区的项目通常处<br/> 于早期阶段，存在极高的不确定性风险，请投资者务<br/> 必审慎评估自身风险承受能力以及投资能力，谨慎投<br/> 资。<br/></div>

            </div>
          </Poptip>
        </span>
        <Table size="large" :columns="col1" :data="data3"></Table>
      </crd>
      <crd potColor="#13b387">
        <span slot="title">
          风投区
          <Poptip placement="right" trigger="hover" title="风投区" content="content">
            <Button size="small" shape="circle" icon="information"></Button>
            <div slot="content">
              <div>风险投资区的数字资产通常处于项目的天使阶段，有<br/> 极高的不确定性风险。请投资者根据自身承担风险能<br/>力慎重投资。<br/></div>

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
export default {
  name: 'index_content',
  components: { block, crd },
  data() {
    return {
      usdt: 0, //usdt汇率
      col1: [
        {
          title: '交易对',
          key: 'pair'
        },
        {
          title: '最新价格',
          key: 'priceshow',
          width: 250
        },
        {
          title: '24h波动',
          key: 'p24'
        },
        {
          title: '24h高点',
          key: 'h24'
        },
        {
          title: '24h低点',
          key: 'l24'
        },
        {
          title: '24h交易量',
          key: 'v24'
        },
        {
          title: '去交易',
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
        {
          pair: 'ET/USDT',
          price: 0,
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-'
        },
        {
          pair: 'ET/ETH',
          price: 0,
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-'
        },
        {
          pair: 'ET/BTC',
          price: 0,
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-'
        },
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
    ax.get(config.url.user + '/api/quotation/getUSDCNY').then(res => {
      if (res.status == '200' && res.data.errorCode == 0) {
        vu.usdt = res.data.result
        console.log('usdt 汇率:' + vu.usdt)
      }
    })
  },
  mounted() {
    var subQuo = pair =>
      ws.postData({
        event: 'sub',
        channel: 'huobi.market.' + pair + '.trade.detail'
        // channel: 'test'
      })
    var list = [...this.data1, ...this.data2, ...this.data3, ...this.data4]
    for (var i in list) {
      list[i].parm = list[i].pair
        .split('/')
        .join('')
        .toLowerCase()
      console.log(list[i].channel)
      list[i].cur = list[i].pair.split('/')[1]
      //订阅
      subQuo(list[i].parm)
    }
    let vu = this
    bus.$on('wsUpdate', data => {
      var info = list.filter(
        p => 'huobi.market.' + p.parm + '.trade.detail' == data.channel
      )[0]

      if (info) {
        info.price = data.data[0][1]
        info.v24 = data.data[0][2]

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
}
</style>
