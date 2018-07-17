<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>
<style lang="less">
@import url(./views/style/config.less);
body {
  background-color: @bg-color;
}
</style>
