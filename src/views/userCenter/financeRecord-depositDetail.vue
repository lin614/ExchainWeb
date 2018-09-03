<template>
  <div class="deposit-detail">
    <div class="detail-group">
      <div class="detail-item">
        <label>钱包处理时间：</label>
        <span>2018-06-20 15:06:08</span>
      </div>
      <div class="detail-item">
        <label>充币地址：</label>
        <span>04gdfgfd031249fsdfdsfds03249fdsu8t05tfght4398gfsd</span>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item">
        <label>区块链交易ID：</label>
        <span>034hklg756nib5tg9dth9e458ttr09y6t095eut0213dn</span>
      </div>
    </div>
  </div>
</template>

<script>
import ax from 'axios'
import config from '../../config/config.js'
export default {
  name: 'encharge',
  props: {
    showCharge: Boolean,
    token: String
  },
  data () {
    return {
      addr: '',
      qrCode: '',
      spinShow: false,
      no_encharge: true
    }
  },
  watch: {
    
  },
  methods: {
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="scss">
  .finance-record .ivu-table-wrapper .ivu-table .ivu-table-expanded-cell {
    padding: 0px;
  }
  .deposit-detail .detail-group {
    border-bottom: 1px solid #ebebeb;
  }
  .deposit-detail .detail-group:last-child {
      border-bottom: none
  }
  .deposit-detail .detail-group .detail-item {
    width: 49.5%;
    display: inline-block;
  }
  .deposit-detail .detail-group .detail-item label {
    color: #000;
  }
  .deposit-detail .detail-group .detail-item span {
    color: #999;
  }
</style>
