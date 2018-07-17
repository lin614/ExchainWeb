<template>
    <block class="index_content">
        <crd potColor="#13b387" slot="inner">
            <span slot="title">主区</span>
            水电费水电费
        </crd>
    </block>
</template>

<script>
import block from '../components/block'
import crd from '../components/crd'
export default {
  name: 'index_content',
  components: { block, crd }
}
</script>

<style lang="less">
@import url(../style/config.less);
// .index_content {

// }
</style>
