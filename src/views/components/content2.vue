<template>
  <div class="content2">
    <block1></block1>
    <block2></block2>
  </div>
</template>

<script>
import block1 from './block1'
import block2 from './block2'
export default {
  name: 'content2',
  components: {
    block1,
    block2
  },
  mounted() {}
}
</script>
<style lang="less">
.content2 {
 
}
</style>


