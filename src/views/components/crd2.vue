<template>
  <Card :padding="0" class="crd2" :bordered="false">
    <div slot="title">

      <div class="title">
        <div class="linepot" :style="{ backgroundColor:potColor}" />
        <slot name="title">

        </slot>
      </div>
    </div>
    <div class="content">
      <slot>

      </slot>
      <p class="p1" :style="{ color:potColor}">
        <slot name="p1"></slot>
      </p>
      <p class="p2">
        <slot name="p2"></slot>
      </p>
      <p class="p3">
        <slot name="p3"></slot>
      </p>
    </div>
  </Card>
</template>
<script>
export default {
  name: 'crd2',
  props: {
    potColor: {
      default: 'black'
    }
  },
  mounted() {
  }
}
</script>
<style lang="less">
@import url(../style/config.less);
.crd2 {
  margin-bottom: 16px;
  .linepot {
    height: @linepot-height;
    width: 100%;
  }
  .title {
    display: flex;
    height: 10px;
    text-align: left;
    align-items: flex-start;
    justify-content: flex-start;

    font-size: @font-title;
  }
  .content {
    font-size: @font-text;
    padding: 10px;
    .p1 {
      font-size: @font-text*1.2;
    }
    .p2 {
      font-size: @font-text*2.5;
      line-height: @font-text*3;
      margin: 10px 0;
    }
  }
  .ivu-card {
    border-radius: 0px;
    // box-shadow: 0 0 20px gold;
  }
  .ivu-card-head {
    padding: 0px;
    border-bottom: none;
  }
}
</style>


