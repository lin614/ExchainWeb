<template>
  <page>
    <div class="manage-addr-cont">
      <div class="content">
        <crd>
          <span slot="title">提现地址管理</span>
        </crd>
      </div>
    </div>
  </page>
</template>

<script>
import page from "../components/page"
import crd from "../components/crd.vue"
export default {
  name: 'manageAddr',
  components: {
    page,
    crd
  }
}
</script>

<style lang="less">
  .manage-addr-cont {
    padding: 40px 0;
  }
</style>
