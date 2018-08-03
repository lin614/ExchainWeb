
<template>
    <page>
        <div class="paper">
            <block>
                <crd slot="inner">
                    <span slot="title">{{$t('whitepaper.title')}}</span>
                    <div class=" content">
                        <img :src="require('../static/imgs/'+$t('whitepaper.folder')+'/0'+i+'.jpg')" v-for="i in [1,2,3,4,5,6,7,8]" />
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
  name: 'paper',
  components: { page, block, crd },
  mounted() {}
}
</script>

<style lang="less">
.paper {
  .content {
    img {
      width: 100%;
      margin: 0 auto;
      margin-bottom: 1em;
    }
  }
}
</style>
