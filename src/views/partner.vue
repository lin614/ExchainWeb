<template>
    <page>
        <div class="partner">
            <block>
                <Card icon="compose" slot="inner">
                    <div class="hd">
                        <div>
                            <img src='../static/imgs/p-1.png'></img>
                            <span>{{ $t('partnerPage.title') }}</span>
                            <img src='../static/imgs/p-1.png'></img>
                        </div>
                    </div>

                    <div class="info">
                        <p>
                            <section>{{ $t('partnerPage.p1') }}</section>
                            <section>{{ $t('partnerPage.p2') }}</section>
                            <section>{{ $t('partnerPage.p3') }}</section>
                            <section>
                                {{ $t('partnerPage.p4') }}
                                <a href="mailto:partner@exchain.com ">partner@exchain.com </a>
                                {{ $t('partnerPage.p5') }}
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
  .hd {
      div {
      position: relative;
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
  }
  .info {
    // padding: 30px;
    // width: 1100px;
    padding: 0 50px 30px 50px;
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


