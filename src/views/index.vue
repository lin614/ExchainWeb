<template>
  <page :banner="true" class="page_content-padding">
    <index_cards></index_cards>
    <index_content></index_content>
  </page>

</template>

<script>
import page from './components/page'
import index_cards from './index/index_cards'
import index_content from './index/index_content'
import config from '../config/config.js'
import ax from 'axios';

export default {
  name: 'index',
  components: { page, index_cards, index_content },
  methods: {
    getMarketPrecision () {
      ax.get(config.url.user + '/api/exchange/getMarketInfo').then(data => {
        if (data.data.errorCode === 0) {
          this.$store.commit('setMarketPrecision', data.data.result);
        }
      })
    }
  },
  created () {
    this.getMarketPrecision();
  }
}
</script>

<style>
</style>


