<template>
    <div class="footr">
        <block>
            <Row type="flex" justify="center" align="top" class="menu" slot="inner">
                <Col span="7">
                    <img src="../../static/imgs/logo.png"><p>{{ $t('footer.copyright') }}</p>
                </Col>

                <Col span="9">
                    <Row type="flex" justify="start" align="top">
                        <Col span="8"><h2>{{ $t("footer.services.services") }}</h2></Col>
                        <Col span="8"><h2>{{ $t("footer.clauseInstruction.clauseInstruction") }}</h2></Col>
                        <Col span="8"><h2>{{ $t("footer.aboutUs.aboutUs") }}</h2></Col>
                    </Row>

                    <Row>
                        <Col span="8"><a target="_blank" @click="toTrade()">{{ $t("footer.services.exchange") }}</a></Col>
                        <Col span="8"><router-link to="/priv">{{ $t("footer.clauseInstruction.privacyPolicy") }}</router-link></Col>
                        <Col span="8"><a target="_blank" v-bind:href='$t("footer.link.tme")'>{{ $t("footer.aboutUs.customerSupport") }}</a></Col>
                    </Row>

                    <Row>
                        <Col span="8"><a target="_blank" :href="$t('common.lang') === 'cn' ? 'https://support.exchain.com/hc/zh-cn' : 'https://support.exchain.com/hc/en-us'">{{ $t("footer.services.support") }}</a></Col>
                        <Col span="8"><router-link to="/cont">{{ $t("footer.clauseInstruction.serAgreement") }}</router-link></Col>
                        <Col span="8"><a target="_blank" v-bind:href='$t("footer.link.tme")'>{{ $t("footer.aboutUs.contactUs") }}</a></Col>
                    </Row>

                    <Row>
                        <Col span="8"><a target="_blank"  :href="$t('common.lang') === 'cn' ? 'https://support.exchain.com/hc/zh-cn/requests/new' : 'https://support.exchain.com/hc/en-us/requests/new'">{{ $t("footer.services.feedback") }}</a></Col>
                        <Col span="8"><a target="_blank" :href="$t('common.lang') === 'cn' ? 'https://support.exchain.com/hc/zh-cn/articles/360006962932' : 'https://support.exchain.com/hc/en-us/articles/360006962932'">{{ $t("footer.clauseInstruction.fees") }}</a></Col>
                        <Col span="8"></Col>
                    </Row>

                    <Row>
                        <Col span="8"><a target="_blank" href="https://docs.google.com/forms/d/1beEwbj80Bi7HzrJzAADzWDdaHLVfutJtg_x_lmmvPiw/edit?ts=5b602bfe">{{ $t("footer.services.listingApplication") }}</a></Col>
                        <Col span="8"></Col>
                        <Col span="8"></Col>
                    </Row>
                </Col>

                <Col span="8">
                    <h2>{{ $t("footer.social") }}</h2>
                    <p class="social">
                        <Poptip trigger="hover" :style="{ minWidth:0}">
                            <i class=" iconfont icon-weixin"></i>
                            <div slot="content">
                                <img src='../../static/imgs/wx.png' style="width:120px;height:120px" />
                            </div>
                        </Poptip>
                        <!-- <Poptip trigger="hover" :style="{ minWidth:0}">
                            <a target="_blank" href='https://medium.com/@exchangechain'>
                                <i class=" iconfont icon-medium"></i>
                            </a>
                            <div slot="content">
                                <qrcode-vue value="https://medium.com/@exchangechain" size="120" level="H" background="white" foreground="navy"></qrcode-vue>
                            </div>
                        </Poptip> -->
                        <!-- <Poptip trigger="hover" :style="{ minWidth:0}">
                            <a target="_blank" href='https://t.me/Exchangechain_cn'>
                                <i class=" iconfont icon-telegram"></i>
                            </a>
                            <div slot="content">
                                <qrcode-vue value="https://t.me/Exchangechain_cn" size="120" level="H" background="white" foreground="navy"></qrcode-vue>
                            </div>
                        </Poptip> -->
                        <a target="_blank" href='https://twitter.com/exchangechain'>
                            <i class=" iconfont icon-twitter"></i>
                        </a>
                        <a target="_blank" href='https://www.facebook.com/Exchain-197510064290691/'>
                            <i class=" iconfont icon-facebook"></i>
                        </a>
                        <a target="_blank" href='https://medium.com/@exchangechain'>
                            <i class=" iconfont icon-medium"></i>
                        </a>
                        <a target="_blank" v-bind:href='$t("footer.link.tme")'>
                            <i class=" iconfont icon-telegram"></i>
                        </a>
                    </p>
                    <!-- <p>
                        <img src="../../static/imgs/wx.png" id="wx" alt="微信公众号" />
                    </p> -->
                </Col>
            </Row>
        </block>
    </div>
</template>

<script>
import block from './block'
export default {
  name: 'footr',
  components: { block }
}
</script>

<style lang="less">
@import url(../style/config.less);
.footr {
  background: black;
  height: 280px;
  padding-top: 70px;
  a {
    color: @footer-font-menu-color;
  }
  h2 {
    color: aliceblue;
    font-size: @footer-font-menu;
  }
  img {
    height: 35px;
    vertical-align: middle;
    margin-bottom: 1em;
  }
  .menu {
    line-height: 40px;
    font-size: @font-text;
  }
  .social i {
    font-size: 2em;
    color: gray;
    margin-top: 1em;
    margin-right: 1em;
    &:hover {
      color: aliceblue;
    }
  }
  #wx {
    width: 100px;
    height: 100px;
  }
  .ivu-poptip-popper {
    min-width: 0px;
  }
  .ivu-poptip-body {
    padding: 5px !important;
  }
}
</style>
