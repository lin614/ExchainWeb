<template>
  <div class="index">
    <headr></headr>
    <banner></banner>
    <index_content></index_content>
  </div>
</template>

<script>
import headr from './components/headr'
import banner from './components/banner'
import index_cards from './index/index_cards'
import index_content from './index/index_content'
export default {
  components: {
    headr,
    banner,
    index_cards,
    index_content
  }
}
</script>

<style>
.index {
  width: 100%;
}
</style>
