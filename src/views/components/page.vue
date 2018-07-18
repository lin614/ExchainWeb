<template>
    <div class="page">
        <headr></headr>
        <banner v-if="banner"></banner>
        <slot>

        </slot>
        <footr></footr>
    </div>
</template>

<script>
import headr from './headr'
import banner from './banner'
import footr from './footr'
export default {
  name: 'page',
  props: {
    banner: {
      default: false
    }
  },
  components: {
    headr,
    banner,
    footr
  }
}
</script>

<style>
/* .index {
  width: 100%;
} */
</style>
