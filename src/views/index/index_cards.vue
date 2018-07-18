<template>
    <block>
        <Row type="flex" justify="space-between" :gutter="16" slot="inner">
            <Col span="8">
            <crd2 potColor="#439aea">
                <span slot="p1">当日总成交额</span>
                <span slot="p2">
                    <Icon type="social-bitcoin"></Icon>&nbsp {{valume}}</span>
                <span slot="p3">&nbsp</span>
            </crd2>
            </Col>

            <Col span="8">
            <crd2 potColor="#13b385">
                <p slot="p1">ET总市值</p>
                <p slot="p2">
                    <Icon type="social-bitcoin"></Icon>&nbsp {{etvalue}}</p>
                <p slot="p3">ET总流通量
                    <span>
                        {{etnum}}
                    </span>
                </p>
            </crd2>
            </Col>
            <Col span="8">
            <crd2 potColor="#f5162b">
                <p slot="p1">限时免费期</p>
                <p slot="p2">
                    90 天</p>
                <p slot="p3">&nbsp</p>
            </crd2>
            </Col>
        </Row>

    </block>
</template>

<script>
import block from '../components/block'
import crd2 from '../components/crd2'
import ax from 'axios'
import config from '../../config/config.js'
export default {
  name: 'index_cards',
  components: { block, crd2 },
  data() {
    return {
      valume: '0', // 当日总成交额
      etvalue: '0', //ET总市值
      etnum: '0' //ET总流通量
    }
  },
  created() {
    //当日交易额
    ax.get(config.url.fee + '/api/exet/stats/dengesAmount').then(res => {
      if (res.status == 200 && res.data.meta.code == '0') {
        // console.log(res)
        this.valume = res.data.data.dengesAmount
      }
    })
    //ET总市值
    ax.get(config.url.fee + '/api/exet/stats/etStandardCirculate').then(res => {
      if (res.status == 200 && res.data.meta.code == '0') {
        // console.log(res)
        this.etvalue = res.data.data.etCirculate
      }
    })
    //et总流通量
    ax.get(config.url.fee + '/api/exet/stats/etCirculate').then(res => {
      if (res.status == 200 && res.data.meta.code == '0') {
        // console.log(res)
        this.etnum = res.data.data.etCirculate
      }
    })
  }
}
</script>

<style>
</style>
