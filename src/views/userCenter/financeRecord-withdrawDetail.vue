<template>
  <div class="deposit-detail">
    <div class="detail-group">
      <!-- <div class="detail-item">
        <label>钱包处理时间：</label>
        <span>2018-06-20 15:06:08</span>
      </div> -->
      <div class="detail-item">
        <label>{{$t('name.fees')}}：</label><span>{{detail.other}}</span>
      </div>
      <div class="detail-item too-large60">
        <label>{{$t('name.withdrawAddress')}}：</label><span>{{detail.address}}</span>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item w100">
        <label>{{$t('userCenter.financeRecord.table.hash')}}：</label><span><a target="_blank" :href="detail.url">{{detail.tid}}</a></span>
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
    detail: Object
  },
  data () {
    return {}
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

<style>
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
    vertical-align: top;
  }
  .deposit-detail .detail-group .detail-item.w100 {
    width: 100%;
  }
  .deposit-detail .detail-group .detail-item label {
    color: #000;
  }
  .deposit-detail .detail-group .detail-item span {
    color: #999;
  }
  .deposit-detail .detail-group .detail-item.too-large84 {
    padding-left: 84px;
    label {
      margin-left: -84px;
    }
  }
  .deposit-detail .detail-group .detail-item.too-large60 {
    padding-left: 60px;
    label {
      margin-left: -60px;
    }
  }
  .deposit-detail .detail-group .detail-item span {
    color: #999;
    width: 100%;
    word-break: break-all;
  }
</style>
