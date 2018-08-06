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
          <div class="banner_2">
            <block>
              <div slot="inner">
                <h2>Exchain内测即将开启，强拳重推合作伙伴计划</h2>
                <hr/>
                <p>Exchain全球首家共享型交易平台Exchain全新上线，并即将开启内测。<br/>先启动“合作伙伴计划”招募<br/>成为合作伙伴，享受交易费20%-50%回报+平台币(ET)奖励<br/>交易即挖矿，ET升值+平台收入奖励，收益+++<br/>限时全免，等你来！</p>
              </div>
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
  }
  .banner_1 {
    .block {
      background: url(../../static/imgs/ban-bg1.png);
    }
  }
  .banner_2 {
    .block {
      background: url(../../static/imgs/ban-bg2.png);
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
