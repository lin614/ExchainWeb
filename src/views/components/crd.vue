<template>
  <div class="crd">
    <Card :padding="0" :bordered="false">
      <div slot="title">

        <div class="title" v-if="!hideTitle">
          <div class="linepot" :style="{ backgroundColor:potColor}" />
          <span class="slot-title"><slot name="title"></slot></span>
          
          <slot class="more" name="more"></slot>
        </div>
      </div>
      <div slot="extra">
        <slot name="extra">

        </slot>
      </div>
      <div class="mainContent">
        <slot>

        </slot>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  name: 'crd',
  props: {
    potColor: {
      default: '#2b85e4'
    },
    hideTitle: {
      default: false
    }
  },
  mounted() {
  }
}
</script>
<style lang="less">
@import url(../style/config.less);
.crd {
  margin-bottom: 16px;
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
  .slot-title {
    display: flex;
    flex: 1 1 auto;
  }
  .more {
    float: right;
    color: #666;
    font-size: 16px;
    margin-right: 15px;
    line-height: 20px;
    text-align: right;
  }
  .highlight {
    color: #419aec;
  }
  .mainContent {
    // padding: 16px;
    font-size: @font-text;
  }
  .ivu-card {
    border-radius: 0px;
    // box-shadow: 0 0 1px gold;
  }
  .ivu-card-head {
    padding: 0px;
    // padding-right: 16px;
  }
}
</style>


