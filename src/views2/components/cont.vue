<template>
  <index>
    <div class="bonus">
      <div class="tbs">
        <Card :padding="0" :bordered="false">
          <div slot="title" class="tbs_head">
            <div class="linepot1" />
            <span class="title">
              Terms of use
            </span>
          </div>
          <div class=" content">
            <!-- <pdf src="/static/doc/t.pdf"></pdf> -->
            <img src="../../static/imgs/a.jpg" />
          </div>
        </Card>
      </div>
    </div>
  </index>

</template>

<script>
import index from '../index'
import pdf from 'vue-pdf'
export default {
  name: 'cont',
  components: {
    index,
    pdf
    // card2
  },
  created() {}
}
</script>
<style lang="less" scoped>
@fontsize: 1em;
.bonus {
  background: transparent;
  min-height: 600px;
  width: 1200px;
  margin: 0 auto;
  // height: 700px;
  text-align: left;
  font-size: @fontsize;
}

.bonus .tbs_head {
  display: flex;
  height: 30px;
  text-align: left;
  align-items: center;
  justify-content: flex-start;
}
// .ivu-card-body {
//   padding: 0;
// }
.tbs {
  margin-top: @fontsize;
}
.tbs .region {
  margin-top: @fontsize;
}
.region:last-of-type {
  margin-bottom: @fontsize*2;
}
.tbs .title {
  font-size: @fontsize*1.5;
  //   font-weight: bold;
  margin-left: @fontsize;
}
.content {
  // padding: 3em;
}
.linepot(@color) {
  width: 5px;
  height: @fontsize*1.5;
  margin-left: -16px;
  //   display: inline-block;
  background-color: @color;
}
.linepot1 {
  .linepot(#11b489);
}
</style>


