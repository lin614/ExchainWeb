<template>
  <div @mouseover="pause" @mouseout="play">
    <block class="banner">
      <Carousel v-model="setting.value" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
        <!-- <CarouselItem>
          <div class="banner_1">
            <block>
            </block>
          </div>
        </CarouselItem> -->
        <CarouselItem v-for="(item, index) in infos" :key="index">
          <div :class="'banner_2_' + $t('common.imgLang')">
            <block :style="'background:url(' + item.bgUrl + '); background-position: center;'">
              <div v-if="item.url === ''" slot="inner" style="height: 380px;">
                <img :src="item.imgUrl" :alt="item.title">
              </div>
              <a v-if="item.url !== ''" target="_blank" :href="item.url" :title="item.title">
                <div slot="inner" style="height: 380px;">
                  <img :src="item.imgUrl" :alt="item.title">
                </div>
              </a>
            </block>
          </div>
        </CarouselItem>
      </Carousel>
      <shortcut></shortcut>
    </block>
  </div>
</template>

<script>
import ax from 'axios'
import block from './block'
import shortcut from './shortcut'
export default {
  name: 'banner',
  components: { block, shortcut },
  data() {
    return {
      infos: [],
      setting: {
        value: 0,
        autoplay: true,
        autoplaySpeed: 150000,
        loop: true,
        dots: 'inside',
        radiusDot: false,
        trigger: 'hover',
        arrow: 'never'
      }
    }
  },
  computed: {
    lan() {
      return this.$i18n.locale
    }
  },
  methods: {
    pause() {
      this.setting.autoplay = false
    },
    play() {
      this.setting.autoplay = true
    },
    getInfos() {
      ax
        .get('/static/banner/banner_' + this.lan + '.json')
        .then(res => {
          this.infos = res.data;
          etLog(this.infos);
        });
    }
  },
  mounted() {
    this.getInfos()
  },
  watch: {
    lan(n, o) {
      this.getInfos()
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
    .inner {
      width: 1200px;
      margin: 0px auto;
    }
    h2 {
      width: 700px;
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
      width: 700px;
    }
    .banner-descript2 {
      // width: 900px;
      line-height: 30px;
    }
  }
  .banner_1 {
    .block {
      background: url(https://d3bcj1iwrh8aaw.cloudfront.net/imgs/ban-bg1.jpg);
    }
  }
  .banner_2_en {
    .block {
      background: url('https://d3bcj1iwrh8aaw.cloudfront.net/imgs/ban-bg2-en.png');
      background-position: center;
    }
  }
  .banner_2_cn {
    .block {
      background: url('https://d3bcj1iwrh8aaw.cloudfront.net/imgs/ban-bg2-cn.png');
      background-position: center;
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
