// 容器控件
<template>
  <div class="block">
    <slot>

    </slot>
    <div class="inner">
      <slot name="inner">

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'block'
}
</script>

<style lang="less">
@import url(../style/config.less);
.block {
  width: 100%;
  min-width: @min-width-screen;

  .inner {
    width: @min-width-screen;
    margin: 0 auto;
  }
}
</style>
