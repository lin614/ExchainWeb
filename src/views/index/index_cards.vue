<template>
  <block>
    <Row type="flex" justify="space-between" :gutter="16" slot="inner">
      <Col span="8">
      <crd2 potColor="#439aea">
        <span slot="p1">{{ $t('index.txSumary.currentDay') }}</span>
        <span slot="p2">
          <Icon type="social-bitcoin"></Icon>&nbsp {{valume}}
        </span>
        <span slot="p3">&nbsp</span>
      </crd2>
      </Col>

      <!-- <crd2 potColor="#13b385">
        <p slot="p1">{{ $t('index.txSumary.etMarketValue') }}</p>
        <p slot="p2">
            <Icon type="social-bitcoin"></Icon>&nbsp {{etvalue}}
        </p>
        <p slot="p3">{{ $t('index.txSumary.etCirculation') }}
            <span>
                {{etnum}}

            </span>
        </p>
      </crd2> -->

      <Col span="8">
      <crd2 potColor="#13b385">
        <p slot="p1">{{ $t('index.txSumary.etCirculation') }}</p>
        <p slot="p2">
          &nbsp; {{etnum}}
        </p>
        <p slot="p3">&nbsp;</p>
      </crd2>
      </Col>

      <Col span="8">
      <crd2 potColor="#f5162b">
        <p slot="p1">{{ $t('index.txSumary.freeTitle') }}</p>
        <p slot="p2">
          {{dayNum}} {{ $t('index.txSumary.freeUnit') }}</p>
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
      etnum: '0', //ET总流通量,
      dayNum: '90' //倒计时天数
    }
  },
  methods: {
    //倒计时时间
    upDate() {
      let tn = Math.floor(
        (new Date().getTime() - new Date('2018', '9', '6').getTime()) /
          (60 * 60 * 24 * 1000)
      )
      this.dayNum = tn < 0 ? '90' : 90 - tn
    }
  },
  created() {
    //当日交易额
    // ax.get(config.url.fee + '/api/exet/stats/dengesAmount',getHeader).then(res => {
    ax
      .get(config.url.user + '/api/quotation/getQuantAmount', getHeader)
      .then(res => {
        if (res.status == 200 && res.data.errorCode == '0') {
          this.valume = res.data.result.total
        } else {
          javaApiReqError(this, res)
        }
      })
    //ET总市值
    // ax
    //   .get(config.url.fee + '/api/exet/stats/etStandardCirculate', getHeader)
    //   .then(res => {
    //     if (res.status == 200 && res.data.meta.code == '0') {
    //       this.etvalue = res.data.data.etCirculate
    //     } else {
    //       javaApiReqError(this, res)
    //     }
    //   })
    //et总流通量
    ax
      .get(config.url.fee + '/api/exet/stats/etCirculate', getHeader)
      .then(res => {
        if (res.status == 200 && res.data.meta.code == '0') {
          this.etnum = res.data.data.etCirculate
        } else {
          javaApiReqError(this, res)
        }
      })
  },
  mounted() {
    this.upDate()
  }
}
</script>

<style>
</style>
