<template>
  <div class="bonus">
    <div class="tbs">
      <Card :padding="0" :bordered="false">
        <div slot="title" class="tbs_head">
          <div class="linepot1" />
          <span class="title">
            合伙人级别
          </span>
        </div>
        <div class="plevel content">普通合作伙伴</div>
      </Card>
      <Card :padding="0" class="region" :bordered="false">
        <div slot="title" class="tbs_head">
          <div class="linepot2" />
          <span class="title">
            邀请方式
          </span>
        </div>
        <div class="content">
          aaa
        </div>
      </Card>
      <Card :padding="0" class="region" :bordered="false">
        <div slot="title" class="tbs_head">
          <div class="linepot3" />
          <span class="title">
            合伙人收益
          </span>
        </div>
        <div class="content">
          aaa
        </div>
      </Card>
      <Card :padding="0" class="region" :bordered="false">
        <div slot="title" class="tbs_head">
          <div class="linepot4" />
          <span class="title">
            邀请记录

          </span>
        </div>
      </Card>

    </div>
  </div>
</template>

<script>
export default {
  name: 'bonus',
  data() {
    return {}
  },
  mounted() {}
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
  height: 60px;
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
  font-size: @fontsize*2;
  //   font-weight: bold;
  margin-left: @fontsize;
}
.linepot(@color) {
  width: 5px;
  height: @fontsize*2;
  margin-left: -16px;
  //   display: inline-block;
  background-color: @color;
}
.linepot1 {
  .linepot(#11b489);
}
.linepot2 {
  .linepot(#4399ee);
}
.linepot3 {
  .linepot(#fbc13c);
}
.linepot4 {
  .linepot(#e74747);
}

.ivu-table-wrapper {
  border: none;
}
.content {
  padding: 32px;
}
.plevel {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: @fontsize*1.2;
  padding: 2em;
}
</style>


