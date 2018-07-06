<template>
    <div class="block2">
        <div class="cards">
            <Row type="flex" justify="space-between" :gutter="16">
                <Col span="8">
                <Card>
                    <ul slot="title" style="height:85px">
                        <li>
                            第一条通告
                        </li>
                        <li>
                            第二条通告
                        </li>
                    </ul>
                </Card>
                </Col>
                <Col span="8">
                <Card :bordered="true">
                    <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                </Card>
                </Col>
                <Col span="8">
                <Card :bordered="true">
                    <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                </Card>
                </Col>
            </Row>

        </div>
        <div class="tbs">
            <Card :padding="0">
                <div slot="title" class="tbs_head">
                    <div class="linepot1" />
                    <span class="title">
                        主区
                    </span>
                </div>

                <Table size="large" :columns="col1" :data="data1"></Table>
            </Card>
            <Card :padding="0" class="region">
                <div slot="title" class="tbs_head">
                    <div class="linepot2" />
                    <span class="title">
                        创新区
                        <Poptip placement="right" trigger="hover" title="创新区" content="content">
                            <Button size="small" shape="circle" icon="information"></Button>
                            <div slot="content">
                                <div>创新区数字资产属于新型投资产品，价格波动较大，<br/> 投资风险较大。在投资前，我们希望您能充分了解<br/> 目标数字资产， 合理判断您自己的投资能力， 并认<br/>真做出投资决策。<br/></div>
                            </div>
                        </Poptip>

                    </span>
                </div>

                <Table size="large" :columns="col1" :data="data1"></Table>
            </Card>
            <Card :padding="0" class="region">
                <div slot="title" class="tbs_head">
                    <div class="linepot3" />
                    <span class="title">
                        创投区
                        <Poptip placement="right" trigger="hover" title="创投区" content="content">
                            <Button size="small" shape="circle" icon="information"></Button>
                            <div slot="content">
                                <div>相对于创新区的区块链项目，创投区的项目通常处<br/> 于早期阶段，存在极高的不确定性风险，请投资者务<br/> 目标数字资产， 合理判断您自己的投资能力， 并认<br/>投资。<br/></div>
                            </div>
                        </Poptip>
                    </span>
                </div>

                <Table size="large" :columns="col1" :data="data1"></Table>
            </Card>
            <Card :padding="0" class="region">
                <div slot="title" class="tbs_head">
                    <div class="linepot4" />
                    <span class="title">
                        ST区
                        <Poptip placement="right" trigger="hover" title="ST区" content="content">
                            <Button size="small" shape="circle" icon="information"></Button>
                            <div slot="content">
                                <div>任何区块链项目产生重大风险事故，将会移入ST区。<br/> 如5天之内未做任何整改，将会做退市处理。<br/></div>
                            </div>
                        </Poptip>
                    </span>
                </div>

                <Table size="large" :columns="col1" :data="data1"></Table>
            </Card>
        </div>
    </div>
</template>

<script>
export default {
  name: 'block2',
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
        {
          pair: 'ET/USDT',
          price: '0.386837/￥2.56',
          p24: '-2.82%',
          h24: '0.415474',
          l24: '0.380150',
          v24: '70836959.04'
        },
        {
          pair: 'ET/ETH',
          price: '0.386837/￥2.56',
          p24: '-2.82%',
          h24: '0.415474',
          l24: '0.380150',
          v24: '70836959.04'
        },
        {
          pair: 'ET/BTC',
          price: '0.386837/￥2.56',
          p24: '-2.82%',
          h24: '0.415474',
          l24: '0.380150',
          v24: '70836959.04'
        },
        {
          pair: 'BTC/USDT',
          price: '0.386837/￥2.56',
          p24: '-2.82%',
          h24: '0.415474',
          l24: '0.380150',
          v24: '70836959.04'
        },
        {
          pair: 'ETH/USDT',
          price: '0.386837/￥2.56',
          p24: '-2.82%',
          h24: '0.415474',
          l24: '0.380150',
          v24: '70836959.04'
        },
        {
          pair: 'BCH/USDT',
          price: '0.386837/￥2.56',
          p24: '-2.82%',
          h24: '0.415474',
          l24: '0.380150',
          v24: '70836959.04'
        }
      ]
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
@fontsize: 1em;
.block2 {
  background: transparent;
  min-height: 600px;
  width: 1200px;
  margin: 0 auto;
  height: 700px;
  text-align: left;
  font-size: @fontsize;
}
.ivu-card {
  border-radius: 0px;
  min-height: 150px;
  //   background:
}
.block2 .tbs_head {
  display: flex;
  height: 60px;
  text-align: left;
  align-items: center;
  justify-content: flex-start;
}
.ivu-card-body {
  padding: 0;
}
.tbs {
  margin-top: @fontsize;
}
.tbs .region {
  margin-top: @fontsize;
}
.region:last-of-type {
  margin-bottom: @fontsize*2;
}
.tbs .title {
  font-size: @fontsize*2;
  //   font-weight: bold;
  margin-left: @fontsize;
}
.linepot(@color) {
  width: 5px;
  height: @fontsize*2;
  margin-left: -16px;
  //   display: inline-block;
  background-color: @color;
}
.linepot1 {
  .linepot(#13b387);
}
.linepot2 {
  .linepot(#419aea);
}
.linepot3 {
  .linepot(#febd3d);
}
.linepot4 {
  .linepot(#683c40);
}
.ivu-table-wrapper {
  border: none;
}
</style>


