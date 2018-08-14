<template>
  <div @mouseover="pause" @mouseout="play">
    <block class="banner">
      <Carousel v-model="setting.value" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
        <CarouselItem>
          <div class="banner_1">
            <block>
              <div slot="inner">
                <h2>{{ $t('banner.title') }}</h2>
                <hr/>
                <p class="banner-descript" v-html="$t('banner.descript')"></p>
              </div>
            </block>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div :class="'banner_2_' + $t('common.imgLang')">
            <block>
              <a v-if="$t('common.imgLang') === 'cn'" target="_blank" href="https://support.exchain.com/hc/zh-cn/articles/360013309991" title="Exchain种子测试正式开启，千人限量每日瓜分2000 USDT">
                <div slot="inner" style="height: 380px;">
                  <!-- <h2>{{ $t('banner.title2') }}</h2> -->
                  <!-- <hr/> -->
                  <!-- <p class="banner-descript2" v-html="$t('banner.descript2')"></p> -->
                </div>
              </a>
              <a v-if="$t('common.imgLang') === 'en'" target="_blank" href="https://support.exchain.com/hc/en-us/articles/360013309991" title="Instructions For Exchain Special User Test">
                <div slot="inner" style="height: 380px;">
                </div>
              </a>
            </block>
          </div>
        </CarouselItem>
      </Carousel>
      <notice ></notice>
    </block>
  </div>
</template>

<script>
import block from './block'
import notice from './notice'
export default {
  name: 'banner',
  components: { block, notice },
  data() {
    return {
      setting: {
        value: 0,
        autoplay: true,
        autoplaySpeed: 5000,
        loop: true,
        dots: 'inside',
        radiusDot: false,
        trigger: 'hover',
        arrow: 'never'
      }
    }
  },
  methods: {
    pause() {
      this.setting.autoplay = false
    },
    play() {
      this.setting.autoplay = true
    }
  }
}
</script>

<style lang="less">
@import url(../style/config.less);
.banner {
  width: 100%;
  //   height: 450px;
  .block {
    position: relative;
    height: 380px;
    background-color: @banner-bg-color;
    background-repeat: no-repeat;
    background-position: center center;
    h2 {
      width: 850px;
      padding-top: 50px;
      font-size: @banner-font-title;
      color: white;
    }
    hr {
      border: none;
      height: 2px;
      color: white;
      background-color: white;
      width: 80px;
      margin-top: 10px;
    }
    p {
      margin-top: 26px;
      font-size: @banner-font-text;
      color: white;
      line-height: 40px;
    }
    .banner-descript {
      width: 850px;
    }
    .banner-descript2 {
      // width: 900px;
      line-height: 30px;
    }
  }
  .banner_1 {
    .block {
      background: url(../../static/imgs/ban-bg1.png);
    }
  }
  .banner_2_en {
    .block {
      background: url(../../static/imgs/ban-bg2-en.png);
    }
  }
  .banner_2_cn {
    .block {
      background: url(../../static/imgs/ban-bg2-cn.png);
    }
  }
  .notice {
    position: absolute;
    width: 260px;
    height: 260px;
    background: white;
    float: right;
    right: calc(~'50% - 600px');
    top: 140px;
    // box-shadow: 0 0 20px gold;
  }
}
</style>
