<template>
  <Card :padding="0" class="crd" :bordered="false">
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
    // console.log(this.potColor)
  }
}
</script>
<style lang="less">
@import url(../style/config.less);
.crd {
  .linepot {
    // margin-left: -16px;
    height: @font-title;
    width: 5px;
    display: inline-block;
    margin-right: 10px;
  }
  .title {
    display: flex;
    height: 60px;
    text-align: left;
    align-items: center;
    justify-content: flex-start;

    font-size: @font-title;
  }
  .content {
    font-size: @font-text;
  }
  .ivu-card {
    border-radius: 0px;
    // box-shadow: 0 0 20px gold;
  }
  .ivu-card-head {
    padding: 0px;
  }
}
</style>


