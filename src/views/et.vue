<template>
  <page>
    <div class="et">
      <block>
        <div class="content" slot="inner">
          <div class="sec">
            <h3>
              <div class="line1" />
              <span>{{ $t('etPage.what.title') }}</span>
              <div class="line2" />
            </h3>
            <p>{{ $t('etPage.what.descript') }}</p>
            <img src="../static/imgs/et-t-1.png" id='et' />
          </div>
          <div class="sec">
            <h3>
              <div class="line1" />
              <span>{{ $t('etPage.etRight.title') }}</span>
              <div class="line2" />
            </h3>
            <h4>{{ $t('etPage.etRight.descript[0].title') }}</h4>
            <p>{{ $t('etPage.etRight.descript[0].descript') }}</p>
            <h4>{{ $t('etPage.etRight.descript[1].title') }}</h4>
            <p>{{ $t('etPage.etRight.descript[1].descript') }}</p>

          </div>
          <div class="sec">
            <h3>
              <div class="line1" />
              <span>{{ $t('etPage.getEt.title') }}</span>
              <div class="line2" />
            </h3>
            <h4>{{ $t('etPage.getEt.descript[0].title') }}</h4>
            <p v-html="$t('etPage.getEt.descript[0].descript')"></p>
            <h4>{{ $t('etPage.getEt.descript[1].title') }}</h4>
            <p>{{ $t('etPage.getEt.descript[1].descript') }}</p>

          </div>
        </div>
      </block>
    </div>
  </page>

</template>

<script>
import page from './components/page'
import block from './components/block'
export default {
  name: 'et',
  components: { page, block }
}
</script>

<style lang="less">
@import url(./style/config.less);
.et {
  background: url(../static/imgs/etbg.png);
  background-position: top -200px center;
  background-repeat: no-repeat;
  // background-size: cover;
  height: 2100px;
  padding-top: 470px;
  .content {
    display: flex;
    align-items: top;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    // padding: 50px;
    // min-height: 400px;
    .sec {
      color: aliceblue;
      margin-bottom: 100px;
      h3 {
        font-size: 30px;
        margin-bottom: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        @margin-line: 30px;
        .line1,
        .line2 {
          display: inline-block;
          width: 120px;
          height: 2px;
          margin-right: @margin-line;
          margin-left: @margin-line;
        }
        @color1: rgb(32, 32, 32);
        @color2: rgb(104, 101, 101);
        .line1 {
          background: linear-gradient(to right, @color1, @color2);
        }
        .line2 {
          background: linear-gradient(to right, @color2, @color1);
        }
      }
      h4 {
        font-size: 20px;
        margin-bottom: 20px;
        font-weight: normal;
      }
      p {
        line-height: 30px;
        margin-bottom: 30px;
        font-size: 16px;
      }
      img {
        width: 600px;
        margin: 0 auto;
      }
    }
  }
}
</style>


