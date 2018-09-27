
<template>
    <page class="page_content-padding">
        <div class="priv">
            <block>
                <crd slot="inner">
                    <span slot="title">Privacy policy</span>
                    <div class=" content">
                        <img src="http://resource.exchain.com/imgs/b.jpg" />
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
  name: 'priv',
  components: { page, block, crd }
}
</script>

<style lang="less">
.priv {
  .content img{
      width: 100%;
  }
}
</style>
