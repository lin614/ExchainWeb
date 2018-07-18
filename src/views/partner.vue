<template>
    <page>
        <div class="partner">
            <block>
                <Card icon="compose" slot="inner">
                    <div class="info">
                        <div>
                            <img src='../static/imgs/p-1.png'></img>
                            <span>Exchain超级伙伴合作计划开启 打造交易共赢心时代
                            </span><img src='../static/imgs/p-1.png'></img>
                        </div>
                        <p>
                            <section>
                                Exchain 数字货币交易所即将上线，平台采用交易即挖矿模式，用户Exchain交易即可获得交易量的平台币奖励，即日起，Exchain开启“超级合作伙伴”计划。
                            </section>
                            <section>
                                每一位Exchain交易所的用户只需邀请新用户到交易所进行交易，就可以成为“普通合作伙伴”，普通合作伙伴可获得交易所的平台币奖励，同时还能获得收入分成。
                            </section>
                            <section>
                                普通合作伙伴成功邀请50个新用户到交易所进行交易，即可成为“超级合作伙伴”，除了享有普通合作伙伴的平台币奖励和收入分成以外，还能获得一定数额的现金回馈，邀请越多奖励越大。
                            </section>
                            <section>
                                如有意向成为Exchain的超级合作伙伴，请发邮件至
                                <a href="mailto:partner@exchain.com ">partner@exchain.com </a>获取相关信息
                            </section>
                        </p>
                    </div>
                </Card>
            </block>
        </div>
    </page>

</template>

<script>
import page from './components/page'
import block from './components/block'
export default {
  name: 'partner',
  components: { page, block }
}
</script>

<style lang="less">
@import url(./style/config.less);
.partner {
  background: url(../static/imgs/pbg.png);
  background-position: top -50px center;
  background-repeat: no-repeat;
  //   background-size: cover;
  height: 1100px;
  padding-top: 500px;
  .info {
    // padding: 30px;
    // width: 1100px;
    padding: 0 50px 30px 50px;
    div {
      text-align: center;
      line-height: @font-title*6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: @font-title;
      font-weight: bold;
      img {
        width: @font-title*1.2;
        height: @font-title*1.2;
        margin: 5px;
      }
    }
    p {
      font-size: @font-text*1.1;
    }
    section {
      line-height: @font-text*2;
      padding-bottom: @font-text*2;
    }
  }
}
</style>


