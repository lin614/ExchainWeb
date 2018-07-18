<template>
  <page :banner="true">
    <index_cards></index_cards>
    <index_content></index_content>
  </page>

</template>

<script>
import page from './components/page'
import index_cards from './index/index_cards'
import index_content from './index/index_content'
export default {
  name: 'index',
  components: { page, index_cards, index_content }
}
</script>

<style>
</style>


