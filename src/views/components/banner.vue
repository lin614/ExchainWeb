<template>
    <div class="banner" @mouseover="setting.autoplay = false" @mouseout="setting.autoplay = true">
        <Carousel v-model="setting.value" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
            <CarouselItem>
                <block>
                    <div slot="inner">
                        <h2>收入与合作伙伴共享，收益与交易伙伴共享</h2>
                        <hr/>
                        <p>Exchain是全球首家共享型交易平台，不仅将合作交易费的20%支付给合作伙伴，<br/>50%支付给超级合伙伙伴，还将交易平台100%的收入每日分配给Exchain Token（ET）持有者，<br/>全免费交易计时开始。</p>
                    </div>
                </block>
            </CarouselItem>
            <CarouselItem>
                <block>
                    <div slot="inner">
                        <h2>Excahin内测即将开启，强拳重推合作伙伴计划</h2>
                        <hr/>

                        <p>Exchain全球首家共享型交易平台Exchain全新上线，并即将开启内测。<br/>先启动“合作伙伴计划”招募<br/>成为合作伙伴，享受交易费20%-50%回报+平台币(ET)奖励<br/>交易即挖矿，ET升值+平台收入奖励，收益+++<br/>限时全免，等你来！</p>
                    </div>
                </block>
            </CarouselItem>
        </Carousel>
    </div>
</template>

<script>
import block from './block'
export default {
  name: 'banner',
  components: { block },
  data() {
    return {
      setting: {
        value: 0,
        autoplay: true,
        autoplaySpeed: 5000,
        loop: true,
        dots: 'outside',
        radiusDot: false,
        trigger: 'hover',
        arrow: 'never'
      }
    }
  },
  methods: {}
}
</script>

<style lang="less">
.banner {
  width: 100%;
  height: 400px;
}
</style>
