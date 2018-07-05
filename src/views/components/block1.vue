<template>
    <div class="block1">
        <div class="info">
            <h2>收入与合作伙伴共享，收益与交易货币共享</h2>
            <hr/>
            <p>Exchain是全球首家共享型交易平台，不仅将合作交易费的50%支付给<br/>超级合伙伙伴，还将交易平台100%的收入每日分配给Exchain Token（ET）持有者，<br/>全免费交易计时开始。</p>
        </div>
        <div class="fee">
            <Row>
                <Col span="8">
                <div class="sec border-left">
                    <p>
                        <span class="fee_info">昨日待分配收入累积折合：</span>
                        <span class="fee_num">
                            <Icon type="social-bitcoin"></Icon>0</span>
                    </p>
                    <p class="pad1-3">
                        <span class="fee_info">昨日合伙人待分配收入：</span>
                        <span class="fee_num">
                            [查看合伙人模式说明]</span>
                    </p>
                    <p>
                        <span class="fee_info">ET总流通量：</span>
                        <span class="fee_num">
                            [查看ET释放说明]</span>
                    </p>
                </div>
                </Col>
                <Col span="8">
                <div class="sec border-left border-right ">
                    <p>
                        <span class="fee_info">今日待分配收入累积折合：</span>

                    </p>
                    <p class="pad1-3">
                        <span class="fee_num2">
                            <Icon type="social-bitcoin"></Icon>0</span>
                    </p>
                    <p>
                        <span class="fee_info">其中合伙人模式待分配收入：</span>
                        <span class="fee_num">
                            <Icon type="social-bitcoin"></Icon>0</span>
                    </p>
                </div>
                </Col>
                <Col span="8">
                <div class="sec border-right">
                    <p>
                        <span class="fee_info">新闻：</span>
                    </p>
                    <p>
                        <span class="fee_num">
                            张建在团队博客发文【引入“交易即挖矿”机制，创造一个符合中本聪初心的比特币】</span>
                    </p>

                </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
  name: 'block1',
  mounted() {}
}
</script>
<style lang="less" scoped>
@color: aliceblue;
@fontsize: 1em;
.block1 {
  width: 1200px;
  margin: 0 auto;
  height: 700px;
  text-align: left;
  background: url(../../static/imgs/banner-bg.png);
  font-size: @fontsize;
}
.info h2 {
  padding-top: 76px;
  font-size: @fontsize+1em;
  color: @color;
  line-height: @fontsize+1em;
  font-weight: normal;
}
.info hr {
  border: none;
  height: 2px;
  color: @color;
  background-color: @color;
  width: 80px;
  margin-top: 10px;
}
.info p {
  margin-top: 26px;
  line-height: @fontsize+1em;
  color: @color;
}
.fee {
  margin-top: 100px;
}
.fee .sec {
  padding: 0 20px;
  line-height: 2.5em;
}
.fee .pad1-3 {
  //   padding: 1em 0;
  //   line-height: 3em;
}
.fee .fee_info {
  color: darkgrey;
  font-size: @fontsize -1;
  //   line-height: @fontsize+2;
}
.fee .fee_num {
  color: rgb(155, 155, 243);
  font-size: @fontsize;
}
.fee .fee_num2 {
  color: rgb(155, 155, 243);
  font-size: @fontsize*2;
}
.fee .border-left {
  border-left: 1px solid #444444;
}
.fee .border-right {
  border-right: 1px solid #444444;
}
</style>


