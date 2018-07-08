
<template>
  <index>
    <block1 :mode2="true"></block1>
    <bonus></bonus>
  </index>
</template>
<script>
import index from './index'
import block1 from './components/block1'
import bonus from './components/bonus'
// import card2 from './components/card2'
export default {
  name: 'index2',
  components: {
    index,
    block1,
    bonus
    // card2
  },
  methods: {}
}
</script>

