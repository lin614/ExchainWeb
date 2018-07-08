<template>
    <Card :padding="0" class="region" :bordered="false">
        <div slot="title">
            <div class="linepot" :style="{ backgroundColor:potColor,height:height2,width:width2}" />
            <slot name="title">

            </slot>
        </div>
        <slot>

        </slot>
    </Card>
</template>
<script>
export default {
  props: {
    potColor: {
      default: 'black'
    },
    height2: {
      default: '32px'
    },
    width2: {
      default: '5px'
    }
  }
}
</script>
<style lang="less" scoped>
@fontsize: 1em;
.linepot {
  margin-left: -16px;
}
</style>


