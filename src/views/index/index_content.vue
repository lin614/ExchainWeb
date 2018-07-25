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

export default {
  name: 'index_content',
  components: { block, crd },
  data() {
    return {
      col1: [
        {
          title: '交易对',
          key: 'pair'
        },
        {
          title: '最新价格',
          key: 'price'
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
          price: '-',
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-'
        },
        {
          pair: 'ET/ETH',
          price: '-',
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-'
        },
        {
          pair: 'ET/BTC',
          price: '-',
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-'
        },
        {
          pair: 'BTC/USDT',
          price: '-',
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-'
        },
        {
          pair: 'ETH/USDT',
          price: '-',
          p24: '-',
          h24: '-',
          l24: '-',
          v24: '-'
        },
        {
          pair: 'BCH/USDT',
          price: '-',
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
  mounted() {
    var subQuo = pair =>
      ws.postData({
        event: 'sub',
        // channel: 'market.' + pair + '.header'
        channel: 'test'
      })
    subQuo('et_eth')
    bus.$on('wsUpdate', data => {
      console.log(data)
    })
  },
  created() {
    // var ws = new WebSocket(config.url.quote)
    // ws.onopen = function() {
    //   console.log('Connect to: ' + config.url.quote)
    //   var obj = new Object()
    //   obj.event = 'sub'
    //   obj.channel = 'market.et_usdt.header'
    //   var json_str = JSON.stringify(obj)
    //   ws.send(json_str)
    // }
    // ws.onmessage = function(evt) {
    //   console.log('recive: ' + evt.data)
    // }
    // ws.onclose = function(evt) {
    //   console.log('WebSocketClosed!')
    //   evt.close()
    //   ws = new WebSocket(config.url.quote)
    //   console.log('Connect to: ' + config.url.quote)
    //   var obj = new Object()
    //   obj.event = 'sub'
    //   obj.channel = 'market.et_usdt.header'
    //   var json_str = JSON.stringify(obj)
    //   ws.send(json_str)
    // }
    // ws.onerror = function(evt) {
    //   console.log('WebSocketError ' + evt.data)
    //   evt.close()
    //   ws = new WebSocket(url)
    //   console.log('Connect to: ' + config.url.quote)
    //   var obj = new Object()
    //   obj.event = 'sub'
    //   obj.channel = 'market.et_usdt.header'
    //   var json_str = JSON.stringify(obj)
    //   ws.send(json_str)
    // }
    // window.setTimeout(function() {
    //   var obj = new Object()
    //   obj.event = 'req'
    //   obj.channel = 'Heartbeat'
    //   var json_str = JSON.stringify(obj)
    //   ws.send(json_str)
    // }, 60 * 1000)
    // var socket = io(config.url.quote, {
    //   event: 'sub',
    //   channel: ''market.et_usdt.header'
    // })
    // // market.ltc_btc.header
    // socket.on('connect', function() {})
    // socket.on('event', function(data) {
    //   console.log(data)
    // })
    // socket.on('disconnect', function() {})
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
