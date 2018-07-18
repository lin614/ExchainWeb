<template>
    <page>
        <div class="et">
            <block>
                <div class="content" slot="inner">
                    <div class="sec">
                        <h3><hr>什么是ET？<hr></h3>
                        <p>ET是Exchain交易平台本身的权益证明，发行总量恒定100亿，将平均分10年全部发给交易用户和伙伴以及投资者，技术团队，并且永不增发，<br/>Exchain将全部收入分配给ET持有者</p>
                        <img src="../static/imgs/et-t-1.png" id='et' />
                    </div>
                    <div class="sec">
                        <h3>收益分配</h3>
                        <p>Exchain会将全部100%的交易收入分配给ET的持有者。详情请见白皮书。</p>
                        <h3>参与决策</h3>
                        <p>Exchain致力于打造一个共享，自治，全面透明的社区，所有ET持有者可通过民主投票的形式<br/>参与Exchain社区各类决策</p>

                    </div>
                    <div class="sec">
                        <h3>通过“交易即挖矿”获得ET</h3>
                        <p>1, 只要产生交易，即可按交易额占比100%返还ET的方式获取。<br/>2，通过“合作伙伴”模式，通过邀请好友注册并交易的方式获取。</p>
                        <h3>交易购买ET</h3>
                        <p>用户可以通过币币交易的形式，购买并持有ET。</p>

                    </div>
                </div>
            </block>
        </div>
    </page>

</template>

<script>
import page from './components/page'
import block from './components/block'
export default {
  name: 'et',
  components: { page, block }
}
</script>

<style lang="less">
@import url(./style/config.less);
.et {
  background: url(../static/imgs/etbg.png);
  background-position: top -200px center;
  background-repeat: no-repeat;
  // background-size: cover;
  height: 2100px;
  padding-top: 400px;
  .content {
    display: flex;
    align-items: top;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    // padding: 50px;
    // min-height: 400px;
    .sec {
      color: aliceblue;
      margin-bottom: 20px;
      h3 {
        font-size: 24px;
        margin-bottom: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        hr {
          display: inline-block;
          width: 80px;
          margin-right: 10px;
          margin-left: 10px;
          background: linear-gradient(red, blue);
        }
      }
      p {
        line-height: 30px;
        margin-bottom: 100px;
      }
    }
    #et {
      width: 500px;
    }
  }
}
</style>


