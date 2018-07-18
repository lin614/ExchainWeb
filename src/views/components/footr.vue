<template>
    <div class="footr">aaaa
        <block>
            <Row type="flex" justify="center" align="top" class="menu" slot="inner">
                <Col span="7">
                <img src="../../static/imgs/logo.png">
                <p>Copyright © 2018 Exchain</p>
                </Col>
                <Col span="9">

                <Row type="flex" justify="start" align="top">
                    <Col span="8">
                    <h2>服务</h2>
                    </Col>
                    <Col span="8">
                    <h2>条款说明</h2>
                    </Col>
                    <Col span="8">
                    <h2>关于我们</h2>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">交易中心</Col>
                    <Col span="8">
                    <router-link to="/priv">隐私政策</router-link>
                    </Col>
                    <Col span="8">
                    <a target="_blank" href="http://t.me/Exchain_cn">客户支持</a>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <a target="_blank" href="https://support.exchain.com/hc/zh-cn">支持</a>
                    </Col>
                    <Col span="8">
                    <router-link to="/cont">用户协议</router-link>
                    </Col>
                    <Col span="8">
                    <a target="_blank" href="http://t.me/Exchain_cn">联系我们</a>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <a target="_blank" href="https://support.exchain.com/hc/zh-cn/requests/new">提交请求</a>
                    </Col>
                    <Col span="8">
                    <a target="_blank" href="https://support.exchain.com/hc/zh-cn/articles/360006962932-%E4%BA%A4%E6%98%93%E6%89%8B%E7%BB%AD%E8%B4%B9%E8%AF%B4%E6%98%8E">手续费</a>
                    </Col>
                    <Col span="8"></Col>
                </Row>
                </Col>
                <Col span="8">
                <h2>社区</h2>
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
                    <a target="_blank" href='ttps://twitter.com/exchangechain'>
                        <i class=" iconfont icon-twitter"></i>

                    </a>
                    <a target="_blank" href='https://www.facebook.com/Exchain-197510064290691/'>
                        <i class=" iconfont icon-facebook"></i>

                    </a>
                    <a target="_blank" href='https://medium.com/@exchangechain'>
                        <i class=" iconfont icon-medium"></i>

                    </a>
                    <a target="_blank" href='https://t.me/Exchain_cn'>
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

<style>
</style>
