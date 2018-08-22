<template>
<div class="miss-page-cont" :style="'min-height:' + pageHeight + 'px;'">
  <div class="miss-main-cont">
    <div class="img-cont">
      <!-- <img src="../assets/images/not-found.png" /> -->
    </div>
    <div class="miss-title">404</div>
    <div class="miss-tips">Page not found! don’t worry,sometimes it happens even for the best of us.</div>
    <div class="miss-btn-cont">
      <router-link class="miss-back-btn" to="/">Go Home</router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'notFound',
  data () {
    return {
      pageHeight: window.innerHeight
    }
  },
  components: {},
  methods: {
    handleWindowResize () {
      this.pageHeight = window.innerHeight
    }
  },
  mounted () {},
  created () {
    this.pageHeight = window.innerHeight
    window.addEventListener('resize', this.handleWindowResize)
  },
  destroyed () {}
}
</script>

<style scoped lang="less">
.miss-page-cont{
  background: #fff;
  overflow: hidden;
  & .miss-main-cont{
    width: 80%;
    margin: 100px auto 0px;
    text-align: center;
    & .img-cont{
      height: 238px;
      width: 386px;
      margin: 0 auto;
      &>img{
        width: 100%;
      }
    }
    & .miss-title{
      color: #333;
      font-size: 60px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    & .miss-tips{
      color: #333;
      font-size: 16px;
      margin-bottom: 40px;
    }
    & .miss-back-btn{
      width: 120px;
      height: 40px;
      font-size: 16px;
      color: #fff;
      background: #00B67E;
      text-align: center;
      line-height: 40px;
      border-radius: 0px;
      display: inline-block;
    }
  }
}
@media screen and (max-width: 500px) {
  .miss-page-cont{
    & .miss-main-cont{
      & .img-cont{
        width: 80%;
        height: auto;
        min-width: 250px;
      }
    }
  }
}
</style>
