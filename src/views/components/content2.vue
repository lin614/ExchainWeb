<template>
  <div class="content2">
    <block1></block1>
    <block2></block2>
    <block3></block3>
  </div>
</template>

<script>
import block1 from './block1'
import block2 from './block2'
import block3 from './block3'
export default {
  name: 'content2',
  components: {
    block1,
    block2,
    block3
  },
  mounted() {}
}
</script>
<style lang="less">
.content2 {
}
</style>


