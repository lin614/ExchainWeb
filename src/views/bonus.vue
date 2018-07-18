<template>
  <div class="index">
    <headr></headr>
    <bonus_content></bonus_content>
    <footr></footr>
  </div>
</template>

<script>
import headr from './components/headr'
import bonus_content from './bonus/bonus_content'
import footr from './components/footr'
export default {
  components: {
    headr,
    bonus_content,
    footr
  }
}
</script>

<style>
.index {
  width: 100%;
}
</style>
