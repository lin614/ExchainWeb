<template>
    <div class="banner-shortcut">
        <ul class="">

            <li class="item" v-for="(p,i) of list" :key="i" :class="{novice:i==0,advise:i==1,announcement:i==2}">
                <a :href="p.url">
                    <div>
                        <h3 class="tit3">{{p.title}}</h3>
                        <p class="title">{{p.subTitle}}</p>
                    </div>
                </a>
            </li>

        </ul>
    </div>
</template>

<script>
import ax from 'axios'
export default {
  name: 'shortcut',
  data() {
    return {
      list: []
    }
  },
  computed: {
    lan() {
      return this.$i18n.locale
    }
  },
  methods: {
    getNotice() {
      var vu = this
      ax.get('/dist/static/notice/notice_' + vu.lan + '.json').then(res => {
        if (typeof res.data == 'object') {
          vu.list = res.data
          console.log(vu.list)
        }
      })
    }
  },
  watch: {
    lan(n, o) {
      this.getNotice()
    }
  },
  created() {
    this.getNotice()
  }
}
</script>

<style lang="less">
@import url(../style/config.less);
.banner-shortcut {
  .item {
    height: 100px;
    div {
      padding: 16px 20px;
    }
    :hover {
      background-color: rgb(80, 176, 140);
    }
  }
  
  .tit3 {
    margin-bottom: 11px;
    color: #fff;
    font-size: 22px;
    font-weight: 500;
  }
  .title {
    color: #fff;
    font-size: 16px;
  }
}
</style>
