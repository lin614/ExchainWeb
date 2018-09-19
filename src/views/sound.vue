<template>
  <page :class="'page_content-padding sound-page ' + $t('common.lang')">
    <div class="sound">
      <block>
        <div class="banner">
          <img :src="imgPath+con.banner">
        </div>

        <div slot="inner">
          <div class="inner-content">
            <ul>
              <li>
                <h1 class="inner-tit blue">
                  <span>{{con.title1}}</span>
                </h1>
                <div class="cnt thank-you-cnt">
                  <img class="thank-you" src="../static/imgs/sound-say.png">
                  <p v-html="con.content1"></p>
                </div>
              </li>

              <li>
                <h1 class="inner-tit green">
                   <span>{{con.title2}}</span>
                </h1>
                <div class="cnt">
                  <ul class="big-user-group">
                    <li class="user-item clearfix" v-for="(p, i) of con.content2" :key="i">
                      <img class="fl avator" :src="imgPath+p.img">
                      <div class="say-cnt">
                        <p class="p1">
                          <span>{{p.name}}：</span>{{p.say1}}</p>
                        <p class="p2">{{p.sub}}</p>
                        <p class="p3">{{p.say2}}</p>
                      </div>
                    </li>
                  </ul>

                  <p class="more-advise">
                    <span>{{con.title3}}:</span>
                  </p>

                  <ul class="other-user-group">
                    <li class="other-user-item clearfix" v-for="(p, i) of con.content3" :key="i">
                      <img class="fl avator" :src="imgPath+p.img">
                      <div class="say-cnt">
                        <p class="p1">{{p.name}}</p>
                        <p class="p2">{{p.say}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <h1 class="inner-tit orange">
                  <span>{{con.title4}}</span>
                </h1>
                <div class="cnt">
                  <ul class="media-group">
                    <li class="media-item clearfix" v-for="(p, i) of con.content4" :key="i">
                      <img class="fl avator" :src="imgPath+p.img">
                      <div class="say-cnt">
                        <p class="p1">
                          <span>{{p.name}}：</span>{{p.say1}}。</p>
                        <p class="p2">{{p.sub}}</p>
                        <p class="p3">{{p.say2}}</p>
                        <img class="qrcode" :src="imgPath+p.qrcode" v-if="p.qrcode">
                        <a class="link" target="_blank" :href="p.url" v-if="p.url">{{p.url}}</a>
                      </div>
                    </li>

                  </ul>
                </div>
              </li>

              <li>
                <h1 class="inner-tit red">
                  <span>{{con.title5}}</span>
                </h1>
                <div class="cnt">
                  <ul class="media-group">
                    <li class="media-item clearfix" v-for="(p, i) of con.content5" :key="i">
                      <img class="fl avator" :src="imgPath+p.img">
                      <div class="say-cnt">
                        <p class="p1">
                          <span>{{p.name}}：</span>{{p.say1}}</p>
                        <p class="p2">{{p.sub}}：</p>
                        <p class="p3">{{p.say2}}</p>
                        <img class="qrcode" :src="imgPath+p.qrcode" v-if="p.qrcode">
                        <a class="link" target="_blank" :href="p.url" v-if="p.url">{{p.url}}</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>

            </ul>

            <div class="our-change">
              <p>{{con.title6}}</p>
            </div>

            <ul class="change-group">
              <li class="change-item" v-for="(p,i) of con.content6" :key="i">
                <p class="tit">{{p.sub}}</p>
                <p class="list">
                  <span v-for="d,j in p.detail">
                    <span class="highlight">{{d}}</span>
                    <span v-show="j<p.detail.length-1"> | </span>
                  </span>

                </p>
              </li>

            </ul>

            <a class="your-advise" :href="con.others.link" target="_blank">{{con.others.button}}</a>

          </div>
        </div>
      </block>
    </div>
  </page>

</template>

<script>
import page from './components/page'
import block from './components/block'
import crd from './components/crd'
import ax from 'axios'

export default {
  components: { page, block, crd },
  name: 'shortcut',
  data() {
    return {
      stage: this.$route.params.stage,
      imgPath: '/static/sound/stage' + this.$route.params.stage + '/',
      con: {
        others: {}
      }
    }
  },
  computed: {
    lan() {
      return this.$i18n.locale
    }
  },
  methods: {
    getCon() {
      var vu = this
      ax
        .get(
          '/static/sound/stage' +
            vu.$route.params.stage +
            '/' +
            vu.lan +
            '.json'
        )
        .then(res => {
          if (typeof res.data == 'object') {
            vu.con = res.data
            console.log(vu.con)
          }
        })
    }
  },
  watch: {
    lan(n, o) {
      this.getCon()
    }
  },
  created() {
    this.getCon()
  }
}
</script>

<style lang="less">
@import url(./style/config.less);
.page_content-padding.sound-page {
  .page_content {
    padding-top: 0px;
    padding-bottom: 30px;
  }
  .banner {
    height: 400px;
    background: #084794;
    text-align: center;
    img {
      margin: 0 auto;
    }
  }
  .inner-content {
    margin-top: 30px;
    padding: 40px;
    border-radius: 10px;
    background: #fff;
    .inner-tit {
      position: relative;
      font-size: 24px;
      font-weight: 500;
      border-bottom: 1px solid #e8e8e8;
      margin-bottom: 30px;
      padding-bottom: 20px;
      span {
        position: relative;
        padding: 0px 14px;
      }
      span::before {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 4px;
        bottom: -25px;
        border-radius: 10px;
      }
      &.blue {
        color: @font-color-blue;
      }
      &.blue span::before {
        background: @font-color-blue;
      }
      &.green {
        color: #50b08c;
      }
      &.green span::before {
        background: #50b08c;
      }
      &.orange {
        color: #f4c058;
      }
      &.orange span::before {
        background: #f4c058;
      }
      &.red {
        color: #e13737;
      }
      &.red span::before {
        background: #e13737;
      }
    }
    .cnt {
      position: relative;
    }
    .thank-you-cnt {
      height: 300px;
      padding: 80px 80px 0px 60px;
      p {
        position: relative;
        margin-bottom: 30px;
        font-size: 16px;
        color: #fff;
      }
    }
    .thank-you {
      position: absolute;
      top: 40px;
      left: 0px;
      z-index: 0;
      height: 220px;
    }

    .user-item {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border: 1px solid #eaeaea;
      &:nth-child(2n + 1) {
        background: #f5f5f5;
      }
      &:nth-child(2n) {
        background: #fff;
      }
      .avator {
        width: 120px;
        height: 120px;
        margin: 20px 20px 0px;
      }
      .say-cnt {
        padding-top: 22px;
        margin-left: 160px;
        p {
          line-height: 24px;
        }
        .p1 {
          margin-bottom: 14px;
          font-size: 16px;
          span {
            color: @font-color-blue;
          }
        }
        .p2 {
          margin-bottom: 6px;
          font-size: 16px;
          color: @font-color-blue;
        }
        .p3 {
          padding-right: 20px;
          font-size: 14px;
        }
      }
    }

    .more-advise {
      margin: 60px 0px 15px 0px;
      font-size: 16px;
    }

    .other-user-item {
      margin-bottom: 20px;
      padding-bottom: 40px;
      border-bottom: 1px solid #eaeaea;
      &:last-child {
        border-bottom-width: 0px;
      }
      .avator {
        width: 60px;
        height: 60px;
        margin: 20px 20px 0px 0px;
      }
      .say-cnt {
        padding-top: 25px;
        p {
          line-height: 24px;
        }
        .p1 {
          margin-bottom: 5px;
          font-size: 16px;
          color: @font-color-blue;
        }
      }
    }

    .media-group {
      margin-top: -10px;
      .media-item {
        margin-bottom: 20px;
        border-bottom: 1px solid #eaeaea;
        &:last-child {
          border-bottom-width: 0px;
        }
        .avator {
          width: 60px;
          height: 60px;
          margin: 20px 20px 20px 0px;
        }
        .say-cnt {
          margin-left: 80px;
          padding-top: 25px;
          p {
            line-height: 24px;
          }
          .p1 {
            margin-bottom: 8px;
            font-size: 16px;
            span {
              color: @font-color-blue;
            }
          }
          .p2 {
            margin-bottom: 8px;
            font-size: 16px;
            color: @font-color-blue;
          }
          .p3 {
            margin-bottom: 8px;
            padding-right: 20px;
          }
          .link {
            display: inline-block;
            margin-bottom: 30px;
          }
          .qrcode {
            margin: 10px 0px 30px;
          }
        }
      }
    }

    .our-change {
      position: relative;
      width: 300px;
      height: 20px;
      margin: 60px auto 60px;
      line-height: 20px;
      background: #f2f4fe;
      border-radius: 20px;
      p {
        font-size: 36px;
        color: #333;
        font-weight: 200;
        text-align: center;
      }
      &:before {
        content: '';
        position: absolute;
        top: 5px;
        left: 10px;
        width: 10px;
        height: 10px;
        background: #5f74b7;
        border-radius: 50%;
      }
      &:after {
        content: '';
        position: absolute;
        top: 5px;
        right: 10px;
        width: 10px;
        height: 10px;
        background: #5f74b7;
        border-radius: 50%;
      }
    }

    .change-group {
      .change-item {
        margin-bottom: 30px;
        padding: 25px;
        border: 1px solid #eaeaea;
        &:nth-child(2n + 1) {
          background: #f5f5f5;
        }
        &:nth-child(2n) {
          background: #fff;
        }
        p.tit {
          margin-bottom: 5px;
          font-size: 18px;
        }
        p.list {
          font-size: 16px;
        }
        .highlight {
          color: @font-color-blue;
        }
      }
    }

    .your-advise {
      display: block;
      height: 80px;
      font-size: 18px;
      line-height: 80px;
      text-align: center;
      color: #fff;
      background: #2d8cf0;
    }
  }

  &.en {
    .inner-content {
      .thank-you-cnt {
        p {
          margin-bottom: 20px;
        }
      }
      .our-change {
        width: 470px;
      }
    }
  }
}
</style>
