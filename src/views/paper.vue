
<template>
    <page>
        <div class="paper">
            <block>
                <crd slot="inner">
                    <span slot="title">白皮书</span>
                    <div class=" content">
                        <img src="../static/imgs/paper/01.jpg" />
                        <img src="../static/imgs/paper/02.jpg" />
                        <img src="../static/imgs/paper/03.jpg" />
                        <img src="../static/imgs/paper/04.jpg" />
                        <img src="../static/imgs/paper/05.jpg" />
                        <img src="../static/imgs/paper/06.jpg" />
                        <img src="../static/imgs/paper/07.jpg" />
                        <img src="../static/imgs/paper/08.jpg" />
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
  components: { page, block, crd }
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
