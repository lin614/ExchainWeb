
<template>
    <page class="page_content-padding">
        <div class="cont">
            <block>
                <crd slot="inner">
                    <span slot="title">Terms of use</span>
                    <div class=" content">
                        <img src="http://resource.exchain.com/imgs/a.jpg" />
                    </div>
                </crd>
            </block>
        </div>
    </page>

</template>

<script>
import page from './components/page'
import block from './components/block'
import crd from './components/crd'
export default {
  name: 'cont',
  components: { page, block, crd }
}
</script>

<style lang="less" scoped>
  .content img{
      width: 100%;
  }
</style>
